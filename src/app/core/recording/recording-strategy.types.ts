import { DemoContext } from '@/app/shared/models';

export interface RecordingStrategy {
  run(ctx: DemoContext): Promise<void>;
}
