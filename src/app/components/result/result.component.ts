import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { untilComponentDestroyed } from 'ng2-rx-componentdestroyed';

import { IItemModel } from 'src/app/interfaces/item-model.interface';
import { DataService } from 'src/app/services';

const filterItems = (name, type, item) => item.name.includes(name) && item.type.includes(type);

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit, OnDestroy {
  public items: Observable<IItemModel[]>;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.items = combineLatest(this.route.queryParamMap, this.dataService.items$).pipe(
      map(([queryParams, items]) => {
        const name = queryParams.get('name') || '';
        const type = queryParams.get('type') || '';
        const filter = filterItems.bind(this, name, type);
        return items.filter(filter);
      }),
    );
    this.dataService.loadItems().pipe(
      untilComponentDestroyed(this)
    ).subscribe();
  }

  ngOnDestroy() {}

}
