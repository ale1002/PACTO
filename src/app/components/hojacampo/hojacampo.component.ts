import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Hojacampo, HojacampoModel } from '../../models/hojacampo.models';
import { HojacampoService } from '../../services/hojacampo.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hojacampo',
  templateUrl: './hojacampo.component.html',
  styles: [
  ]
})
export class HojacampoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  campoForm: FormGroup;

  constructor(
    private _auth: LoginService, 
    private _router: Router, 
    private _http: HttpClient, 
    private _hojacampoService: HojacampoService, 
    private _builder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
      }
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
