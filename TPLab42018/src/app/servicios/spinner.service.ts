import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerService {

  private subjectSpinner = new Subject<boolean>();
  $spinner = this.subjectSpinner.asObservable();

  constructor() { }

  public showSpinner() {
    this.subjectSpinner.next(true);
  }

  public hiddenSpinner() {
    this.subjectSpinner.next(false);
  }

}