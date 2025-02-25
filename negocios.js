import inquirer from "inquirer";
import fs from "fs";
import { obtenerClientes } from "./clientes.js";

const FILE_PATH = "negocios.json";

export const leerNegocios = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

const guardarNegocios = (negocios) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(negocios, null, 2));
};

export const registrarNegocio = async () => {
  const clientes = obtenerClientes();

  if (clientes.length === 0) {
    console.log("No hay clientes registrados.");
    return;
  }

  const { metodoBusqueda } = await inquirer.prompt([
    {
      type: "list",
      name: "metodoBusqueda",
      message: "¿Cómo deseas buscar al cliente?",
      choices: ["Por ID", "Por Cédula"]
    }
  ]);

  let clienteEncontrado;
  if (metodoBusqueda === "Por ID") {
    const { id } = await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Ingresa el ID del cliente:"
      }
    ]);
    clienteEncontrado = clientes.find(c => c.id === parseInt(id));
  } else {
    const { cedula } = await inquirer.prompt([
      {
        type: "input",
        name: "cedula",
        message: "Ingresa la cédula del cliente:"
      }
    ]);
    clienteEncontrado = clientes.find(c => c.cedula === cedula);
  }

  if (!clienteEncontrado) {
    console.log("⚠️ Cliente no encontrado.");
    return;
  }

  const { estado, descripcion } = await inquirer.prompt([
    {
      type: "list",
      name: "estado",
      message: "Selecciona el estado del negocio:",
      choices: ["Resuelto", "En proceso", "Cerrado"]
    },
    {
      type: "input",
      name: "descripcion",
      message: "Describe el negocio:"
    }
  ]);

  const negocios = leerNegocios();
  negocios.push({
    id: negocios.length + 1,
    clienteId: clienteEncontrado.id,
    clienteNombre: clienteEncontrado.nombre,
    estado,
    descripcion
  });

  guardarNegocios(negocios);
  console.log("✅ Negocio registrado con éxito.");
};


export const editarEstadoNegocio = async () => {
    const negocios = leerNegocios();
  
    if (negocios.length === 0) {
      console.log("No hay negocios registrados.");
      return;
    }
  
    console.table(negocios.map(n => ({ ID: n.id, Cliente: n.clienteNombre, Estado: n.estado })));
  
    const { negocioId } = await inquirer.prompt([
      {
        type: "input",
        name: "negocioId",
        message: "Ingresa el ID del negocio que deseas actualizar:"
      }
    ]);
  
    const negocio = negocios.find(n => n.id === parseInt(negocioId));
  
    if (!negocio) {
      console.log("Negocio no encontrado.");
      return;
    }
  
    const { nuevoEstado } = await inquirer.prompt([
      {
        type: "list",
        name: "nuevoEstado",
        message: "Selecciona el nuevo estado del negocio:",
        choices: ["Resuelto", "En proceso", "Cerrado"]
      }
    ]);
  
    negocio.estado = nuevoEstado;
    guardarNegocios(negocios);
  
    console.log("✅ Estado del negocio actualizado correctamente.");
  };


export const listarNegocios = () => {
    const negocios = leerNegocios();
    if (negocios.length === 0) {
        console.log("No hay negocios registrados.");
        return;
        }
        
        console.log("\nLista de negocios:");
        console.table(negocios);
}