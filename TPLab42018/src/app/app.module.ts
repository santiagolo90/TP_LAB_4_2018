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

//primeng
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { RegistroComponent } from './componentes/registro/registro.component';

//NG-select
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PrincipalComponent,
    RegistroComponent,
    HeaderComponent
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
    MenubarModule,
    
  ],
  providers: [GlobalService,AuthService,VerificarJwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
