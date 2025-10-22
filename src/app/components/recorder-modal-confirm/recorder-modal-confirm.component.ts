import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoStatus } from '@/app/shared/models';
import { CaptureService } from '@/app/core/services/capture/capture.service';
import { UploadService } from '@/app/core/services/upload/upload.service';
import { ConfirmService } from '@/app/core/services/confirm/confirm.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-recorder-modal-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recorder-modal-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecorderModalConfirmComponent {
  @Input() title = '';

  status: DemoStatus = 'idle';
  progress = 0;

  constructor(
    private readonly capture: CaptureService,
    private readonly upload: UploadService,
    private readonly confirm: ConfirmService,
    private readonly cd: ChangeDetectorRef,
  ) { }

  async start(): Promise<void> {
    try {
      this.status = 'recording';
      this.cd.markForCheck();

      const path = await this.capture.startRecording();

      this.status = 'processing';
      this.cd.markForCheck();

      const ok = await this.confirm.confirm(this.title);
      if (!ok) {
        this.status = 'idle';
        this.progress = 0;
        this.cd.markForCheck();
        return;
      }

      this.status = 'uploading';
      this.cd.markForCheck();

      const progress$ = this.upload.upload(path);
      const sub = progress$.subscribe((p) => {
        this.progress = p;
        this.cd.markForCheck();
      });
      await lastValueFrom(progress$);
      sub.unsubscribe();

      this.progress = 1;
      this.status = 'uploaded';
      this.cd.markForCheck();
    } catch {
      this.status = 'error';
      this.cd.markForCheck();
    }
  }

  reset(): void {
    this.status = 'idle';
    this.progress = 0;
    this.cd.markForCheck();
  }
}