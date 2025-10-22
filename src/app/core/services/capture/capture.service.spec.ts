import { TestBed } from '@angular/core/testing';
import { CaptureService } from './capture.service';

describe('CaptureService', () => {
  it('resolves a path after ~1s', async () => {
    TestBed.configureTestingModule({});
    const svc = TestBed.inject(CaptureService);
    await expect(svc.startRecording()).resolves.toBe('mem://video-path');
  });
});