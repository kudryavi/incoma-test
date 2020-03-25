import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  constructor(
    private router: Router
  ) {}

  onSubmit(form) {
    const {name, type} = form.value;
    this.router.navigate([''], {
      queryParams: {
        name,
        type
      }
    });
  }
}
