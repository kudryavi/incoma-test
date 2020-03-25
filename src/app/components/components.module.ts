import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { FilterComponent } from './filter/filter.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    FilterComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
  ],
  exports: [FilterComponent, ResultComponent]
})
export class ComponentsModule {}
