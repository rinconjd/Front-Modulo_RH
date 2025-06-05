import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-conciliacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './conciliacion.component.html',
  styleUrls: ['./conciliacion.component.css']
})
export class ConciliacionComponent implements OnInit {
  contenido: string = '';
  error: string = '';
  totalHoy: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerArchivoConciliacion();
  }

  obtenerArchivoConciliacion(): void {
    const url = 'http://10.43.96.39:5000/api/conciliacion/archivo';
    this.http.get<{ contenido: string }>(url).subscribe({
      next: (response) => {
        this.contenido = response.contenido?.trim();

        if (!this.contenido) {
          this.error = 'No hay transacciones registradas.';
          this.totalHoy = 0;
          return;
        }

        this.error = '';
        this.contarTransaccionesDeHoy();
      },
      error: (err) => {
        // Verificamos si es un 404 con el mensaje específico
        const mensaje = (err?.error || '').toString().toLowerCase();
        if (err.status === 404 && mensaje.includes('no hay transacciones')) {
          this.error = 'No hay transacciones registradas.';
        } else {
          this.error = 'Servicio no disponible';
        }

        this.contenido = '';
        this.totalHoy = 0;
        console.error('Error al obtener el archivo de conciliación:', err);
      }
    });
  }

  contarTransaccionesDeHoy(): void {
    if (!this.contenido) return;

    const hoy = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD

    const lineas = this.contenido.split('\n');
    let contador = 0;

    for (const linea of lineas) {
      const partes = linea.split(',');
      if (partes.length < 2) continue;

      const fechaTransaccion = partes[1].trim();
      if (fechaTransaccion.startsWith(hoy)) {
        contador++;
      }
    }

    this.totalHoy = contador;
  }

  volver(): void {
    this.router.navigate(['/visualizacion-empleado']);
  }

  actualizarArchivo(): void {
    const url = 'http://10.43.96.39:5000/api/conciliacion/procesar';
    this.http.post(url, null).subscribe({
      next: () => this.obtenerArchivoConciliacion(),
      error: (err) => {
        console.error('Error al actualizar el archivo:', err);
      }
    });
  }

  todayDate(): string {
    const ahoraUTC = new Date(Date.now());
    const iso = ahoraUTC.toISOString().slice(0, 10); // YYYY-MM-DD
    const partes = iso.split('-');

    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const fechaFormateada = `${partes[2]} de ${meses[+partes[1] - 1]} de ${partes[0]}`;

    const diaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][new Date(iso).getUTCDay()];

    return `${diaSemana}, ${fechaFormateada}`;
  }
}
