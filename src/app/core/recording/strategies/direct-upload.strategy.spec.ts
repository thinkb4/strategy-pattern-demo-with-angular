import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DirectUploadStrategy } from './direct-upload.strategy';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { DemoContext } from '@/app/shared/models';

class CaptureStub { startRecording = jest.fn().mockResolvedValue('mem://path'); }
class UploadStub { upload = jest.fn().mockReturnValue(of(0.25, 0.5, 0.75, 1)); }

describe('DirectUploadStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DirectUploadStrategy,
        { provide: CaptureService, useClass: CaptureStub },
        { provide: UploadService, useClass: UploadStub },
      ],
    });
  });

  it('runs capture → upload and enqueues', async () => {
    const strat = TestBed.inject(DirectUploadStrategy);
    const events: string[] = [];
    const ctx: DemoContext = {
      title: 't',
      kind: 'direct-upload' as any,
      setStatus: s => events.push(`status:${s}`),
      setProgress: p => events.push(`progress:${p}`),
      enqueue: id => events.push(`enqueue:${id}`),
    };

    await strat.run(ctx);

    expect(events).toContain('status:uploading');
    expect(events).toContain('status:uploaded');
    expect(events).toContain('enqueue:file-id-direct');

    const last = events[events.length - 1];
    expect(last).toBe('enqueue:file-id-direct');
  });
});