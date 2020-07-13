import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { LocalStorageService } from '.';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    localStorageService: LocalStorageService;

    constructor(private router: Router, private http: HttpClient, localStorageService: LocalStorageService) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorageService.get('user')));
        this.user = this.userSubject.asObservable();
        this.localStorageService = localStorageService;
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                this.localStorageService.set('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    logout() {
        this.localStorageService.remove('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
}