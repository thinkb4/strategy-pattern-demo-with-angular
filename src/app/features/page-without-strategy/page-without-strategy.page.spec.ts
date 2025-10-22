import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageWithoutStrategyPage } from './page-without-strategy.page';

describe('PageWithoutStrategyPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageWithoutStrategyPage],
      // RouterLink in the template needs these providers
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders both without-strategy components', () => {
    const fixture = TestBed.createComponent(PageWithoutStrategyPage);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-recorder-direct-upload')).toBeTruthy();
    expect(el.querySelector('app-recorder-modal-confirm')).toBeTruthy();
  });
});