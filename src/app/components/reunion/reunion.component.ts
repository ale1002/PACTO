import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Reuniones, ReunionesModel } from '../../models/reunion.models';
import { ReunionService } from '../../services/reunion.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';




@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html'
})
export class ReunionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  reuniones: Reuniones[] = [];
  reunionesForm: FormGroup;
  reunion: ReunionesModel = new ReunionesModel();
  reunion1: ReunionesModel = new ReunionesModel();
  //usuarioUpdate: UsuarioModel = new UsuarioModel();
asistencia : Reuniones[]=[];
  idusu: string;
  fileUrl;
  constructor(
    private _reunionService: ReunionService,
    private _builder: FormBuilder, 
    private sanitizer: DomSanitizer

  ) { this.reunionesForm = this._builder.group({
   // id_asoc_reu: ['',],
    tema_reun: ['',],
    tipo_reun: ['',],
    fec_reu: ['',],
    hor_reu: ['',],
    mul_reu: ['',],
    id_soc: ['',],
    asist_socio: ['',],
    
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

    this._reunionService.getReunion().subscribe((resp:any) => {
      this.reuniones = resp.reuniones;
      this.dtTrigger.next();
    });
  
    const data = 'acta';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  


  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

}
enviar(values){
//  this.reunion1.id_asoc_reu=values['id_asoc_reu'],
  this.reunion1.tema_reun=values['tema_reun'],
  this.reunion1.tipo_reun=values['tipo_reun'],
  this.reunion1.fec_reu = values['fec_reu'];
  this.reunion1.hor_reu = values['hor_reu'];
  this.reunion1.mul_reu = values['mul_reu'];
  this._reunionService.addReunion(this.reunion1).subscribe((resp:any) => {
    this.reuniones = resp.reunion1;
    window.location.reload()
    
  }, (err) => {
  });
}
}

