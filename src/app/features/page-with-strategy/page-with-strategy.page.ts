import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecorderWithComponent } from '@/app/components/recorder-with/recorder-with.component';
import { DemoKind } from '@/app/shared/models';

@Component({
  standalone: true,
  selector: 'app-page-with-strategy',
  imports: [RouterLink, RecorderWithComponent],
  templateUrl: './page-with-strategy.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWithStrategyPage {
  readonly DemoKind = DemoKind;
}
