import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PxtLoadingService {

  private _isLoading: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public readonly isLoading: Observable<any> = this._isLoading.asObservable();
  
  update(load: any) {
      this._isLoading.next(load);
  }

  start() {
    this._isLoading.next(true);
  }

  stop() {
    this._isLoading.next(false);
  }

}
