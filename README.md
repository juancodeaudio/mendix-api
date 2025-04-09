# Mendix API

Una API RESTful construida con [NestJS](https://nestjs.com), utilizando [TypeORM](https://typeorm.io/) y conectada a una base de datos PostgreSQL.  
Esta API ha sido diseñada con un enfoque de producción industrial, considerando las entidades, relaciones y operaciones típicas de un entorno de manufactura.  
Está preparada para entornos productivos, con una arquitectura modular y escalable.

## Tabla de contenidos

- [Mendix API](#mendix-api)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Requisitos](#requisitos)
  - [Instalación](#instalación)
  - [Configuración](#configuración)
  - [Uso](#uso)
  - [Arquitectura del Proyecto](#arquitectura-del-proyecto)
    - [Módulo de Base de Datos (`database`)](#módulo-de-base-de-datos-database)
    - [Módulos de Dominio](#módulos-de-dominio)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Contribuciones](#contribuciones)
  - [Licencia](#licencia)

## Características

- API RESTful construida con NestJS
- Conexión a base de datos PostgreSQL usando TypeORM
- Soporte para variables de entorno (dotenv)
- Arquitectura modular y escalable
- Preparado para producción

## Requisitos

- Node.js (v18 o superior recomendado)
- PostgreSQL (versión 12+)
- npm o yarn

## Instalación

```bash
git clone https://github.com/tu-usuario/mendix-api.git
cd mendix-api
npm install
```

## Configuración

Crea un archivo .env en la raíz del proyecto basado en .env.example:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=mendix
```

## Uso

```bash
# Modo desarrollo
npm run start:dev

# Compilar y ejecutar
npm run build
npm run start

# Producción
npm run start:prod
```

## Arquitectura del Proyecto

Esta API está organizada en módulos funcionales, siguiendo las mejores prácticas de NestJS. A continuación se describe brevemente la estructura:

### Módulo de Base de Datos (`database`)
Este módulo centraliza la configuración y proveedores de conexión a PostgreSQL usando TypeORM.

### Módulos de Dominio

- **Machines**
  - Entidades: `Machine`, `MachineStatus`, `Location`
  - Se encarga de representar las máquinas físicas en el entorno de producción, su estado y ubicación.

- **Products**
  - Entidades: `Product`, `Material`
  - Modela los productos fabricados y los materiales involucrados en su creación.

- **Users**
  - Entidades: `User`, `Shift`, `Role`
  - Gestiona los usuarios del sistema, sus roles y turnos de trabajo.

- **Work Orders**
  - Entidades: `WorkOrder`, `WorkOrderStatus`, `WorkOrderHistory`
  - Administra las órdenes de trabajo, su estado actual y su historial de cambios.

## Scripts Disponibles

```bash
# Ejecutar migraciones
npm run migration:run

# Revertir última migración
npm run migration:revert

# Generar nueva migración
npm run migration:generate -- -n MigrationName

# Ejecutar pruebas unitarias
npm run test
```

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor abre un Issue o Pull Request para proponer mejoras.

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
