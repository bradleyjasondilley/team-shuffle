import { Component,Input, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';


@Component({
  selector: "member-component",
  styleUrls: ["member.component.scss"],
  templateUrl: "member.component.html"
})
export class MemberComponent implements OnInit {
  @Input()
  user: User;

  constructor() {}

  ngOnInit() {
    //console.log("called", this.user);
  }
}