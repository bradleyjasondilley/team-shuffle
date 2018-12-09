import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { User } from './models/user.interface';

const USER_API: string = '/assets/data/users.json';
const ROLES_API: string = '/assets/data/roles.json';

@Injectable()
export class TeamsDashboardService {
    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http
          .get(USER_API)
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json()));
    }

    getRoles(): Observable<User[]> {
        return this.http
          .get(ROLES_API)
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json()));
    }

    getData(): Observable<any> {
        return Observable.forkJoin([
          this.http.get(USER_API).map(res => res.json()),
          this.http.get(ROLES_API).map(res => res.json())
        ])
        .map((data: any[]) => {
          let users: any = data[0];
          let roles: any[] = data[1];
          return {"users":users, "roles":roles};
        });
      }

}