import { TestBed } from '@angular/core/testing';
import { RecorderWithComponent } from './recorder-with.component';
import { RecordingStrategy } from '@/app/core/recording/recording-strategy.types';
import { DemoContext, DemoKind } from '@/app/shared/models';
import { provideRecordingStrategyBindings } from '@/app/core/recording/recording-strategy.registry';

class FakeStrategy implements RecordingStrategy {
  run = jest.fn(async (ctx: DemoContext) => {
    ctx.setStatus('uploading');
    ctx.setProgress(1);
    ctx.setStatus('uploaded');
    ctx.enqueue('fake-id');
  });
}
class BoundFakeStrategy implements RecordingStrategy {
  async run(ctx: DemoContext): Promise<void> {
    ctx.setStatus('uploaded');
    ctx.enqueue('bound-id');
  }
}

describe('RecorderWithComponent', () => {
  it('accepts a concrete strategy instance via input', async () => {
    await TestBed.configureTestingModule({
      imports: [RecorderWithComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecorderWithComponent);
    const comp = fixture.componentInstance;
    const fake = new FakeStrategy();

    comp.title = 'Test';
    comp.strategy = fake;

    await comp.start();

    expect(fake.run).toHaveBeenCalled();
    expect(comp['status']).toBe('uploaded');
    expect(comp['progress']).toBe(1);
  });

  it('resolves strategy by kind through DI bindings', async () => {
    await TestBed.configureTestingModule({
      imports: [RecorderWithComponent],
      providers: [
        // Provide the class so DI can construct it.
        BoundFakeStrategy,
        provideRecordingStrategyBindings([{ kind: DemoKind.DirectUpload, strategy: BoundFakeStrategy, default: true }]),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecorderWithComponent);
    const comp = fixture.componentInstance;

    comp.title = 'Kind';
    comp.strategy = DemoKind.DirectUpload;

    await comp.start();

    expect(comp['status']).toBe('uploaded');
  });
});