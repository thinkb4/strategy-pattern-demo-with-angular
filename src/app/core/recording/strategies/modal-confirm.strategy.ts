import { Injectable } from '@angular/core';
import { RecordingStrategy } from '@/app/core/recording/recording-strategy.types';
import { RecordAndUploadDirective } from '@/app/core/recording/record-and-upload.directive';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { ConfirmService } from '@/app/core/services/confirm/confirm.service';
import { DemoContext } from '@/app/shared/models';

@Injectable({ providedIn: 'root' })
export class ModalConfirmStrategy extends RecordAndUploadDirective implements RecordingStrategy {
  constructor(
    capture: CaptureService,
    upload: UploadService,
    private readonly confirm: ConfirmService,
  ) {
    super(capture, upload);
  }

  async run(ctx: DemoContext): Promise<void> {
    const path = await this.captureOnce(ctx);

    const ok = await this.confirm.confirm(ctx.title);
    if (!ok) {
      ctx.setStatus('idle');
      ctx.setProgress(0);
      return;
    }

    await this.uploadWithProgress(ctx, path);
    this.finalize(ctx, 'file-id-confirm');
  }
}