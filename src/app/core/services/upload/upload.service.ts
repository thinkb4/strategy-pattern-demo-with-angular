import { Injectable } from '@angular/core';
import { Observable, interval, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  upload(_path: string): Observable<number> {
    // Simulate 10 ticks -> 0..1 progress
    return interval(150).pipe(take(10), map((i) => (i + 1) / 10));
  }
}
