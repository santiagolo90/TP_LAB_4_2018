import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
//Module
import { RuteoModule } from './ruteo/ruteo.module';
//Componetes
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './componentes/error/error.component';
import { PrincipalComponent } from './componentes/principal/principal.component';//agregue esto
import { HeaderComponent } from './componentes/header/header.component';

//Servicios
import { AuthService } from './servicios/auth.service'
import { GlobalService } from './servicios/global.service'
import { UsuarioService } from './servicios/usuario.service'
import { ClientesService } from './servicios/clientes.service'
import { ChoferesService } from './servicios/choferes.service'
import { VehiculosService } from './servicios/vehiculos.service'
import { VerificarJwtService } from './seguridad/verificar-jwt.service'
import { LogueadoService } from './seguridad/logueado.service'
import { RegistroComponent } from './componentes/registro/registro.component';
import { SpinnerService } from './servicios/spinner.service'
import { ViajesService } from './servicios/viajes.service'

//primeng
//import {MenubarModule} from 'primeng/menubar';
//import {MenuItem} from 'primeng/api';


//NG-select
import { NgSelectModule } from '@ng-select/ng-select';
//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialogModule, MatSortModule, MatMenu, MatMenuModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';

import { ToastrModule } from 'ngx-toastr';
import { AdminPipe } from './pipe/admin.pipe';
import { ColorDirective } from './directivas/color.directive';
import { BoldPipe } from './pipe/bold.pipe';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//maps
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ViajeComponent } from './componentes/viaje/viaje.component';
import { MiCaptchaComponent } from './componentes/mi-captcha/mi-captcha.component';
import { GrillaChoferesComponent } from './componentes/grilla-choferes/grilla-choferes.component';
import { GrillaClientesComponent } from './componentes/grilla-clientes/grilla-clientes.component';
import { GrillaVehiculosComponent } from './componentes/grilla-vehiculos/grilla-vehiculos.component';
import { RegistroVehiculosComponent } from './componentes/registro-vehiculos/registro-vehiculos.component';

import { MaskInput } from 'mask-ioni-3/mask-input';
import {InputMaskModule} from 'primeng/inputmask';
import { SupendidoActivoDirective } from './directivas/supendido-activo.directive';
import { ChoferComponent } from './componentes/chofer/chofer.component';
import { GrillaViajesComponent } from './componentes/grilla-viajes/grilla-viajes.component';
import { PendientesComponent } from './componentes/pendientes/pendientes.component';
import { MiAlertComponent } from './componentes/mi-alert/mi-alert.component';
import { ViajeDirective } from './directivas/viaje.directive';
import { PrecioPipe } from './pipe/precio.pipe';
import { ClientePipe } from './pipe/cliente.pipe';
import { GraficosComponent } from './componentes/graficos/graficos.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    ChoferComponent,
    PrincipalComponent,
    RegistroComponent,
    HeaderComponent,
    AdminPipe,
    ColorDirective,
    BoldPipe,
    MapaComponent,
    ViajeComponent,
    MiCaptchaComponent,
    GrillaChoferesComponent,
    GrillaClientesComponent,
    GrillaVehiculosComponent,
    RegistroVehiculosComponent,
    MaskInput,
    SupendidoActivoDirective,
    GrillaViajesComponent,
    PendientesComponent,
    MiAlertComponent,
    ViajeDirective,
    PrecioPipe,
    ClientePipe,
    GraficosComponent
  ],
  entryComponents : [
    ChoferComponent,
    MapaComponent,
    MiAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    RuteoModule,
    InputMaskModule,
    AgmDirectionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('Token');
        },
        whitelistedDomains : [
          'localhost:8080'
        ],
        headerName : 'Token',
        authScheme : ''
      }
    }),
    //MenubarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar :true,
      progressAnimation:'decreasing',
      //positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    RecaptchaModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCria6NQZfqUqU9U8XmDfvsq9s3lFLRCI'
    })
    
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: { siteKey: '6LdPDF8UAAAAAOWx4CerXHFoHQb_SDUxzZY1J8zJ' } as RecaptchaSettings,},
    GlobalService,
    AuthService,
    UsuarioService,
    ClientesService,
    ChoferesService,
    VehiculosService,
    ViajesService,
    VerificarJwtService,
    SpinnerService,
    LogueadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
