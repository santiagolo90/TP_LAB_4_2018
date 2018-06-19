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
import { VerificarJwtService } from './seguridad/verificar-jwt.service'
import { LogueadoService } from './seguridad/logueado.service'
import { RegistroComponent } from './componentes/registro/registro.component';

//primeng
//import {MenubarModule} from 'primeng/menubar';
//import {MenuItem} from 'primeng/api';


//NG-select
import { NgSelectModule } from '@ng-select/ng-select';
//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { AdminPipe } from './pipe/admin.pipe';
import { ColorDirective } from './directivas/color.directive';
import { BoldPipe } from './pipe/bold.pipe';

import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//maps
import { AgmCoreModule } from '@agm/core';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { ViajeComponent } from './componentes/viaje/viaje.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PrincipalComponent,
    RegistroComponent,
    HeaderComponent,
    AdminPipe,
    ColorDirective,
    BoldPipe,
    MapaComponent,
    ViajeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    RuteoModule,
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
    VerificarJwtService,
    LogueadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
