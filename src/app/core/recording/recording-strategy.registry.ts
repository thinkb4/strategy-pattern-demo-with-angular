import {
  EnvironmentInjector,
  InjectionToken,
  EnvironmentProviders,
  Type,
  inject,
  Injectable,
  makeEnvironmentProviders,
} from '@angular/core';
import { DemoKind } from '@/app/shared/models';
import { RecordingStrategy } from './recording-strategy.types';

export interface StrategyBinding {
  kind: DemoKind;
  strategy: Type<RecordingStrategy>;
  default?: boolean;
}

export const RECORDING_STRATEGY_BINDINGS = new InjectionToken<StrategyBinding[]>('RECORDING_STRATEGY_BINDINGS');

@Injectable({ providedIn: 'root' })
export class StrategyRegistry {
  private readonly inj = inject(EnvironmentInjector);
  private readonly bindings = inject(RECORDING_STRATEGY_BINDINGS, { optional: true }) ?? [];

  getByKind(kind: DemoKind): RecordingStrategy {
    const b = this.bindings.find((x) => x.kind === kind);
    if (!b) {
      const have = this.bindings.map((x) => x.kind).join(', ') || '(none)';
      throw new Error(`No strategy bound for kind: ${kind}. Available: ${have}`);
    }
    return this.inj.get(b.strategy);
  }

  getDefault(): RecordingStrategy {
    const b = this.bindings.find((x) => x.default) ?? this.bindings[0];
    if (!b) throw new Error('No strategy bindings registered.');
    return this.inj.get(b.strategy);
  }
}

export function provideRecordingStrategyBindings(bindings: StrategyBinding[]): EnvironmentProviders {
  // IMPORTANT: one provider PER binding when using `multi: true`
  return makeEnvironmentProviders(
    bindings.map((b) => ({ provide: RECORDING_STRATEGY_BINDINGS, multi: true, useValue: b })),
  );
}