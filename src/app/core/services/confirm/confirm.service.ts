import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  async confirm(title: string): Promise<boolean> {
    // Very simple browser confirm
    // eslint-disable-next-line no-alert
    return window.confirm(`${title}\nProceed with upload?`);
  }
}
