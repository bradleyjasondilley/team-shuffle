import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { User } from './models/user.interface';

const USER_API: string = '/assets/data/users.json';

@Injectable()
export class TeamsDashboardService {
    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http
          .get(USER_API)
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json()));
    }

}