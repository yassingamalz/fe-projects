import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private confirmationSubject = new Subject<string>();
  public confirmation$ = this.confirmationSubject.asObservable();

  showConfirmation(message: string): void {
    this.confirmationSubject.next(message);
  }

  clearConfirmation(): void {
    this.confirmationSubject.next('');
  }
}
