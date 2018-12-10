import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { TeamsDashboardComponent } from "../teams-dashboard/containers/teams-dashboard/teams-dashboard.component";
import { TeamsDashboardService} from '../teams-dashboard/teams-dashboard.service';

import { TeamComponent } from "./components/team/team.component";
import { MemberComponent } from "./components/member/member.component";

import { DragulaModule } from "ng2-dragula";

import { MakeidPipe } from "../teams-dashboard/pipes/makeid.pipe";

@NgModule({
  declarations: [TeamsDashboardComponent, TeamComponent, MemberComponent, MakeidPipe],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    DragulaModule.forRoot()
  ],
  providers: [TeamsDashboardService],
  exports: [TeamsDashboardComponent]
})
export class TeamsDashboardModule {}
