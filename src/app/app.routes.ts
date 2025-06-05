import { Routes } from '@angular/router';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { LoginComponent } from './pages/login/login.component';
import { EmpleadoRoleGuard } from './guards/empleado-role.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'empleados',
    loadComponent: () => import('./pages/empleados/empleados.component').then(m => m.EmpleadosComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'empleados/editar/:id',
    loadComponent: () => import('./pages/editar-empleado/editar-empleado.component').then(m => m.EditarEmpleadoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'empleados/crear',
    loadComponent: () => import('./pages/agregar-empleado/agregar-empleado.component').then(m => m.AgregarEmpleadoComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'visualizacion-empleado',
    loadComponent: () => import('./pages/empleado-visualizacion/empleado-visualizacion.component')
      .then(m => m.EmpleadoVisualizacionComponent),
    canActivate: [EmpleadoRoleGuard]
  },
  {
    path: 'conciliacion',
    loadComponent: () =>
      import('./pages/conciliacion/conciliacion.component').then(m => m.ConciliacionComponent),
    canActivate: [EmpleadoRoleGuard] 
  },
  {
    path: 'ver-pedidos',
    loadComponent: () => import('./pages/ver-pedidos/ver-pedidos.component').then(m => m.VerPedidosComponent),
    canActivate: [EmpleadoRoleGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
