import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DrawableDirective } from './drawable.directive';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ChartComponent } from './chart/chart.component';


@NgModule({
  declarations: [
    AppComponent,
    DrawableDirective,
    ChartComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
