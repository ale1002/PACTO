import { Component, OnInit, OnDestroy } from '@angular/core';
import {CapacitacionModel, Capacitacion} from '../../models/capacitacion.models'
import { CapacitacionService } from '../../services/capacitacion.service'
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


import { EntidadService } from '../../services/entidad.service';
import { Entidad } from '../../models/entidad.models';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html'
})

export class CapacitacionComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  capacitaciones: Capacitacion[] = [];
  capacitacionesForm: FormGroup;
  capacitacion: CapacitacionModel = new CapacitacionModel();
  capacitacionUpdate: CapacitacionModel = new CapacitacionModel();

  entidades: Entidad[]=[];
  

  constructor(
    private _capacitacionService: CapacitacionService,
    private _entidadService: EntidadService,
    private _builder: FormBuilder
    ){
    this.capacitacionesForm = this._builder.group({
    id_enti: ['',],
    tem_cap: ['',],
    fech_ini_cap: ['',],
    fech_fin_cap: ['',],
    hora_ini_cap: ['',],
    hora_fin_cap: ['',],
      });
}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
    this._capacitacionService.getCapacitaciones().subscribe((resp:any) => {
      this.capacitaciones = resp.capacitacion;
      console.log(resp.capacitacion);
      //this.dtTrigger.next();
    });  

    this._entidadService.getEntidades().subscribe((resp:any) => {
      this.entidades = resp.entidad;
     
    });     
  }

  enviar(values){
    let split = values['id_enti'].split("-", 2);
    this.capacitacion.tem_cap = values['tem_cap'];
    this.capacitacion.fech_ini_cap = values['fech_ini_cap'];
    this.capacitacion.fech_fin_cap = values['fech_fin_cap'];
    this.capacitacion.hora_ini_cap = values['hora_ini_cap'];
    this.capacitacion.hora_fin_cap = values['hora_fin_cap'];
    this.capacitacion.prof_cap=[{
      _id: split[0],
      id_enti: split[1]    
    }];
    //this.capacitacion.prof_cap[0].id_enti = values['id_enti'];
    this._capacitacionService.addCapacitaciones(this.capacitacion).subscribe((resp:any) => {
      this.capacitaciones = resp.capacitacion;
      window.location.reload()
      
    }, (err) => {
    });
    console.log(this.capacitacion);
    console.log(split +  values['id_enti']);
  }


  openModalActualizar(id:string) {
    this.capacitacionUpdate = this.buscadorCapacitacionActual(id);
  }
 
  buscadorCapacitacionActual(id:string){
    let capacitacionActual: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i]._id == id){
        capacitacionActual = this.capacitaciones[i];
        break;
      }
    }
    return capacitacionActual;
}

delete() {
  Swal.fire({
    title: 'Espere',
    text: 'Borrando Información',
    icon: 'info',
    allowOutsideClick: false,
    showConfirmButton: false
  });

  Swal.showLoading();

  this._capacitacionService.deleteCapacitacion(this.capacitacionUpdate).subscribe(resp => {
    Swal.close();
    window.location.reload();
  },(err) => {
    Swal.fire({
      title: 'Error',
      text: err.error.err.message,
      icon: 'error',
    });
  });
}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}