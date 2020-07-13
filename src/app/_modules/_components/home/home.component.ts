import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../../_models';
import { UserService, AuthenticationService, LanguageService } from '../../../_services';
import { LanguageProperties } from '../../../_models/LanguageProperties';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi: User;
    storedLanguageProperties: LanguageProperties;

    constructor(private userService: UserService, private authenticationService: AuthenticationService,languageService : LanguageService) {
        this.user = this.authenticationService.userValue;
        this.storedLanguageProperties = languageService.get();
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }
}