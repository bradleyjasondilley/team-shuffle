import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { TeamsDashboardModule } from './teams-dashboard/teams-dashboard.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule, TeamsDashboardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
