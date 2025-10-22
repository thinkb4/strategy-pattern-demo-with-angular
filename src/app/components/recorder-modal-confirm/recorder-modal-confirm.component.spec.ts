import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RecorderModalConfirmComponent } from './recorder-modal-confirm.component';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { ConfirmService } from '@/app/core/services/confirm/confirm.service';

class CaptureStub { startRecording = jest.fn().mockResolvedValue('mem://path'); }
class UploadStub { upload = jest.fn().mockReturnValue(of(0.25, 0.5, 0.75, 1)); }
class ConfirmStub { confirm = jest.fn().mockResolvedValue(true); }

describe('RecorderModalConfirmComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecorderModalConfirmComponent],
      providers: [
        { provide: CaptureService, useClass: CaptureStub },
        { provide: UploadService, useClass: UploadStub },
        { provide: ConfirmService, useClass: ConfirmStub },
      ],
    });
  });

  it('asks for confirmation and uploads on OK', async () => {
    const fixture = TestBed.createComponent(RecorderModalConfirmComponent);
    const comp = fixture.componentInstance;
    comp.title = 'Confirm';
    await comp.start();
    expect(TestBed.inject(ConfirmService)['confirm']).toHaveBeenCalled();
    expect(comp['status']).toBe('uploaded');
    expect(comp['progress']).toBe(1);
  });

  it('stays idle on cancel', async () => {
    (TestBed.inject(ConfirmService) as any).confirm.mockResolvedValue(false);
    const fixture = TestBed.createComponent(RecorderModalConfirmComponent);
    const comp = fixture.componentInstance;
    await comp.start();
    expect(comp['status']).toBe('idle');
    expect(comp['progress']).toBe(0);
  });
});