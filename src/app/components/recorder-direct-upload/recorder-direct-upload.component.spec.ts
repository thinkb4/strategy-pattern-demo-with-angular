import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RecorderDirectUploadComponent } from './recorder-direct-upload.component';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';

class CaptureStub { startRecording = jest.fn().mockResolvedValue('mem://path'); }
class UploadStub { upload = jest.fn().mockReturnValue(of(0.25, 0.5, 0.75, 1)); }

describe('RecorderDirectUploadComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecorderDirectUploadComponent],
      providers: [
        { provide: CaptureService, useClass: CaptureStub },
        { provide: UploadService, useClass: UploadStub },
      ],
    });
  });

  it('uploads without confirmation and reaches uploaded', async () => {
    const fixture = TestBed.createComponent(RecorderDirectUploadComponent);
    const comp = fixture.componentInstance;
    comp.title = 'Direct';
    await comp.start();
    expect(comp['status']).toBe('uploaded');
    expect(comp['progress']).toBe(1);
  });
});