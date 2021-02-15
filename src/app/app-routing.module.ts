import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProdsocioComponent } from './components/prodsocio/prodsocio.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { CapacitacionComponent } from './components/capacitacion/capacitacion.component';
import { AsiscapacitacionComponent } from './components/asiscapacitacion/asiscapacitacion.component';
import { EntidadComponent } from './components/entidad/entidad.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DetallepedidoComponent } from './components/detallepedido/detallepedido.component';
import { PedidoadminComponent } from './components/pedidoadmin/pedidoadmin.component';
import { BodegaComponent } from './components/bodega/bodega.component';
import { ReunionComponent } from './components/reunion/reunion.component';
import { AsisreunionComponent } from './components/asisreunion/asisreunion.component';
import { MaquinarianComponent } from './components/maquinarian/maquinarian.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { MaquinariaasoComponent } from './components/maquinariaaso/maquinariaaso.component';
import { MantenimientoasoComponent } from './components/mantenimientoaso/mantenimientoaso.component';
import { HojacampoComponent } from './components/hojacampo/hojacampo.component';
import { AsociacionesComponent } from './components/asociaciones/asociaciones.component';
import { DethojacampoComponent } from './components/dethojacampo/dethojacampo.component';
import { DirectivesComponent } from './components/directives/directives.component';


const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'productos',component: ProductosComponent, canActivate: [AuthGuard] },
    { path: 'prodsocio',component: ProdsocioComponent, canActivate: [AuthGuard] },
    { path: 'capacitacion',component:CapacitacionComponent },
    { path: 'asiscapacitacion/:id',component:AsiscapacitacionComponent,canActivate: [AuthGuard] },
    { path: 'entidad',component:EntidadComponent,canActivate: [AuthGuard] },
    { path: 'pedido',component: PedidoComponent,canActivate: [AuthGuard] },
    { path: 'detallepedido/:id',component: DetallepedidoComponent,canActivate: [AuthGuard] },
    { path: 'pedidoadmin',component: PedidoadminComponent,canActivate: [AuthGuard] },
    { path: 'bodega',component: BodegaComponent,canActivate: [AuthGuard] },
    { path: 'reunion',component: ReunionComponent,canActivate: [AuthGuard] } ,
    { path: 'asisreunion/:id',component: AsisreunionComponent,canActivate: [AuthGuard] },
    { path: 'maquinaria',component: MaquinarianComponent,canActivate: [AuthGuard] },
    { path: 'mantenimiento/:id',component: MantenimientoComponent,canActivate: [AuthGuard] },
    { path: 'maquinariaaso',component: MaquinariaasoComponent,canActivate: [AuthGuard] },
    { path: 'mantenimientoaso/:id',component: MantenimientoasoComponent,canActivate: [AuthGuard] },
    { path: 'hojacampo',component: HojacampoComponent,canActivate: [AuthGuard] },
    { path: 'dethojacampo/:id',component: DethojacampoComponent,canActivate: [AuthGuard] },
    { path: 'asociacion', component: AsociacionesComponent, canActivate: [AuthGuard] },
    { path: 'directiva', component: DirectivesComponent, canActivate: [AuthGuard] },
    
    { path: '', pathMatch:'full', redirectTo:'login' },
    { path: '**', pathMatch:'full', redirectTo:'login'},
];


@NgModule({
    imports: [ RouterModule.forRoot(APP_ROUTES) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
