import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    public auth2: any;
    public usuario: Usuario;

    constructor(private http: HttpClient,
        private router: Router,
        private ngZone: NgZone) {
    }

    get role(): string {
        return localStorage.getItem('role');
    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.auth2.signOut().then(() => {
            this.ngZone.run(() => {
                this.router.navigateByUrl('/login');
            })
        });
    }

    validarToken(): Observable<boolean> {
        const token = localStorage.getItem('token') || '';
        return this.http.get(`${base_url}/login/renew`, {
            headers: {
                'token': token
            }
        }).pipe(
            tap((resp: any) => {
                localStorage.setItem('token', resp.token);
            }),
            map(resp => true),
            catchError(error => of(false))
        );
    }

    crearUsuario(formData: RegisterForm) {
        return this.http.post(`${base_url}/user`, formData)
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token)
                })
            )
    }

    login(formData: LoginForm) {
        return this.http.post(`${base_url}/login`, formData)
            .pipe(
                tap((resp: any) => {
                    localStorage.setItem('token', resp.token)
                    localStorage.setItem('role', resp.role)
                })
            );
    }

}
