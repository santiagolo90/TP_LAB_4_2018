import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LogueadoService {

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService,) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.auth.estasLogueado()) {
        return true;
      }
      this.router.navigate(['']);
      return false;
  }

}
