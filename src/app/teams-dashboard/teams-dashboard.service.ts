import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { forkJoin} from 'rxjs';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './models/user.interface';

const USER_API: string = '/assets/data/users.json';
const ROLES_API: string = '/assets/data/roles.json';

@Injectable()
export class TeamsDashboardService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return forkJoin(
      this.http.get(USER_API).map(res => res),
      this.http.get(ROLES_API).map(res => res)
    ).map((data: any[]) => {
      let users: any = data[0];
      let roles: any[] = data[1];
      return { users: users, roles: roles };
    });
  }
}