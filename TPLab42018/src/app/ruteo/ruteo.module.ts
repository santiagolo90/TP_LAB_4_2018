import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';//agregue esto

import { LoginComponent } from '../componentes/login/login.component'
import { ErrorComponent } from '../componentes/error/error.component'
import { PrincipalComponent } from '../componentes/principal/principal.component'
import { RegistroComponent } from '../componentes/registro/registro.component'
import { VerificarJwtService } from '../seguridad/verificar-jwt.service'
import { ActivoJwtService } from '../seguridad/activo-jwt.service'

//agregue esto
const MiRuteo = [
  {path: '' , component: LoginComponent},
  {path: 'principal' , component: PrincipalComponent, canActivate: [VerificarJwtService]},  
  {path: 'Principal' , component: PrincipalComponent,canActivate: [VerificarJwtService]},
  {path: 'registro' , component: RegistroComponent,canActivate: [VerificarJwtService]},  
  {path: 'Registro' , component: RegistroComponent,canActivate: [VerificarJwtService]},     
  // { path: 'alumno' , component: AlumnoComponent ,
  // children:
  //      [{path: 'datos' , component: DatosComponent},
  //       {path: 'grilla' , component: GrillaComponent}
  //     ]
  // },
  {path: '**' , component: ErrorComponent},
  {path: 'error' , component: ErrorComponent}];//agregue esto

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(MiRuteo)//agregue esto
  ],
  declarations: [],
  exports : [
    RouterModule
  ]
})
export class RuteoModule { }
