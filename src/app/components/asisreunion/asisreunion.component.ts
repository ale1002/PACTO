import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-asisreunion',
  templateUrl: './asisreunion.component.html',
  styles: [
  ]
})
export class AsisreunionComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      }
    };
    this.http.get('http://dummy.restapiexample.com/api/v1/employees')
    .subscribe((res:any) => {
          console.log(res);
          this.data = res.data;
          this.dtTrigger.next();
    });          
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

}

}
