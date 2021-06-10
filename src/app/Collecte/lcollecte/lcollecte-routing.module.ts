import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LcollectePage } from './lcollecte.page';

const routes: Routes = [
  {
    path: '',
    component: LcollectePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LcollectePageRoutingModule {}
