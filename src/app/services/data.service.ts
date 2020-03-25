import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IItemModel } from '../interfaces/item-model.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private state = new BehaviorSubject<IItemModel[]>([]);
  get items$(): Observable<IItemModel[]> {
    return this.state.asObservable();
  }

  constructor(
    private readonly http: HttpClient
  ) {}

  public loadItems(): Observable<IItemModel[]> {
    return this.http.get<IItemModel[]>('/api/items').pipe(
      tap(items => this.state.next(items))
    );
  }
}
