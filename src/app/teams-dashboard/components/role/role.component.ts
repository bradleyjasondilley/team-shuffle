import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';


@Component({
    selector: "role-component",
    styleUrls: ["role.component.scss"],
    templateUrl: "role.component.html"
})
export class RoleComponent implements OnInit {
  @Input()
  role: any;

  constructor() {}

  ngOnInit() {
    //console.log("called", this.user);
  }
}