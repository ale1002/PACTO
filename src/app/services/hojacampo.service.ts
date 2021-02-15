import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hojacampo } from '../models/hojacampo.models';


@Injectable({
    providedIn: 'root'
})
export class HojacampoService {

    private url: string = 'https://restserver-pacto.herokuapp.com';

    hojaToken: string;

    constructor(private _http: HttpClient) { }

    leerToken() {
        if (localStorage.getItem('token')) {
            this.hojaToken = localStorage.getItem('token')
        }
        return this.hojaToken;
    }

    getHojacampo() {
    }
}