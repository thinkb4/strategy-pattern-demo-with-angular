import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CaptureService {
  async startRecording(): Promise<string> {
    // Simulate ~1s recording, returning a "path"
    await new Promise((res) => setTimeout(res, 3000));
    return 'mem://video-path';
  }
}
