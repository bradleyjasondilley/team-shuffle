import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TeamsDashboardComponent } from "../teams-dashboard/containers/teams-dashboard/teams-dashboard.component";
import { TeamsDashboardService} from '../teams-dashboard/teams-dashboard.service';

import { TeamComponent } from "./components/team/team.component";
import { MemberComponent } from "./components/member/member.component";


@NgModule({
  declarations: [TeamsDashboardComponent, TeamComponent, MemberComponent],
  imports: [BrowserModule, CommonModule, HttpModule],
  providers: [TeamsDashboardService],
  exports: [TeamsDashboardComponent]
})
export class TeamsDashboardModule {}
