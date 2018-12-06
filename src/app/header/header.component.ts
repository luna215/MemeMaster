import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
    constructor(private auth: AuthService){}

    ngOnInit() {
        this.authListenerSubs = this.auth
            .getAuthStatusListener().subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            })
    }
    
    logUserOut() {
        this.auth.logout();
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }
}

