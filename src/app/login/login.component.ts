
import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Lógica para lidar com o token de acesso
        console.log('Token de acesso:', response.access_token);
      },
      (error) => {
        // Lógica para lidar com erros de login
        console.error('Erro no login:', error);
      }
    );
  }
}
