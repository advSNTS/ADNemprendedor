import notifier from "node-notifier";
import inquirer from "inquirer";
import moment from "moment";
import fs from "fs";
import { leerNegocios } from "./negocios.js";

const FILE_PATH = "recordatorios.json";


const leerRecordatorios = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH));
};

const guardarRecordatorios = (recordatorios) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(recordatorios, null, 2));
};

export const enviarNotificacion = async () => {
  const negocios = leerNegocios();

  if (negocios.length === 0) {
    console.log("⚠️ No hay negocios registrados.");
    return;
  }

  const { negocioId } = await inquirer.prompt([
    {
      type: "list",
      name: "negocioId",
      message: "Selecciona el negocio para el recordatorio:",
      choices: negocios.map(negocio => ({
        name: `(${negocio.estado}) ${negocio.clienteNombre}: ${negocio.descripcion}`,
        value: negocio.id
      }))
    }
  ]);

  const negocio = negocios.find(n => n.id === negocioId);
  if (!negocio) {
    console.log("Negocio no encontrado.");
    return;
  }

  const { mensaje } = await inquirer.prompt([
    {
      type: "input",
      name: "mensaje",
      message: "Escribe el mensaje de la notificación:"
    }
  ]);

  const { fechaHora } = await inquirer.prompt([
    {
      type: "input",
      name: "fechaHora",
      message: "Ingresa la fecha y hora (YYYY-MM-DD HH:mm):",
      validate: (input) => {
        return moment(input, "YYYY-MM-DD HH:mm", true).isValid() || "Formato inválido. Usa: YYYY-MM-DD HH:mm";
      }
    }
  ]);

  const fechaNotificacion = moment(fechaHora, "YYYY-MM-DD HH:mm");
  const ahora = moment();
  const delay = fechaNotificacion.diff(ahora);

  if (delay <= 0) {
    console.log("⏳ La fecha debe ser en el futuro.");
    return;
  }

  const recordatorios = leerRecordatorios();
  recordatorios.push({
    id: recordatorios.length + 1,
    negocioId: negocio.id,
    clienteNombre: negocio.clienteNombre,
    mensaje,
    fechaHora
  });
  guardarRecordatorios(recordatorios);

  console.log(`✅ Recordatorio programado para ${fechaHora}`);
  
  setTimeout(() => {
    notifier.notify({
      title: "🔔 Recordatorio CRM",
      message: `📌 ${negocio.clienteNombre}: ${mensaje}`,
      sound: true,
      wait: false
    });
    console.log(`Notificación enviada para ${negocio.clienteNombre}`);
  }, delay);
};
