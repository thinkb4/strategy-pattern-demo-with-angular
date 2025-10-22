import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecorderModalConfirmComponent } from '@/app/components/recorder-modal-confirm/recorder-modal-confirm.component';
import { RecorderDirectUploadComponent } from '@/app/components/recorder-direct-upload/recorder-direct-upload.component';
import { DemoKind } from '@/app/shared/models';

@Component({
  standalone: true,
  selector: 'app-page-without-strategy',
  imports: [RouterLink, RecorderModalConfirmComponent, RecorderDirectUploadComponent],
  templateUrl: './page-without-strategy.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWithoutStrategyPage {
  readonly DemoKind = DemoKind;
}
