import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    name: [ localStorage.getItem('name') || '' , [ Validators.required ] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    ) { }

  ngOnInit(): void {
  }

  login() {
    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){ 
          localStorage.setItem('name', this.loginForm.get('name').value );
        } else {
          localStorage.removeItem('name');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // al pasar un error
        Swal.fire('Error Usuario no encontrado o contraseña invalida', err.error.msg, 'error' );
      });
  }

  async startApp() {
    this.auth2 = this.usuarioService.auth2;    
  };

}
