# PagoPlux

PagoPlux es una plataforma para realizar pagos seguros a través de una aplicación web y un backend basado en Node.js. Este repositorio incluye tanto el frontend (usando Angular) como el backend (con Node.js) para gestionar pagos y autenticación.

## Estructura del Proyecto

Este repositorio tiene dos partes principales:

- **auth-app**: El frontend construido con Angular.
- **auth-payments**: El backend construido con Node.js.

## Requisitos

Para ejecutar este proyecto localmente, necesitas tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) (solo para el frontend)
- [Git](https://git-scm.com/)

## Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/BochaXD/Prueba-PagoPlux.git
cd Prueba-PagoPlux

##2. Instalación para el Frontend (Angular)
Navega a la carpeta auth-app:

bash
Copiar
Editar
cd auth-app
Instala las dependencias:

bash
Copiar
Editar
npm install
Ejecuta la aplicación en modo desarrollo:

bash
Copiar
Editar
ng serve
La aplicación estará disponible en http://localhost:4200.

3. Instalación para el Backend (Node.js)
Navega a la carpeta auth-payments:

bash
Copiar
Editar
cd ../auth-payments
Instala las dependencias:

bash
Copiar
Editar
npm install
Crea un archivo .env en la raíz del proyecto y agrega las variables de entorno necesarias, como la configuración de la base de datos y las credenciales de pago.

Ejecuta el servidor:

bash
Copiar
Editar
npm start
El backend estará disponible en http://localhost:3000.

Uso
El frontend te permitirá interactuar con la plataforma, registrarte, iniciar sesión y realizar pagos.

El backend maneja las operaciones de pago, la autenticación de usuarios y la gestión de la base de datos.
