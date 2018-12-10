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
  users: User[];
  roles: Object;
  subs = new Subscription();

  constructor(
    private teamsDashboradService: TeamsDashboardService,
    private dragulaService: DragulaService
  ) {
    this.subs.add(
      this.dragulaService.drag("TEAMS").subscribe(({ name, el, source }) => {
        
      })
    );

    this.subs.add(
      this.dragulaService
        .drop("TEAMS")
        .subscribe(({ name, el, target, source, sibling }) => {
          let position;
          if (sibling){
            position = sibling.firstElementChild;
          }

          this.updateTeam(el.firstElementChild.id, source.parentNode.id, target.parentNode.id, position);
        })
    );
  }

  updateTeam(user, from, to, position){
    
    if (position){
      console.log("info", user, from, to, position.id);
    }else{
      console.log("info", user, from, to);
    }


    if(from != to){
      let removed;
      let teamIndex: number = 0;
      let memberIndex: number = 0;
      this.teams.forEach((team, tIndex) => {
        //members = data.users.filter(member => member.pool === team);
        
        if (team.poolId === from) {
          team.members = team.members.filter(member => {
            if (member.id === user) {
              removed = member;
            }
            return member.id != user;
          });
        }

        if(team.poolId === to){
          team.members.forEach((member,index) => {
            if (member.id === position.id) {
              teamIndex = tIndex;
              if (index > 0){
                memberIndex = index;
              }
              
            }
          });
        }
    
      });
      console.log("!!!!!!!!!!!!!", removed, teamIndex, memberIndex);
      this.teams[teamIndex].members.splice(memberIndex, 0, removed);
      
      console.log("!!!",this.teams);
    }
  }

  ngOnInit() {
    this.teamsDashboradService.getData().subscribe((data: any) => {
      this.parseData(data);
    });
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
      .forEach(team => {
        let members: Array<any> = [];
        members = data.users.filter(member => {
          member.id = member.name.toLowerCase().replace(/\s/g, "");
          return member.pool === team
        });
        let teamScore = members.reduce(
          (total, memberdata) => total + memberdata.effective,
          0
        );
        this.teams.push({
          poolId: team.toLowerCase().replace(/\s/g, ""),
          poolName: team,
          members: members,
          teamScore: teamScore.toFixed(1)
        });
      });

    console.log("teams", this.teams);
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

  checkTeams(event){
    console.log("event", event);
    console.log("teams", this.teams);
  }
}