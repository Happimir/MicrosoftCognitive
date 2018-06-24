import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { TextAnalyticsService } from './text-analytics-service/text-analytics.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [TextAnalyticsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
