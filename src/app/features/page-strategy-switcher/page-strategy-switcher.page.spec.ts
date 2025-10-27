import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import { PageStrategySwitcherPage } from './page-strategy-switcher.page';
import { DemoKind } from '@/app/shared/models';
import type { RecordingStrategy } from '@/app/core/recording/recording-strategy.types';
import { RecorderWithComponent } from '@/app/components/recorder-with/recorder-with.component';

@Component({
  // Stub to capture inputs instead of rendering the real recorder
  standalone: true,
  selector: 'app-recorder-with',
  template: `<div data-testid="recorder-stub">{{ strategy }}</div>`,
})
class RecorderWithStub {
  @Input() title = '';
  @Input() strategy?: DemoKind | RecordingStrategy;
}

describe('PageStrategySwitcherPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageStrategySwitcherPage, RecorderWithStub],
    })
      // Replacing the real RecorderWithComponent with the stub
      .overrideComponent(PageStrategySwitcherPage, {
        remove: { imports: [RecorderWithComponent] },
        add: { imports: [ReactiveFormsModule, NgFor, RecorderWithStub] },
      })
      .compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(PageStrategySwitcherPage);
    const page = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, page };
  }

  it('renders all options (Default + DI-bound strategies)', () => {
    const { fixture, page } = setup();

    const htmlOptions = Array
      .from((fixture.nativeElement as HTMLElement).querySelectorAll('option'))
      .map(o => o.textContent?.trim());

    const expected = ['Default (DI)', ...page.options.map(o => o.label)];

    expect(htmlOptions.length).toBe(expected.length);
    expect(htmlOptions).toEqual(expected);
  });

  it('starts on Default (DI) and passes undefined strategy to the recorder', () => {
    const { fixture } = setup();

    const selectedLabel = (fixture.nativeElement as HTMLElement)
      .querySelector('.hint span')?.textContent?.trim();
    expect(selectedLabel).toBe('Default (DI)');

    const stubDE = fixture.debugElement.query(By.directive(RecorderWithStub));
    const stub = stubDE.componentInstance as RecorderWithStub;
    expect(stub.strategy).toBeUndefined();
  });

  it('switches to Modal Confirm and passes the selected kind to the recorder', () => {
    const { fixture, page } = setup();

    page.kindCtrl.setValue(DemoKind.ModalConfirm);
    fixture.detectChanges();

    const selectedLabel = (fixture.nativeElement as HTMLElement)
      .querySelector('.hint span')?.textContent?.trim();
    expect(selectedLabel).toBe('Modal Confirm');

    const stubDE = fixture.debugElement.query(By.directive(RecorderWithStub));
    const stub = stubDE.componentInstance as RecorderWithStub;
    expect(stub.strategy).toBe(DemoKind.ModalConfirm);
  });

  it('switches to Direct Upload and then back to Default (DI)', () => {
    const { fixture, page } = setup();

    // Select Direct Upload
    page.kindCtrl.setValue(DemoKind.DirectUpload);
    fixture.detectChanges();

    let stubDE = fixture.debugElement.query(By.directive(RecorderWithStub));
    let stub = stubDE.componentInstance as RecorderWithStub;
    expect(stub.strategy).toBe(DemoKind.DirectUpload);

    // Back to default (null -> undefined to the child)
    page.kindCtrl.setValue(null);
    fixture.detectChanges();

    const selectedLabel = (fixture.nativeElement as HTMLElement)
      .querySelector('.hint span')?.textContent?.trim();
    expect(selectedLabel).toBe('Default (DI)');

    stubDE = fixture.debugElement.query(By.directive(RecorderWithStub));
    stub = stubDE.componentInstance as RecorderWithStub;
    expect(stub.strategy).toBeUndefined();
  });
});