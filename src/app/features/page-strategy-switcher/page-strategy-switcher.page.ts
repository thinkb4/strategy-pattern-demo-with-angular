import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RecorderWithComponent } from '@/app/components/recorder-with/recorder-with.component';
import { DemoKind } from '@/app/shared/models';

type Option = { label: string; value: DemoKind };

@Component({
  standalone: true,
  selector: 'app-page-strategy-switcher',
  imports: [
    ReactiveFormsModule,
    NgFor,
    RecorderWithComponent,
  ],
  templateUrl: './page-strategy-switcher.page.html',
  styleUrls: ['./page-strategy-switcher.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageStrategySwitcherPage {
  readonly options: Option[] = [
    { label: 'Direct Upload', value: DemoKind.DirectUpload },
    { label: 'Modal Confirm', value: DemoKind.ModalConfirm },
  ];

  readonly kindCtrl = new FormControl<DemoKind | null>(null, { nonNullable: false });
  private readonly selected = signal<DemoKind | null>(this.kindCtrl.value);

  readonly selectedKind = computed(() => this.selected());
  readonly currentLabel = computed<string>(() => {
    const v = this.selected();
    if (!v) return 'Default (DI)';
    return this.options.find(o => o.value === v)?.label ?? String(v);
  });
  readonly currentTitle = computed(() => `${this.currentLabel()} — Recorder`);

  constructor() {
    this.kindCtrl.valueChanges.subscribe(v => this.selected.set(v));
  }
}