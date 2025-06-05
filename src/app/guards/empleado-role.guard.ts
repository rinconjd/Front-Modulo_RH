import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoRoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const rol = this.auth.getUserRole();

    if (rol === 'Inventario' || rol === 'Empleado') {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
