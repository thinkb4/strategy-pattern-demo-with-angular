import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ModalConfirmStrategy } from './modal-confirm.strategy';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { ConfirmService } from '@/app/core/services/confirm/confirm.service';
import { DemoContext } from '@/app/shared/models';

class CaptureStub { startRecording = jest.fn().mockResolvedValue('mem://path'); }
class UploadStub { upload = jest.fn().mockReturnValue(of(0.25, 0.5, 0.75, 1)); }
class ConfirmStub { confirm = jest.fn().mockResolvedValue(true); }

describe('ModalConfirmStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalConfirmStrategy,
        { provide: CaptureService, useClass: CaptureStub },
        { provide: UploadService, useClass: UploadStub },
        { provide: ConfirmService, useClass: ConfirmStub },
      ],
    });
  });

  it('uploads when confirmed', async () => {
    const strat = TestBed.inject(ModalConfirmStrategy);
    const events: string[] = [];
    const ctx: DemoContext = {
      title: 't',
      kind: 'modal-confirm' as any,
      setStatus: s => events.push(`status:${s}`),
      setProgress: p => events.push(`progress:${p}`),
      enqueue: id => events.push(`enqueue:${id}`),
    };
    await strat.run(ctx);

    expect(TestBed.inject(ConfirmService)['confirm']).toHaveBeenCalled();
    expect(events).toContain('status:uploading');
    expect(events).toContain('status:uploaded');
    expect(events).toContain('enqueue:file-id-confirm');

    const last = events[events.length - 1];
    expect(last).toBe('enqueue:file-id-confirm');
  });

  it('cancels when not confirmed', async () => {
    (TestBed.inject(ConfirmService) as any).confirm.mockResolvedValue(false);
    const strat = TestBed.inject(ModalConfirmStrategy);
    const events: string[] = [];
    const ctx: DemoContext = {
      title: 't',
      kind: 'modal-confirm' as any,
      setStatus: s => events.push(`status:${s}`),
      setProgress: p => events.push(`progress:${p}`),
      enqueue: _ => events.push('enqueue'),
    };
    await strat.run(ctx);
    expect(events.includes('enqueue')).toBe(false);
    expect(events).toContain('status:idle');
    expect(events).toContain('progress:0');
  });
});