import fs from "fs";
import inquirer from "inquirer";

const archivoClientes = "clientes.json";


export const obtenerClientes = () => {
  try {
    if (!fs.existsSync(archivoClientes)) {
      return [];
    }
    const data = fs.readFileSync(archivoClientes, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer los clientes:", error);
    return [];
  }
};


const guardarClientes = (clientes) => {
  try {
    fs.writeFileSync(archivoClientes, JSON.stringify(clientes, null, 2));
  } catch (error) {
    console.error("Error al guardar los clientes:", error);
  }
};


export const agregarCliente = async () => {
  const respuestas = await inquirer.prompt([
    { type: "input", name: "cedula", message: "Cedula del cliente:" },
    { type: "input", name: "nombre", message: "Nombre del cliente:" },
    { type: "input", name: "email", message: "Correo electrónico:" },
    { type: "input", name: "telefono", message: "Teléfono:" },
    { type: "input", name: "empresa", message: "Empresa (opcional):" },
  ]);

  const clientes = obtenerClientes();
  const nuevoCliente = {
    id: clientes.length + 1,
    ...respuestas,
  };

  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  console.log(`✅ Cliente "${respuestas.nombre}" añadido con éxito.`);
};



export const listarClientes = () => {
const clientes = obtenerClientes();
    
    if (clientes.length === 0) {
    console.log("No hay clientes registrados.");
    return;
    }
    
    console.log("\nLista de Clientes:");
    console.table(clientes);
};


export const buscarCliente = async () => {
    const clientes = obtenerClientes();
  
    if (clientes.length === 0) {
      console.log("⚠️ No hay clientes registrados.");
      return;
    }

    const { criterio } = await inquirer.prompt([
      {
        type: "list",
        name: "criterio",
        message: "¿Cómo deseas buscar al cliente?",
        choices: ["Cédula", "ID"]
      }
    ]);
  
    const { valor } = await inquirer.prompt([
      {
        type: "input",
        name: "valor",
        message: `Ingresa el ${criterio.toLowerCase()}:`
      }
    ]);
  
    let clienteEncontrado;
  
    if (criterio === "ID") {
      const idBuscado = parseInt(valor);
      clienteEncontrado = clientes.find(cliente => cliente.id === idBuscado);
    } else if (criterio === "Cédula") {
      clienteEncontrado = clientes.find(cliente => cliente.cedula === valor);
    }
  
    if (clienteEncontrado) {
      console.log("\nCliente encontrado:");
      console.table([clienteEncontrado]);
    } else {
      console.log("Cliente no encontrado.");
    }
  };


  export const editarCliente = async () => {
  const clientes = obtenerClientes();

  if (clientes.length === 0) {
    console.log("⚠️ No hay clientes registrados.");
    return;
  }


  const { criterio } = await inquirer.prompt([
    {
      type: "list",
      name: "criterio",
      message: "¿Cómo deseas buscar al cliente para editar?",
      choices: ["Cédula", "ID"]
    }
  ]);

  const { valor } = await inquirer.prompt([
    {
      type: "input",
      name: "valor",
      message: `Ingresa el ${criterio.toLowerCase()}:`
    }
  ]);

  let clienteIndex;

  if (criterio === "ID") {
    const idBuscado = parseInt(valor);
    clienteIndex = clientes.findIndex(cliente => cliente.id === idBuscado);
  } else if (criterio === "Cédula") {
    clienteIndex = clientes.findIndex(cliente => cliente.cedula === valor);
  }

  if (clienteIndex === -1) {
    console.log("Cliente no encontrado.");
    return;
  }

  const cliente = clientes[clienteIndex];

  console.log("\nDatos actuales del cliente:");
  console.table([cliente]);

  const respuestas = await inquirer.prompt([
    {
      type: "input",
      name: "nombre",
      message: "Nuevo nombre (Deja en blanco para no cambiar):",
      default: cliente.nombre
    },
    {
      type: "input",
      name: "cedula",
      message: "Nueva cédula (Deja en blanco para no cambiar):",
      default: cliente.cedula
    },
    {
      type: "input",
      name: "email",
      message: "Nuevo email (Deja en blanco para no cambiar):",
      default: cliente.email
    },
    {
      type: "input",
      name: "telefono",
      message: "Nuevo teléfono (Deja en blanco para no cambiar):",
      default: cliente.telefono
    },
    {
      type: "input",
      name: "empresa",
      message: "Nueva empresa (Deja en blanco para no cambiar):",
      default: cliente.empresa
    }
  ]);

  clientes[clienteIndex] = { ...cliente, ...respuestas };

  guardarClientes(clientes);

  console.log("\nCliente actualizado correctamente:");
  console.table([clientes[clienteIndex]]);
};


export const eliminarCliente = async () => {
    const clientes = obtenerClientes();
  
    if (clientes.length === 0) {
      console.log("No hay clientes para eliminar.");
      return;
    }
  
    const { idEliminar } = await inquirer.prompt([
      {
        type: "input",
        name: "idEliminar",
        message: "Ingrese el ID del cliente a eliminar:",
        validate: (input) => {
          const id = parseInt(input);
          if (isNaN(id) || id < 1 || id > clientes.length) {
            return "Por favor, ingrese un ID válido.";
          }
          return true;
        }
      }
    ]);
  
    // Filtrar clientes eliminando el seleccionado
    const nuevosClientes = clientes.filter((c) => c.id !== parseInt(idEliminar));
  
    // Reindexar IDs
    const clientesReindexados = nuevosClientes.map((cliente, index) => ({
      ...cliente,
      id: index + 1
    }));
  
    // Guardar los clientes con IDs actualizados
    guardarClientes(clientesReindexados);
  
    console.log(`Cliente con ID ${idEliminar} eliminado correctamente.`);
  };