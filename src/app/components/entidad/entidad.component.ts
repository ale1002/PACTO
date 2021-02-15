import { Component, OnInit, OnDestroy } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { EntidadService } from '../../services/entidad.service';
import { Entidad, EntidadModel } from '../../models/entidad.models';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html'
})
export class EntidadComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  entidades: Entidad[] = [];
  entidadesForm: FormGroup;
  entidad: EntidadModel = new EntidadModel();
  entidadUpdate: EntidadModel = new EntidadModel();

  constructor(
    private _entidadService: EntidadService,
    private _builder: FormBuilder,
    private _auth: LoginService,
    private _router: Router,
    private activerouter:ActivatedRoute,
  )
  {
    this.entidadesForm = this._builder.group ({
    nom_enti: ['',],
    tipo_enti:['',],
    dir_enti: ['',],
    tel_enti: ['',],
    pais_enti: ['',],
    ciu_enti: ['',],
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

    this._entidadService.getEntidades().subscribe((resp:any) => {
      this.entidades = resp.entidad;
      this.dtTrigger.next();
    });
       
  }

  enviar(values){
    this.entidad.nom_enti = values['nom_enti'];
    this.entidad.tipo_enti = values['tipo_enti'];
    this.entidad.dir_enti = values['dir_enti'];
    this.entidad.tel_enti= values['tel_enti'];
    this.entidad.pais_enti = values['pais_enti'];
    this.entidad.ciu_enti = values['ciu_enti']; 
    this._entidadService.addEntidades(this.entidad).subscribe((resp:any) => {
      this.entidades = resp.entidades;
      window.location.reload()
      
    }, (err) => {
    });
  }

  openModalActualizar(id:string) {
    this.entidadUpdate = this.buscadorEntidadActual(id);
  }

  onEdit( form:NgForm ) {
    if (form.invalid) {return;}

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._entidadService.updateEntidad(this.entidadUpdate).subscribe(resp => {
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
  
  buscadorEntidadActual(id:string){
    let entidadActual: Entidad;
    
    for (let i = 0; i < this.entidades.length; i++) {
      if(this.entidades[i]._id == id){
        entidadActual = this.entidades[i];
        break;
      }
    }

    return entidadActual;
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

      this._entidadService.deleteEntidad(this.entidadUpdate).subscribe(resp => {
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
