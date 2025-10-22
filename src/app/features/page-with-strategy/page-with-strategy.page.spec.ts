import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageWithStrategyPage } from './page-with-strategy.page';
import { provideRecordingStrategyBindings } from '@/app/core/recording/recording-strategy.registry';
import { DemoKind } from '@/app/shared/models';
import { DirectUploadStrategy } from '@/app/core/recording/strategies/direct-upload.strategy';
import { ModalConfirmStrategy } from '@/app/core/recording/strategies/modal-confirm.strategy';

describe('PageWithStrategyPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWithStrategyPage],
      providers: [
        provideRouter([]), // RouterLink needs a router
        provideRecordingStrategyBindings([
          { kind: DemoKind.DirectUpload, strategy: DirectUploadStrategy, default: true },
          { kind: DemoKind.ModalConfirm, strategy: ModalConfirmStrategy },
        ]),
      ],
    }).compileComponents();
  });

  it('renders two strategy-driven recorders', () => {
    const fixture = TestBed.createComponent(PageWithStrategyPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('app-recorder-with').length).toBe(2);
  });
});