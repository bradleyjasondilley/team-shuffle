import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';


@Component({
    selector: "roles-component",
    styleUrls: ["roles.component.scss"],
    templateUrl: "roles.component.html"
})
export class RolesComponent implements OnInit {
  @Input()
  allRoles: any;

  constructor() {}

  ngOnInit() {
    //console.log("called", this.user);
  }
}