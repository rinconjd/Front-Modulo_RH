import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleado-visualizacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './empleado-visualizacion.component.html',
  styleUrls: ['./empleado-visualizacion.component.css']
})
export class EmpleadoVisualizacionComponent implements OnInit {
  clientes: any[] = [];
  transacciones: any[] = [];

  apiClientes = 'http://10.43.96.39:5000/api/Clientes';
  apiTransacciones = 'http://10.43.96.39:5000/api/Transacciones';

constructor(private auth: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarTransacciones();
  }

  cargarClientes() {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    this.http.get<any[]>(this.apiClientes, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.clientes = data,
      error: err => console.error('Error al cargar clientes', err)
    });
  }

  cargarTransacciones() {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    this.http.get<any[]>(this.apiTransacciones, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: data => this.transacciones = data,
      error: err => console.error('Error al cargar transacciones', err)
    });
  }

  cerrarSesion() {
    this.auth.logout(); 
  }

  irAConciliacion() {
    this.router.navigate(['/conciliacion']);
  }

  ver_pedidos() {
    this.router.navigate(['/ver-pedidos']);
  }
}
