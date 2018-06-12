import { Component, OnInit, Input } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  @Input() dato: any[];
  mostrarIF:string;

  constructor() { }

  ngOnInit() {
  }
  Enviar(dato:any){
    console.log("Estoy en enviar: ",dato);
    console.log(dato);
    // this.encontro = true;
    // this.datoEncontrado = dato;
    // console.log(this.datoEncontrado);
   this.mostrarIF = dato;
   console.log("this.mostrarIF: ",this.mostrarIF)
  }

}
