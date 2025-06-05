import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.css']
})
export class VerPedidosComponent {
  fechaInicio: string = '';
  fechaFin: string = '';
  idBusqueda: string = '';
  pedidos: any[] = [];
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  buscarPedidos() {
    if (!this.fechaInicio || !this.fechaFin) {
      this.error = 'Debe seleccionar ambas fechas';
      return;
    }

    const desde = `${this.fechaInicio}T00:00:00`;
    const hasta = `${this.fechaFin}T23:59:59`;
    const url = `http://10.43.103.202:5125/api/Pedido/rango?desde=${desde}&hasta=${hasta}`;

    console.log('Fecha de inicio:', desde);
    console.log('Fecha de fin:', hasta);
    console.log('URL solicitada:', url);

    this.http.get<any[]>(url).subscribe({
      next: data => {
        if (data.length === 0) {
          this.pedidos = [];
          this.error = 'No hay pedidos registrados en el rango seleccionado.';
        } else {
          this.pedidos = data;
          this.error = '';
        }
      },
      error: err => {
        console.error('Error al obtener pedidos:', err);
        this.pedidos = [];

        if (err.status === 0 || err.status >= 500) {
          this.error = 'Servicio de entrega no disponible.';
        } else {
          this.error = 'Ocurrió un error al consultar los pedidos.';
        }
      }
    });
  }

  buscarPorId() {
    if (!this.idBusqueda) {
      this.error = 'Debe ingresar un ID de pedido';
      return;
    }

    const url = `http://10.43.103.202:5125/api/Pedido/codigo/${this.idBusqueda}`;
    console.log('Buscando por ID:', url);

    this.http.get<any>(url).subscribe({
      next: data => {
        this.pedidos = [data];
        this.error = '';
      },
      error: err => {
        console.error('Error al buscar pedido por ID:', err);
        this.pedidos = [];

        if (err.status === 0 || err.status >= 500) {
          this.error = 'Servicio de entrega no disponible.';
        } else {
          this.error = 'No se encontró ningún pedido con ese ID';
        }
      }
    });
  }

  volver() {
    this.router.navigate(['/visualizacion-empleado']);
  }
}
