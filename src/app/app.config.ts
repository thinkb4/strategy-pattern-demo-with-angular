import { ApplicationConfig, makeEnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideRecordingStrategyBindings, RECORDING_STRATEGY_BINDINGS } from '@/app/core/recording/recording-strategy.registry';
import { DemoKind } from '@/app/shared/models';
import { DirectUploadStrategy } from '@/app/core/recording/strategies/direct-upload.strategy';
import { ModalConfirmStrategy } from '@/app/core/recording/strategies/modal-confirm.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  // --- Register strategy bindings with specific provider to address specific needs and make it testable
    provideRecordingStrategyBindings([
      { kind: DemoKind.DirectUpload, strategy: DirectUploadStrategy, default: true },
      { kind: DemoKind.ModalConfirm, strategy: ModalConfirmStrategy },
    ]),
  // --- Alternative way without using the helper function
  //   makeEnvironmentProviders([
  //     {
  //       provide: RECORDING_STRATEGY_BINDINGS,
  //       useValue: {
  //         kind: DemoKind.DirectUpload,
  //         strategy: DirectUploadStrategy,
  //         default: true,
  //       },
  //       multi: true,
  //     },
  //     {
  //       provide: RECORDING_STRATEGY_BINDINGS,
  //       useValue: {
  //         kind: DemoKind.ModalConfirm,
  //         strategy: ModalConfirmStrategy,
  //       },
  //       multi: true,
  //     },
  //   ]),
   ],
};