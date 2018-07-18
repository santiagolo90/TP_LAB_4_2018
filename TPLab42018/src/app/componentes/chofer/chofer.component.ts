import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChoferesService } from '../../servicios/choferes.service'
import { VehiculosService } from '../../servicios/vehiculos.service'

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.css']
})
export class ChoferComponent implements OnInit {

  
  public registroForm: FormGroup;
  patenteVieja:any;
  public arrayVehiculos: Array<any> = [];
  public arrayVehiculosDesocupados: Array<any> = [];
  constructor(public choferServ: ChoferesService,
              public vehiculosService :VehiculosService,
              private formBuilder : FormBuilder,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.registroForm = this.formBuilder.group({
                  nombre :  new FormControl('', [Validators.required]),
                  email : new FormControl('', [Validators.required]),
                  patente : new FormControl('', [Validators.required])
                });
              }

  ngOnInit() {
    this.traerPatentes();
    console.log("dataaaa: ",this.data);
    let user = {id: this.data.id }
    
    if(this.data) {
      this.choferServ.traerUno(user).then(res => {
        console.log("traigo chofer: ",res);
        this.patenteVieja = res.patente;
      
        this.registroForm = this.formBuilder.group({
          id :  new FormControl(res.id, [Validators.required] ),
          nombre :  new FormControl(res.nombre, [Validators.required] ),
          email : new FormControl(res.email, [Validators.required]),
          patente : new FormControl(res.patente, [Validators.required]),
        });
      }).catch(err => {
        console.log(err);
      });

    }
  }

  traerPatentes(){
    this.vehiculosService.traerTodosVehiculosDisponibles().then(res => {
      this.arrayVehiculos = res;
      this.arrayVehiculos.forEach(element => {
        if (element.estado == "libre") {
          this.arrayVehiculosDesocupados.push(element);

        }
      });
      console.log(this.arrayVehiculosDesocupados);
      console.log("arrayVehiculos ", this.arrayVehiculos);
    }).catch(err => {
      console.log(err);
    });
  }

  Modificar(){
    console.log("patente vieja: ",this.patenteVieja);
    let patVieja ={
      patente: this.patenteVieja,
      estado: "libre"
    }
    this.vehiculosService.cambiarEstado(patVieja).then(res => {
      console.log("vuelvo de cambiar estado patente: ",res);
    }).catch(err => {
      console.log(err);
    });

    let auxChofer ={
      id: this.registroForm.value['id'],
      patente: this.registroForm.value['patente']
    }
    this.choferServ.asignarPatente(auxChofer).then(res => {
      console.log("vuelvo de cambiar asignar patente: ",res);
    }).catch(err => {
      console.log(err);
    });
    this.dialogRef.close(true);
    
  }

}
