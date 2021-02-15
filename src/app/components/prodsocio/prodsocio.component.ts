import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosComponent } from '../productos/productos.component';
import { ProductosModel, Producto } from '../../models/productos.models';
import { ProdsocioService } from 'src/app/services/prodsocio.service';
import { ProductoSocioModel, ProductoSocio } from '../../models/prodsocio.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { categoriaProducto } from 'src/app/models/categoria.models';
import { ProductosService } from 'src/app/services/productos.service';
import { Usuario } from 'src/app/models/usuario.models';
import { Asociacion } from 'src/app/models/asociaciones.models';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-prodsocio',
  templateUrl: './prodsocio.component.html',
})
export class ProdsocioComponent implements OnInit, OnDestroy {

  @Input() prodSocio: any = null;


  private url: string = 'https://restserver-pacto.herokuapp.com';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos: Producto[] = [];
  prodSocios: ProductoSocio[] = [];
  productosSocioForm: FormGroup;
  productoSocio1: ProductoSocioModel = new ProductoSocioModel();
  productoSocioUpdate: ProductoSocioModel = new ProductoSocioModel();

  categorias: categoriaProducto[];
  usuarios: Usuario[] = [];
  asociaciones: Asociacion[] = [];
  constructor(
    private _auth: LoginService,
    private _router: Router,
    private _http: HttpClient,
    private _prodsocioService: ProdsocioService,
    private activerouter: ActivatedRoute,
    private _productosService: ProductosService,
    private _userService: UsuarioService,

    private _builder: FormBuilder) {
  }

  /*get errorCtrProducto() {
    return this.productosSocioForm.controls;
  }*/
  ngOnInit(): void {
    this.productosSocioForm = this._builder.group({
      id_pro: ['', Validators.required],
      id_soc: ['', Validators.required],
      aso_ps: ['', Validators.required],
      can_ps: ['',],
      pre_ps: ['',],
      fech_ps: ['',],
      fecha_ela_pro: ['',],
      fecha_cad_pro: ['',],
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._userService.getUsers().subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
    });

    this._userService.getAso().subscribe((res: any) => {
      this.asociaciones = res.asociacion;
    });

    this._prodsocioService.getProdSocio().subscribe((res: any) => {
      this.prodSocios = res.prodSocio;
      console.log('prod', this.prodSocios);
      this.dtTrigger.next();
    });

    this._productosService.getProductos().subscribe((res: any) => {
      this.productos = res.producto;
    });

  }
  get errorCtr() {
    return this.productosSocioForm.controls;
  }

  enviar(values) {
    this.productoSocio1.aso_ps = this.asociaciones[0]._id;
    //Revisar de donde sacar el id del usuario   
    this.productoSocio1.id_soc = this.usuarios[0]._id;

    this.productoSocio1.id_pro = values['id_pro'];
    this.productoSocio1.can_ps = values['can_ps'];
    this.productoSocio1.pre_ps = values['pre_ps'];
    this.productoSocio1.fech_ps = values['fech_ps'];
    this.productoSocio1.fecha_ela_pro = values['fecha_ela_pro'];
    this.productoSocio1.fecha_cad_pro = values['fecha_cad_pro'];
    this._prodsocioService.addProdSocio(this.productoSocio1).subscribe((resp: any) => {
      this.prodSocios = resp.productoSocio1;
      console.log(resp.prodSocios);
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id: string) {
    this.productoSocioUpdate = this.buscadorProductoActual(id);
  }

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
 
    this._productosService.updateProductos(this.productoUpdate).subscribe(resp => {
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

  buscadorProductoActual(id: string) {
    let productoActual: ProductoSocio;

    for (let i = 0; i < this.prodSocios.length; i++) {
      if (this.prodSocios[i]._id == id) {
        productoActual = this.prodSocios[i];
        break;
      }
    }

    return productoActual;
  }

  onClick(prodSocio) {
    this.prodSocio = prodSocio;
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

    this._prodsocioService.deleteProductosSocio(this.productoSocioUpdate).subscribe(resp => {
      Swal.close();
      window.location.reload();
    }, (err) => {
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


