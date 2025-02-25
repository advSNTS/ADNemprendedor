import fs from "fs";
import inquirer from "inquirer";
import { obtenerClientes } from "./clientes.js";

export const exportarClientesCSV = async () => {
  const clientes = obtenerClientes();

  if (clientes.length === 0) {
    console.log("No hay clientes para exportar.");
    return;
  }

  const { nombreArchivo } = await inquirer.prompt([
    {
      type: "input",
      name: "nombreArchivo",
      message: "Ingrese el nombre del archivo CSV (sin extensión):",
      default: "clientes"
    }
  ]);

  const encabezados = "ID,Nombre,Cédula,Correo,Teléfono\n";
  const filas = clientes
    .map((cliente) => `${cliente.id},${cliente.nombre},${cliente.cedula},${cliente.correo},${cliente.telefono}`)
    .join("\n");

  const contenidoCSV = encabezados + filas;

  const nombreFinal = `${nombreArchivo}.csv`;
  fs.writeFileSync(nombreFinal, contenidoCSV, "utf8");

  console.log(`✅ Clientes guardados en el archivo: ${nombreFinal}`);
};
