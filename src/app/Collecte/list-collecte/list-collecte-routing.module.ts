import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCollectePage } from './list-collecte.page';

const routes: Routes = [
  {
    path: '',
    component: ListCollectePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCollectePageRoutingModule {}
