import inquirer from "inquirer";
import { agregarCliente, buscarCliente } from "./clientes.js";
import { listarClientes } from "./clientes.js";
import { editarCliente } from "./clientes.js";
import { eliminarCliente } from "./clientes.js";
import { enviarNotificacion } from "./recordatorios.js";
import { exportarClientesCSV } from "./exportar.js";
import { editarEstadoNegocio, listarNegocios, registrarNegocio } from "./negocios.js";

const menuPrincipal = async () => {
  while (true) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "Selecciona una opción:",
        choices: [
          "1. Gestionar Clientes",
          "2. Recordatorios",
          "3. Guardar Clientes (CSV)",
          "4. Crear Negocio",
          "5. Editar Estado de Negocio",
          "6. Listar Negocios",
          "7. Salir"
        ]
      }
    ]);

    switch (opcion) {
      case "1. Gestionar Clientes":
        await menuClientes();
        break;
      case "2. Recordatorios":
        await enviarNotificacion();
        break;
      case "3. Guardar Clientes (CSV)":
        await exportarClientesCSV();
        break;
      case "4. Crear Negocio":
        await registrarNegocio();
        break;
      case "5. Editar Estado de Negocio":
        await editarEstadoNegocio();
        break;
      case "6. Listar Negocios":
        await listarNegocios();
        break;
      case "7. Salir":
        console.log("Saliendo...");
        process.exit();
    }
  }
};

const menuClientes = async () => {
  while (true) {
    const { opcion } = await inquirer.prompt([
      {
        type: "list",
        name: "opcion",
        message: "Gestión de Clientes - Selecciona una opción:",
        choices: [
          "1. Agregar Cliente",
          "2. Listar Clientes",
          "3. Buscar Cliente",
          "4. Editar Cliente",
          "5. Eliminar Cliente",
          "6. Volver al Menú Principal"
        ]
      }
    ]);

    switch (opcion) {
      case "1. Agregar Cliente":
        await agregarCliente();
        break;
      case "2. Listar Clientes":
        await listarClientes();
        break;
      case "3. Buscar Cliente":
        await buscarCliente();
        break;
      case "4. Editar Cliente":
        await editarCliente();
        break;
      case "5. Eliminar Cliente":
        await eliminarCliente();
        break;
      case "6. Volver al Menú Principal":
        return;
    }
  }
};

menuPrincipal();