import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class ActivoJwtService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    let url: string = state.url;
    console.log('url dentro de canActivate', url);
    console.log(route);
    console.log(state);
    let miToken = localStorage.getItem('token');
    if (this.auth.sosActivo(miToken) === true) {
      return true;
    }
    else {
      //this.router.navigate(['/error']);
      return false;
    }
  }
}


