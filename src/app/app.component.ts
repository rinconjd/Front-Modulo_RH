import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // si usas rutas aquí
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'FrontEmpleados';
}
