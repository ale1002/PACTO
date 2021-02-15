import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductosModel, Producto } from '../../models/productos.models';
import { categoriaProducto, categoriaProductoModel } from '../../models/categoria.models';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnDestroy, OnInit {

  @Input() producto: any = null;

  private url: string = 'https://restserver-pacto.herokuapp.com';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  productos: Producto[] = [];
  categorias: categoriaProducto[] = [];
  productosForm: FormGroup;
  categoriaForm: FormGroup;
  producto1: ProductosModel = new ProductosModel();
  categoria: categoriaProductoModel = new categoriaProductoModel();
  productoUpdate: ProductosModel = new ProductosModel();

  constructor(
    private _auth: LoginService,
    private _router: Router,
    private _http: HttpClient,
    private _productosService: ProductosService,
    private activerouter: ActivatedRoute,
    private _builder: FormBuilder) {


  }
  get errorCtrProducto() {
    return this.productosForm.controls;
  }
  get errorCtrCategoria() {
    return this.categoriaForm.controls;
  }

  ngOnInit(): void {
    this.productosForm = this._builder.group({
      id_cat: ['', Validators.required],
      aso_ps: ['', Validators.required],
      nom_pro: ['', Validators.required],
      desc_pro: ['',],
      uni_pro: ['', Validators.required],
      sto_pro: ['',],
      pvp_pro: ['', Validators.required],
    });
    this.categoriaForm = this._builder.group({
      nombre: ['', Validators.required],
      descripcion: ['',],
    });


    let productoid = this.activerouter.snapshot.paramMap.get('id');
    console.log(productoid);
    let categoriaid = this.activerouter.snapshot.paramMap.get('id');
    console.log(categoriaid);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };

    this._productosService.getCategoria().subscribe((res: any) => {
      this.categorias = res.categoria;
      console.log(this.categorias);
    });

    this._productosService.getProductos().subscribe((res: any) => {
      this.productos = res.producto;
      console.log(this.productos);
      this.dtTrigger.next();
    });
  }
  get errorCtr() {
    return this.productosForm.controls;
  }

  enviarCategoria(values) {
    this.categoria.nombre = values['nombre'];
    this.categoria.descripcion = values['descripcion'];
    this._productosService.addCategoria(this.categoria).subscribe((resp: any) => {
      this.categorias = resp.categoria;
      console.log(resp.categorias);
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }

  enviar(values) {
    // debugger;
    // if(values['nom_pro']=this.categoria.nombre){
    //     console.log(this.categoria._id);
    // }
    this.producto1.id_cat = values['id_cat'];
    this.producto1.aso_ps = this.productos[0].aso_ps;
    this.producto1.nom_pro = values['nom_pro'];
    this.producto1.desc_pro = values['desc_pro'];
    this.producto1.uni_pro = values['uni_pro'];
    this.producto1.sto_pro = values['sto_pro'];
    this.producto1.pvp_pro = values['pvp_pro'];
    this._productosService.addProductos(this.producto1).subscribe((resp: any) => {
      this.productos = resp.producto1;
      console.log(resp.productos);
      window.location.reload()

    }, (err) => {
      console.log(err);
    });
  }

  openModalActualizar(id: string) {
    this.productoUpdate = this.buscadorProductoActual(id);
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
    let productoActual: Producto;

    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i]._id == id) {
        productoActual = this.productos[i];
        break;
      }
    }

    return productoActual;
  }

  onClick(producto) {
    
    this.producto = producto;

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

    this._productosService.deleteProductos(this.productoUpdate).subscribe(resp => {
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

  deleteCategoria() {
    Swal.fire({
      title: 'Espere',
      text: 'Borrando Información',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false
    });

    Swal.showLoading();

    this._productosService.deleteProductos(this.productoUpdate).subscribe(resp => {
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



