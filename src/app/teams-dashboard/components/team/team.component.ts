import { Component,Input, OnChanges, OnInit } from '@angular/core';
import { Team } from "../../models/team.interface";

@Component({
  selector: "team-component",
  styleUrls: ["team.component.scss"],
  templateUrl: "team.component.html"
})
export class TeamComponent implements OnChanges, OnInit {

  @Input()
  team: Team;

  @Input()
  memberCount: number;

  @Input()
  teamScore: number;

  @Input()
  rolesLookup: any;

  ngOnInit(){
  }

  ngOnChanges() {
    this.updateTeamRoles();
  }

  updateTeamRoles() {
    this.clearRoles();


    this.team.members.forEach(member => {
      member.roles.forEach(role => {
        this.team["roles"][this.rolesLookup[role]]["count"] += 1;
        this.team["roles"][this.rolesLookup[role]]["members"].push(member.name);
      });
    });
  }

  clearRoles(){
    this.team["roles"].forEach(role => {
      role.count = 0;
      role.members = [];
    });
  }
}