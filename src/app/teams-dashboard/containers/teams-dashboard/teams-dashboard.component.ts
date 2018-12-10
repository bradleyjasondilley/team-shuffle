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
    console.log("user", user);
    console.log("from", from);
    console.log("to", to);
    if (position){
      console.log("position", position.id);
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
        members = data.users.filter(member => member.pool === team);
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