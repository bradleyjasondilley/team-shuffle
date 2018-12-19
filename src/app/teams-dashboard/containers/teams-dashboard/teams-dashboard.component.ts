import { Component, OnInit } from "@angular/core";
import {TeamsDashboardService} from '../../teams-dashboard.service';
import { User } from '../../models/user.interface';
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";


@Component({
  selector: "teams-dashboard",
  styleUrls: ["teams-deashborad.component.scss"],
  templateUrl: "./teams-dashboard.component.html"
})
export class TeamsDashboardComponent implements OnInit {
  teams: Array<any> = [];
  teamLookup: Object = {};
  users: User[];
  roles: Object;
  teamRoles: Array<Object> = [];
  rolesLookup: Object = {};

  subs = new Subscription();

  constructor(
    private teamsDashboradService: TeamsDashboardService,
    private dragulaService: DragulaService
  ) {
    this.subs.add(
      this.dragulaService.drag("TEAMS").subscribe(({ name, el, source }) => {})
    );

    this.subs.add(
      this.dragulaService
        .drop("TEAMS")
        .subscribe(({ name, el, target, source, sibling }) => {
          let position;
          if (sibling) {
            position = sibling.firstElementChild;
          }

          this.updateTeam(
            el.firstElementChild.id,
            source.parentElement.id,
            target.parentElement.id,
            position
          );
        })
    );
  }

  ngOnInit() {
    this.teamsDashboradService.getData().subscribe((data: any) => {
      this.parseData(data);
    });
  }

  updateTeam(user, oldPool, newPool, moveToPos) {

    let moving;
    let fromTeamIndex = this.teamLookup[oldPool];
    let toTeamIndex = this.teamLookup[newPool];


    this.teams[fromTeamIndex].members = this.teams[fromTeamIndex].members.filter(
      member => {
        if (member.id === user) {
          moving = member;
        }
        return member.id != user;
      }
    );

    let memberIndex = 0;
    if (moveToPos) {
      this.teams[toTeamIndex].members.forEach((member, index) => {
        if (moveToPos) {
          if (member.id === moveToPos.id) {
            if (index > 0) {
              memberIndex = index;
            }
          }
        } else {
          memberIndex = this.teams[toTeamIndex].members.length;
        }
      });
    } else {
      memberIndex = this.teams[toTeamIndex].members.length;
    }


    this.teams[toTeamIndex].members.splice(memberIndex, 0, moving);
  }

  parseData(data) {
    this.users = data.users;
    this.roles = data.roles;

    let uniqueTeams: Object = new Object();

    data.users.forEach(element => {
      element.availability = this.calculateAvailability(element.roles);
      element.effective = this.calculateEffective(
        element.throughput,
        element.availability
      );
      uniqueTeams[element.pool] = 1;
    });

    

    Object.keys(uniqueTeams)
      .sort()
      .forEach((team,index) => {
        let members: Array<any> = [];
        members = data.users.filter(member => {
          member.id = member.name.toLowerCase().replace(/\s/g, "");
          return member.pool === team;
        });
        let teamScore = members.reduce(
          (total, memberdata) => total + memberdata.effective,
          0
        );

        let poolId = this.genId(team);
        this.teamLookup[poolId] = index;

        this.teams.push({
          poolId: poolId,
          poolName: team,
          members: members,
          roles: this.getRoles(),
          teamScore: teamScore.toFixed(1)
        });
      });
    console.log("teams", this.teams);
    console.log("roles", this.roles);
    console.log("team roles", this.teamRoles);
  }

  getRoles(){
    let roles = [];
    Object.keys(this.roles).forEach((role, index) => {
      roles.push({ name: role, count: 0, members: [] });
      this.rolesLookup[role] = index;
    });
    return roles;
  }

  genId(inputValue){
    return inputValue.toLowerCase().replace(/\s/g, "");
  }

  calculateAvailability(userRoles) {
    let availability = 10;
    userRoles.forEach(role => {
      availability -= this.roles[role];
    });

    return availability / 10;
  }

  calculateEffective(throughput, availability) {
    return ((throughput / 5) * 10 * ((availability / 1) * 10)) / 100;
  }

  checkTeams(event) {
    console.log("event", event);
    console.log("teams", this.teams);
  }
}