import { Injectable } from '@angular/core';
import { RecordingStrategy } from '@/app/core/recording/recording-strategy.types';
import { RecordAndUploadDirective } from '@/app/core/recording/record-and-upload.directive';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { DemoContext } from '@/app/shared/models';

@Injectable({ providedIn: 'root' })
export class DirectUploadStrategy extends RecordAndUploadDirective implements RecordingStrategy {
  constructor(capture: CaptureService, upload: UploadService) {
    super(capture, upload);
  }

  async run(ctx: DemoContext): Promise<void> {
    const path = await this.captureOnce(ctx);
    await this.uploadWithProgress(ctx, path);
    this.finalize(ctx, 'file-id-direct');
  }
}