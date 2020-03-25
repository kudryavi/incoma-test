import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, convertToParamMap } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, of } from 'rxjs';

import { ResultComponent } from './result.component';
import { DataService } from 'src/app/services/data.service';
import { IItemModel } from 'src/app/interfaces/item-model.interface';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<ResultComponent>;
  let itemsSubj: BehaviorSubject<IItemModel[]>;
  let queryParamsSubj: BehaviorSubject<ParamMap>;
  let loadItemsSpy;
  const testItems = [
    {
      id: 1,
      name: 'Audi',
      type: 'sedan'
    },
    {
      id: 2,
      name: 'BMW',
      type: 'coupe'
    },
    {
      id: 3,
      name: 'Toyota',
      type: 'suv'
    },
    {
      id: 4,
      name: 'Nissan',
      type: 'truck'
    },
    {
      id: 5,
      name: 'Tesla',
      type: 'electric'
    }
  ];

  beforeEach(async(() => {
    itemsSubj = new BehaviorSubject([]);
    queryParamsSubj = new BehaviorSubject(convertToParamMap({}));
    loadItemsSpy = jasmine.createSpy('loadItems').and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ ResultComponent ],
      imports: [ MatListModule, MatCardModule ],
      providers: [
        {
          provide: DataService,
          useValue: {
            items$: itemsSubj,
            loadItems: loadItemsSpy,
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamsSubj,
          }
        }
      ]
    })
    .overrideComponent(ResultComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DataService.loadItems', () => {
    expect(loadItemsSpy).toHaveBeenCalled();
  });

  it('should display correct number of items', () => {
    itemsSubj.next(testItems);
    fixture.detectChanges();
    const itemsEls = element.queryAll(By.css('mat-list-item'));
    expect(itemsEls.length).toEqual(testItems.length);
  });

  it('should correctly display items by filter name param', () => {
    queryParamsSubj.next(convertToParamMap({ name: 'Tesla' }));
    itemsSubj.next(testItems);
    fixture.detectChanges();
    const itemsEls = element.queryAll(By.css('mat-list-item'));
    expect(itemsEls.length).toEqual(1);
  });

  it('should correctly display items by filter type param', () => {
    queryParamsSubj.next(convertToParamMap({ type: 'truck' }));
    itemsSubj.next(testItems);
    fixture.detectChanges();
    const itemsEls = element.queryAll(By.css('mat-list-item'));
    expect(itemsEls.length).toEqual(1);
  });

  it('should not display any item when name and type doesn\'t match', () => {
    queryParamsSubj.next(convertToParamMap({ type: 'truck', name: 'Tesla' }));
    itemsSubj.next(testItems);
    fixture.detectChanges();
    const itemsEls = element.queryAll(By.css('mat-list-item'));
    expect(itemsEls.length).toEqual(0);
  });
});
