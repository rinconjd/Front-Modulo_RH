import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: any[] = [];
  apiUrl = 'http://10.43.96.39:5000/api/Empleados';
  error: string = '';
  backendDisponible: boolean = true;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    console.log('Componente Empleados cargado');
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    console.log('Solicitando empleados...');
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: data => {
        console.log('Empleados recibidos:', data);
        this.empleados = data;
        this.error = '';
        this.backendDisponible = true;
      },
      error: err => {
        console.error('Error cargando empleados', err);
        this.error = 'Servicio no disponible';
        this.backendDisponible = false;
      }
    });
  }

  eliminarEmpleado(id: number) {
    if (!this.backendDisponible) return;
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.empleados = this.empleados.filter(e => e.id !== id);
      });
    }
  }

  modificarEmpleado(id: number) {
    if (!this.backendDisponible) return;
    this.router.navigate(['/empleados/editar', id]);
  }

  agregarEmpleado() {
    if (!this.backendDisponible) {
      alert('No se puede agregar empleados en este momento. Servicio no disponible.');
      return;
    }
    this.router.navigate(['/empleados/crear']);
  }

  cerrarSesion() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']); 
  }
}
