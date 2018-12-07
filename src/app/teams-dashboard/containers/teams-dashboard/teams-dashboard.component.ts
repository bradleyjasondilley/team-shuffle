import { Component, OnInit } from "@angular/core";
import {TeamsDashboardService} from '../../teams-dashboard.service';
import { User } from '../../models/user.interface';


@Component({
  selector: "teams-dashboard",
  styleUrls: ["teams-deashborad.component.scss"],
  templateUrl: "./teams-dashboard.component.html"
})
export class TeamsDashboardComponent implements OnInit {
  teams: Array<any> = [];
  users: User[];

  constructor(private teamsDashboradService: TeamsDashboardService){

  }

  ngOnInit(){
    this.teamsDashboradService.getUsers()
      .subscribe((data: User[]) => {
        this.parseData(data);
      });
  }

  parseData(data){
    this.users = data;
    let uniqueTeams: Object = new Object();
    data.forEach(element => {
      uniqueTeams[element.pool] = 1;
    });

    Object.keys(uniqueTeams).sort().forEach(team=>{
      let members: Array<any> = [];
      members = data.filter((member)=> member.pool === team);
      this.teams.push({ "poolName": team, "members": members});
    });

    console.log("Unique", this.teams);
  }
}