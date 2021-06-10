import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCollectePage } from './add-collecte.page';

const routes: Routes = [
  {
    path: '',
    component: AddCollectePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCollectePageRoutingModule {}
