import { TestBed } from '@angular/core/testing';
import { ConfirmService } from './confirm.service';

describe('ConfirmService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('returns true when user confirms', async () => {
    const spy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    TestBed.configureTestingModule({});
    const svc = TestBed.inject(ConfirmService);
    await expect(svc.confirm('Title')).resolves.toBe(true);
    expect(spy).toHaveBeenCalled();
  });

  it('returns false when user cancels', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const svc = TestBed.inject(ConfirmService);
    await expect(svc.confirm('Title')).resolves.toBe(false);
  });
});