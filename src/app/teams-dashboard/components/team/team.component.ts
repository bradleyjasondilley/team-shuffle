import { Component,Input } from '@angular/core';
import { Team } from "../../models/team.interface";

@Component({
    selector: 'team-component',
    styleUrls: ['team.component.scss'],
    templateUrl: 'team.component.html'
})
export class TeamComponent{
    @Input()
    team: Team;

    constructor(){

    }
}