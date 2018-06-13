import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class VerificarJwtService implements CanActivate {

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService,) {

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
    let url: string = state.url;
    console.log('url dentro de canActivate', url);
    console.log(route);
    console.log(state);
    let miToken = localStorage.getItem('token');
    if (this.auth.sosAdmin(miToken) === true) {
      return true;
    }
    else {
      this.mostarToast("Error","Acceso denegado","error")
      //this.router.navigate(['/error']);
      // this.router.navigate(['/pages/forms/inputs']);
      return !true;
    }
  }
  mostarToast(titulo:string,mensaje:string,tipo:string) {
    //ToastrService.success/error/warning/info/show()
    if (tipo =="success") {
      this.toastr.success(mensaje,titulo);
    }
    if (tipo =="error") {
      this.toastr.error(mensaje,titulo);
    }
    if (tipo =="warning") {
      this.toastr.warning(mensaje,titulo);
    }
    if (tipo =="info") {
      this.toastr.info(mensaje,titulo);
    }
    if (tipo =="show") {
      this.toastr.show(mensaje,titulo);
    }
    
  }
}
