import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCollectePageRoutingModule } from './list-collecte-routing.module';

import { ListCollectePage } from './list-collecte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCollectePageRoutingModule
  ],
  declarations: [ListCollectePage]
})
export class ListCollectePageModule {}
