import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LcollectePageRoutingModule } from './lcollecte-routing.module';

import { LcollectePage } from './lcollecte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LcollectePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LcollectePage]
})
export class LcollectePageModule {}
