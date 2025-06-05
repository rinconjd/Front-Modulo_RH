import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent {
  empleado: any = {
    nombre: '',
    cedula: '',
    rol: 'Inventario',
    username: '',
    password: '',
    fechaIngreso: new Date().toISOString()
  };


  apiUrl = 'http://10.43.96.39:5000/api/Empleados';

  constructor(private http: HttpClient, private router: Router) {}

  agregarEmpleado() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    this.http.post(this.apiUrl, {
      nombre: this.empleado.nombre,
      cedula: this.empleado.cedula,
      area: this.empleado.area,
      rol: this.empleado.rol,
      username: this.empleado.username,
      password: this.empleado.password
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => console.error('Error al agregar empleado', err)
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }
}
