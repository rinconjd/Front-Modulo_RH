import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Enviando login:', this.username, this.password);

    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('Token recibido:', res.token);
        this.auth.setToken(res.token);

        const rol = this.auth.getUserRole();
        console.log('Rol decodificado:', rol);

        if (rol === 'Admin') {
          this.router.navigate(['/empleados']);
        } else if (rol === 'Inventario' || rol === 'Empleado') {
          this.router.navigate(['/visualizacion-empleado']);
        } else {
          this.error = 'Rol no autorizado';
        }
      },
      error: () => {
        console.error('Error: Credenciales inválidas');
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
