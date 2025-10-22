import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UploadService } from './upload.service';

describe('UploadService', () => {
  it('emits progress 0..1 and completes', fakeAsync(() => {
    TestBed.configureTestingModule({});
    const svc = TestBed.inject(UploadService);
    const seen: number[] = [];
    svc.upload('mem://path').subscribe(p => seen.push(p));
    tick(150 * 10 + 5);
    expect(seen.length).toBeGreaterThan(0);
    expect(seen[seen.length - 1]).toBe(1);
  }));
});