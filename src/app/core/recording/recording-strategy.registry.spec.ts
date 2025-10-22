import { TestBed } from '@angular/core/testing';
import { provideRecordingStrategyBindings, StrategyRegistry } from './recording-strategy.registry';
import { RecordingStrategy } from './recording-strategy.types';
import { DemoContext, DemoKind } from '@/app/shared/models';

class AStrategy implements RecordingStrategy {
  async run(_: DemoContext): Promise<void> {}
}
class BStrategy implements RecordingStrategy {
  async run(_: DemoContext): Promise<void> {}
}

describe('StrategyRegistry', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // Provide the actual classes so EnvironmentInjector can create them.
        AStrategy,
        BStrategy,
        provideRecordingStrategyBindings([
          { kind: DemoKind.DirectUpload, strategy: AStrategy, default: true },
          { kind: DemoKind.ModalConfirm, strategy: BStrategy },
        ]),
      ],
    });
  });

  it('resolves by kind', () => {
    const reg = TestBed.inject(StrategyRegistry);
    expect(reg.getByKind(DemoKind.DirectUpload)).toBeInstanceOf(AStrategy);
    expect(reg.getByKind(DemoKind.ModalConfirm)).toBeInstanceOf(BStrategy);
  });

  it('returns default when requested', () => {
    const reg = TestBed.inject(StrategyRegistry);
    expect(reg.getDefault()).toBeInstanceOf(AStrategy);
  });

  it('throws for unknown kind', () => {
    const reg = TestBed.inject(StrategyRegistry);
    expect(() => reg.getByKind('missing' as any)).toThrow();
  });
});