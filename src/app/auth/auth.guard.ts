import { CanActivate,
        ActivatedRouteSnapshot,
        RouterStateSnapshot, Router
      } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root'})

export class AuthGaurd implements CanActivate {
  constructor (private auth: AuthService, private router: Router) {}

  canActivate(
    rotue: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAuth = this.auth.getIsAuth();
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
      return isAuth;
  }
}
