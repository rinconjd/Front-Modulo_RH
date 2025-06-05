# 📅 Fecha
4 de Abril de 2025

# 👨‍💻 Autores

| Nombre                | Foto                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| **Juan David Rincón** | <img src="https://github.com/user-attachments/assets/b54a095e-bd7c-4e3f-b383-b6e8e0977e52" width="150"/> |
| **Julián Rodriguez**  | <img src="https://github.com/user-attachments/assets/afdfeff6-8865-433a-8ed8-89503c0c6e2d" width="150"/> |

# 🧩 Front - Módulo RH (Retail App)

Este módulo representa la interfaz frontend del sistema de Recursos Humanos del ecosistema Retail, desarrollado en Angular. Permite al administrador autenticado realizar operaciones de gestión de empleados. Los demás empleados autentacados pueden visualizar los clientes, transacciones, generar la conciliación de pagos, y ver los pedidos por fecha o identificador.

## 💻 Tecnologías utilizadas

* Angular 17 (standalone components)
* TypeScript
* RxJS y Observables
* Angular Router
* Angular HTTPClient
* Bootstrap + CSS custom
* JWT Auth para protección de rutas
* Visual Studio

---

## 🚀 Requisitos previos

* Node.js 18+
* Angular CLI
* Un backend funcional disponible (como el del proyecto .NET Back-Modulo\_RH)

---

## ⚙️ Configuración del proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/Front-Modulo_RH.git
cd Front-Modulo_RH
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar endpoints

Edita las URLs base dentro de los servicios como `auth.service.ts`, `empleado.service.ts`, `transaccion.service.ts`, etc., apuntando a la IP o dominio de tu backend:

```ts
private apiUrl = 'http://10.43.96.39:5000/api';
```

---

## 🔐 Autenticación con JWT

El sistema incluye inicio de sesión para roles `Admin`, `Empleado` e `Inventario`, donde cada uno tiene accesos distintos.

* El token se almacena en `localStorage`
* Se envía en el header `Authorization` como `Bearer <token>`

---

## 🛠️ Ejecutar el proyecto en desarrollo

```bash
ng serve
```

Abre en el navegador:

```
http://localhost:4200
```

---

## 🧪 Funcionalidades

* [x] Login y protección de rutas según rol
* [x] CRUD de empleados (solo Admin)
* [x] Visualización de clientes y transacciones (roles `Empleado` e `Inventario`)
* [x] Generación y lectura de archivo de conciliación (formato .txt)
* [x] Filtro de pedidos por fecha o identificador
* [x] Manejo de errores y mensajes por indisponibilidad del backend

---

## 📦 Estructura de carpetas

```
/src
  /app
    /pages
      /login
      /empleados
      /visualizacion-empleado
      /conciliacion
      /ver-pedidos
    /services
    /guards
```

---

## 📄 Roles y permisos

| Rol        | Acciones habilitadas                                         |
| ---------- | ------------------------------------------------------------ |
| Admin      | Crear, editar y eliminar empleados                           |
| Ordenes    | Ver pedidos, transacciones, conciliaciones y clientes        |
| Empleado   | Ver pedidos, transacciones, conciliaciones y clientes        |

---

## 🎯 Mensajes de error personalizados

* Si no hay registros: `No hay datos disponibles.`
* Si el backend está caído: `Servicio no disponible`
* Al buscar por ID no existente: `No se encontró ningún pedido con ese ID`

---

## 🧠 Buenas prácticas aplicadas

* Componentes standalone para modularidad
* Guards por rol (`AuthGuard`, `EmpleadoRoleGuard`)
* Interceptor de JWT para token global
* Manejo de errores con mensajes claros al usuario
* CSS limpio, responsive y con gradientes personalizados

---

## 🌐 Enlace al backend relacionado

> Puedes emparejar este frontend con el backend [Back-Modulo\_RH](https://github.com/rinconjd/Back-Modulo_RH) hecho en .NET 9.0.2

---

## ✨ Contribuciones

Pull requests y sugerencias son bienvenidas. Puedes abrir issues para cualquier funcionalidad deseada o reporte de bug.
