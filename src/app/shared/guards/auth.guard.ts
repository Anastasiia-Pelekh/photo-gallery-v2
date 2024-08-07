import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../../public/auth-page/auth.service";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  canActivate(): Observable<true | UrlTree> {
    return this.authService.user$.pipe(
      map(user => !!user || this.router.parseUrl('/login')),
    )
  }
}
