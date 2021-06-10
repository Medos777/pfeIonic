import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCollectePageRoutingModule } from './add-collecte-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AddCollectePage } from './add-collecte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCollectePageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [AddCollectePage]
})
export class AddCollectePageModule {}
