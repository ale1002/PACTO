import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';

import { CapacitacionModel, Capacitacion } from '../../models/capacitacion.models'
import { CapacitacionService } from '../../services/capacitacion.service'

@Component({
  selector: 'app-asiscapacitacion',
  templateUrl: './asiscapacitacion.component.html'
})
export class AsiscapacitacionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: Usuario[] = [];

  capacitaciones: Capacitacion[]=[];

  

 
 


  constructor(private http: HttpClient,private _userService: UsuarioService,) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
    this._userService.getUsers().subscribe((resp:any) => {
      for (let i=0; i<resp.usuarios.length;i++){
        if(resp.usuarios[i].role!="SOCIO_ROLE"){
          resp.usuarios.splice(i,i); // ´pr
      }
    }
      this.usuarios = resp.usuarios;      
      this.dtTrigger.next();
/*
      for (let i=0; i<this.usuarios.length;i++){
        if(this.usuarios[i].role!="SOCIO_ROLE"){
          this.usuarios.splice(i,1); // probar con muchos datos xD
      }
*/

      console.log(this.usuarios);
    });
         
  }
  /*enviar(values){
    this.asiscapacitacion.nom_soc = values['tem_cap'];
    this.asiscapacitacion.ape_soc = values['fech_ini_cap'];
    this.asiscapacitacion.asis_cap = values['fech_fin_capi'];
    this._AsisCapacitacionService.addCapacitaciones(this.asiscapacitacion).subscribe((resp:any) => {
      this.asiscapacitaciones = resp.capacitacion;
      window.location.reload()
      
    }, (err) => {
    });
  }*/

  /*openModalActualizar(id:string) {
    this.capacitacionUpdate = this.buscadorCapacitacionActual(id);
  }*/

  /*onEdit( form:NgForm ) {
    if (form.invalid) {return;}
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    Swal.showLoading();
    this._asiscapacitacionService.updateAsisCapacitacion(this.asiscapacitacionUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    },(err) => {
      Swal.fire({
        title: 'Error',
        text: err.error.err.message,
        icon: 'error',
      });
    });
  }*/
  
 /* buscadorsocios(id:string){
    let socio: Capacitacion;
    
    for (let i = 0; i < this.capacitaciones.length; i++) {
      if(this.capacitaciones[i].asis_cap[0].role == "SOCIO_ROLE"){
        socio = this.capacitaciones[i];
        break;
      }
    }

    return socio;
    console.log
}*/

    /*delete() {
      Swal.fire({
        title: 'Espere',
        text: 'Borrando Información',
        icon: 'info',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();
      this._asiscapacitacionService.deleteCapacitacion(this.asiscapacitacionUpdate).subscribe(resp => {
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
*/
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}