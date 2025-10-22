import { lastValueFrom } from 'rxjs';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { DemoContext } from '@/app/shared/models';
import { Directive } from '@angular/core';

/**
 * Using @Directive is the officially supported fix for abstract Angular base classes that use Angular lifecycle hooks.
 */
@Directive()
export abstract class RecordAndUploadDirective {
  constructor(
    protected readonly capture: CaptureService,
    protected readonly upload: UploadService,
  ) {}

  /** Start capture and set initial status. */
  protected async captureOnce(ctx: DemoContext): Promise<string> {
    ctx.setStatus('recording');
    const path = await this.capture.startRecording();
    return path;
  }

  /** Upload while emitting progress to the context. */
  protected async uploadWithProgress(ctx: DemoContext, path: string): Promise<void> {
    ctx.setStatus('uploading');
    const p$ = this.upload.upload(path);
    const sub = p$.subscribe((p) => ctx.setProgress(p));
    await lastValueFrom(p$);
    sub.unsubscribe();
  }

  /** Finalize: ensure 100% progress, mark as uploaded, then enqueue (last event). */
  protected finalize(ctx: DemoContext, enqueueId: string): void {
    ctx.setProgress(1);
    ctx.setStatus('uploaded');
    ctx.enqueue(enqueueId); // remains the last event (tests rely on this)
  }
}