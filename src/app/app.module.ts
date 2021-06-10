import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MatDialogModule,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule,    MatDialogModule,HttpClientModule,
    ReactiveFormsModule,ReactiveFormsModule],
  providers: [DatePipe,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: MatDialogRef, useValue: {} }],
  bootstrap: [AppComponent],
})
export class AppModule {}