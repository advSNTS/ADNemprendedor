# innovationDNA

CRM CLI - Gestor de Clientes para Emprendedores

Descripción

Este es un CRM (Customer Relationship Management) de línea de comandos (CLI) desarrollado en Node.js. Permite a los emprendedores gestionar clientes, registrar negocios y programar recordatorios de manera eficiente.

Instalación y Configuración

1️⃣ Requisitos Previos

Este proyecto requiere [Node.js](https://nodejs.org/) instalado en tu sistema.

Tener npm (incluido con Node.js).

2️⃣ Clonar el Repositorio
```bash
git clone https://github.com/advSNTS/innovationDNA.git
cd innovationDNA
```
3️⃣ Instalar Dependencias
```bash
npm install
```
4️⃣ Ejecutar el CRM CLI
```bash
node main.js
```


🛠️ Funcionalidades Principales

📂 Gestión de Clientes

✅ Agregar un cliente con nombre, cédula, empresa y correo electrónico.

✅ Listar todos los clientes registrados.

✅ Buscar clientes por cédula o ID.

✅ Editar la información de un cliente.

✅ Eliminar clientes y actualizar automáticamente los ID.

📊 Gestión de Negocios

✅ Registrar negocios asociados a clientes existentes.

✅ Definir estado del negocio: Resuelto, En proceso, Cerrado.

✅ Editar solo el estado de un negocio.

🔔 Recordatorios

✅ Programar recordatorios para clientes específicos.

✅ Notificaciones con node-notifier en la fecha y hora elegida.

💾 Exportar Clientes

✅ Guardar la lista de clientes en un archivo CSV con el nombre elegido por el usuario.


## Compatibilidad  
Este programa ha sido probado en **Ubuntu**. Puede funcionar en otros sistemas operativos, pero no se garantiza su correcto desempeño fuera de este entorno.
