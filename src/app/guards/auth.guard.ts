import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.auth.isLoggedIn();
    const userRole = this.auth.getUserRole();

    console.log('isLogged:', isLogged);
    console.log('userRole:', userRole);

    if (isLogged && (userRole === 'Admin' || userRole === 'Inventario' || userRole === 'Ordenes')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
