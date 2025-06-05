import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-empleado.component.html',
  styleUrls: ['./editar-empleado.component.css']
})
export class EditarEmpleadoComponent implements OnInit {
  empleado: any = {};
  id: number = 0;
  apiUrl = 'http://10.43.96.39:5000/api/Empleados';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get(`${this.apiUrl}/${this.id}`).subscribe({
      next: (data) => this.empleado = data,
      error: (err) => console.error('Error al obtener empleado', err)
    });
  }

  guardarCambios() {
    const token = localStorage.getItem('jwt'); // o usa this.auth.getToken() si tienes el servicio

    if (!token) {
      console.error('No hay token disponible');
      return;
    }

    this.http.put(`${this.apiUrl}/${this.id}`, this.empleado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => this.router.navigate(['/empleados']),
      error: (err) => console.error('Error al actualizar empleado', err)
    });
  }

  volver() {
    this.router.navigate(['/empleados']);
  }

}
