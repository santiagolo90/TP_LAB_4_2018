import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';//agregue esto

import { LoginComponent } from '../componentes/login/login.component'
import { ErrorComponent } from '../componentes/error/error.component'
import { MapaComponent } from '../componentes/mapa/mapa.component'
import { ViajeComponent } from '../componentes/viaje/viaje.component'
import { PrincipalComponent } from '../componentes/principal/principal.component'
import { RegistroComponent } from '../componentes/registro/registro.component'
import { VerificarJwtService } from '../seguridad/verificar-jwt.service'
import { LogueadoService } from '../seguridad/logueado.service'
import { ActivoJwtService } from '../seguridad/activo-jwt.service'
import { GrillaChoferesComponent } from '../componentes/grilla-choferes/grilla-choferes.component'
import { GrillaClientesComponent } from '../componentes/grilla-clientes/grilla-clientes.component'
import { GrillaVehiculosComponent } from '../componentes/grilla-vehiculos/grilla-vehiculos.component'
import { RegistroVehiculosComponent } from '../componentes/registro-vehiculos/registro-vehiculos.component'
import { GrillaViajesComponent } from '../componentes/grilla-viajes/grilla-viajes.component'
import { PendientesComponent } from '../componentes/pendientes/pendientes.component'
import { GraficosComponent } from '../componentes/graficos/graficos.component'
import { EncuestaComponent } from '../componentes/encuesta/encuesta.component'
import { GrillaEncuestasComponent } from '../componentes/grilla-encuestas/grilla-encuestas.component'

//agregue esto
const MiRuteo = [
  {path: '' , component: LoginComponent},
  {path: 'principal' , component: PrincipalComponent,canActivate: [LogueadoService]},  
  {path: 'Principal' , component: PrincipalComponent,canActivate: [LogueadoService]},
  {path: 'registro' , component: RegistroComponent,canActivate: [LogueadoService,VerificarJwtService]},  
  {path: 'Registro' , component: RegistroComponent,canActivate: [LogueadoService,VerificarJwtService]},
  {path: 'viaje' , component: ViajeComponent,canActivate: [LogueadoService]},
  {path: 'choferes' , component: GrillaChoferesComponent,canActivate: [LogueadoService]},   
  {path: 'clientes' , component: GrillaClientesComponent,canActivate: [LogueadoService]}, 
  {path: 'vehiculos' , component: GrillaVehiculosComponent,canActivate: [LogueadoService]},
  {path: 'rvehiculos' , component: RegistroVehiculosComponent,canActivate: [LogueadoService,VerificarJwtService]},    
  {path: 'misViajes' , component: GrillaViajesComponent,canActivate: [LogueadoService]},    
  {path: 'pendientes' , component: PendientesComponent,canActivate: [LogueadoService]},
  {path: 'graficos' , component: GraficosComponent,canActivate: [LogueadoService]},
  {path: 'encuesta' , component: EncuestaComponent,canActivate: [LogueadoService]},
  {path: 'encuestas' , component: GrillaEncuestasComponent,canActivate: [LogueadoService]},
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
