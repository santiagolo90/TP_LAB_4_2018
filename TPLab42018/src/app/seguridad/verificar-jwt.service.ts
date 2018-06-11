// import { Injectable } from '@angular/core';

// @Injectable()
// export class VerificarJwtService {

//   constructor() { }

// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../servicios/auth.service';

@Injectable()
export class VerificarJwtService implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {

  }


  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     let miToken = localStorage.getItem('token');
  //     let perfil = this.auth.sosAdmin(miToken)
  //   if(this.auth.sosAdmin(miToken) == true) {
      
  //     this.router.navigate(['/principal']);
  //     return true;
  //   }
    
  //   return false;
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {

    // 
      let url: string = state.url;
      console.log('url dentro de canActivate', url);
      console.log(route);
      console.log(state);
      let miToken = localStorage.getItem('Token');
      if ( this.auth.sosAdmin(miToken) === true )
      {

        return true;
      }
      else
      {
        this.router.navigate(['/error']);
        // this.router.navigate(['/pages/forms/inputs']);
        return !true;
      }
}
}
