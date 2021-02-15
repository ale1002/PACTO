import { Component, OnInit, OnDestroy } from '@angular/core';
import { Directiva, DirectivaModel } from '../../models/directiva.models';
import { DirectivaService } from '../../services/directiva.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AsociacionesService } from 'src/app/services/asociaciones.service';
import { AsociacionesModel, Asociacion} from '../../models/asociaciones.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styles: [
  ]
})
export class DirectivesComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  directivas: Directiva[] = [];
  directivesForm: FormGroup;
  directiva: DirectivaModel = new DirectivaModel();
  directivaUpdate: DirectivaModel = new DirectivaModel();
  asociaciones: Asociacion[] = [];
  asociacionesForm: FormGroup;
  asociacion1: AsociacionesModel = new AsociacionesModel();
  asociacionUpdate: AsociacionesModel = new AsociacionesModel();
  idAsoc: string;

  constructor(
    private _directiveService: DirectivaService,
    private _builder: FormBuilder,
    private _asociacionesService:AsociacionesService
    ){
    this.directivesForm = this._builder.group({
     cargo_dir: ['', Validators.compose([Validators.email, Validators.required])],
      nom_dir: ['', Validators.required],
      ape_dir: ['', Validators.required],
      periodo_dir: ['', Validators.required],
      id_soc:['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._directiveService.getDirectives().subscribe((resp:any) => {
      this.directivas = resp.directiva;
      //console.log(this.usuarios);
      this.dtTrigger.next();
    });

    this._directiveService.getAso().subscribe((res:any) =>{
      this.asociaciones= res.asociacion;
      //console.log(this.asociaciones);
      //this.dtTrigger.next();
    });

  }

  enviarAso(values) {
    this.asociacion1.nombre_aso = values['nombre_aso'];
    this._asociacionesService.addAsociaciones(this.asociacion1).subscribe((resp:any) => {
      this.asociaciones = resp.asociacion1;
      console.log(resp.asociaciones);
      window.location.reload()
      
    }, (err) => {
      console.log(err);
    });
  }

  enviar(values){
    this.directiva.cargo_dir = values['cargo_dir'];
    this.directiva.nom_dir = values['nom_dir'];
    this.directiva.ape_dir = values['ape_dir'];
    this.directiva.periodo_dir = values['periodo_dir'];
    this.directiva.id_asoc= values['id_soc'];
  
    this._directiveService.addDirectives(this.directiva).subscribe((resp:any) => {
      this.directivas = resp.directivas;
      window.location.reload()
    }, (err) => {
    });
    
  }

  openModalActualizar(id:string) {
    this.directivaUpdate = this.buscadorDirectiveActual(id);
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
    
    this.idAsoc = this.directivaUpdate.id_asoc;
    this.directivaUpdate.id_asoc =this.directivaUpdate._id;
   
    
    this._directiveService.updateDirective(this.directivaUpdate).subscribe(resp => {
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

  buscadorDirectiveActual(id:string){
      let directiveActual: Directiva;
      
      for (let i = 0; i < this.directivas.length; i++) {
        if(this.directivas[i]._id == id){
          directiveActual = this.directivas[i];
          break;
        }
      }

      return directiveActual;
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

    this._directiveService.deleteDirective(this.directivaUpdate).subscribe(resp => {
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
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
