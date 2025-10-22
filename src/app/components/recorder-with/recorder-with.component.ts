import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoContext, DemoKind, DemoStatus } from '@/app/shared/models';
import { StrategyRegistry } from '@/app/core/recording/recording-strategy.registry';
import { RecordingStrategy } from '@/app/core/recording/recording-strategy.types';

@Component({
  selector: 'app-recorder-with',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recorder-with.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecorderWithComponent {
  @Input() title = '';
  /** Accept a kind OR a concrete instance (useful in tests) */
  @Input() strategy?: DemoKind | RecordingStrategy;

  status: DemoStatus = 'idle';
  progress = 0;

  constructor(
    private readonly registry: StrategyRegistry,
    private readonly cd: ChangeDetectorRef,
  ) {}

  private resolve(): RecordingStrategy {
    if (typeof this.strategy === 'string') return this.registry.getByKind(this.strategy);
    if (this.strategy) return this.strategy;
    return this.registry.getDefault();
  }

  private ctx(): DemoContext {
    return {
      title: this.title,
      kind: typeof this.strategy === 'string' ? this.strategy : DemoKind.DirectUpload,
      setStatus: (s) => { this.status = s; this.cd.markForCheck(); },
      setProgress: (p) => { this.progress = p; this.cd.markForCheck(); },
      enqueue: (_id) => { /* no-op in demo */ },
    };
  }

  async start(): Promise<void> {
    const s = this.resolve();
    await s.run(this.ctx());
  }

  reset(): void {
    this.status = 'idle';
    this.progress = 0;
    this.cd.markForCheck();
  }
}