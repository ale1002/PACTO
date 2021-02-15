import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario, UsuarioModel } from '../../models/usuario.models';
import { UsuarioService } from '../../services/usuario.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AsociacionesService } from 'src/app/services/asociaciones.service';
import { AsociacionesModel, Asociacion} from '../../models/asociaciones.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnDestroy, OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  usuarios: Usuario[] = [];
  usersForm: FormGroup;
  usuario: UsuarioModel = new UsuarioModel();
  usuarioUpdate: UsuarioModel = new UsuarioModel();
  asociaciones: Asociacion[] = [];
  asociacionesForm: FormGroup;
  asociacion1: AsociacionesModel = new AsociacionesModel();
  asociacionUpdate: AsociacionesModel = new AsociacionesModel();
  idAsoc: string;

  constructor(
    private _userService: UsuarioService,
    private _builder: FormBuilder,
    private _asociacionesService:AsociacionesService
    ){
    this.usersForm = this._builder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tlfc: ['', Validators.required],
      tlfm: ['', Validators.required],
      hectareas: ['',],
      sector: ['',],
      parroquia: ['',],
      barrio: ['',],
      role: ['', Validators.required],
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

    this._userService.getUsers().subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      //console.log(this.usuarios);
      this.dtTrigger.next();
    });

    this._userService.getAso().subscribe((res:any) =>{
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
    this.usuario.nombre = values['nombre'];
    this.usuario.apellido = values['apellido'];
    this.usuario.tlfc = values['tlfc'];
    this.usuario.email = values['email'];
    this.usuario.password = values['password'];
    this.usuario.tlfm = values['tlfm'];
    this.usuario.hectareas = values['hectareas'];
    this.usuario.sector = values['sector'];
    this.usuario.barrio = values['barrio'];
    this.usuario.parroquia = values['parroquia'];
    this.usuario.role = values['role'];
    this.usuario.id_asociacion= [{
      _id: this.usuarios[0]._id, 
      id_asociacion: values['id_soc']
    }
  ];
    this._userService.addUsers(this.usuario).subscribe((resp:any) => {
      this.usuarios = resp.usuarios;
      window.location.reload()
    }, (err) => {
    });
    
  }

  openModalActualizar(id:string) {
    this.usuarioUpdate = this.buscadorUserActual(id);
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
    
    this.idAsoc = this.usuarioUpdate.id_asociacion;
    this.usuarioUpdate.id_asociacion = [{
      _id: this.usuarioUpdate._id, 
      id_asociacion: this.idAsoc
    }];
   
    
    this._userService.updateUser(this.usuarioUpdate).subscribe(resp => {
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

  buscadorUserActual(id:string){
      let userActual: Usuario;
      
      for (let i = 0; i < this.usuarios.length; i++) {
        if(this.usuarios[i]._id == id){
          userActual = this.usuarios[i];
          break;
        }
      }

      return userActual;
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

    this._userService.deleteUser(this.usuarioUpdate).subscribe(resp => {
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
