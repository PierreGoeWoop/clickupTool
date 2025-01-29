// import .env variables
import dotenv from "dotenv";

dotenv.config();

import { timeEntries } from "./inputs/entries.js";

const API_KEY = process.env.CLICKUP_API_KEY; // Clé API ClickUp -> https://app.clickup.com/42632639/settings/apps
const TEAM_ID = process.env.CLICKUP_SPACE_ID; // ID de l'équipe ClickUp // https://app.clickup.com/42632639

// Fonction pour valider le TID
function validateTid(tid) {
  const validTids = Object.values(TaskIds);
  if (!validTids.includes(tid)) {
    throw new Error(
      `TID invalide: ${tid}. Les TIDs valides sont: ${validTids.join(", ")}`
    );
  }
  return tid;
}

// Fonction pour créer une entrée de temps individuelle
async function createTimeEntry(entry, authToken) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", authToken);
  myHeaders.append("Content-Type", "application/json");

  // Validation du TID
  const validatedTid = validateTid(entry.tid || TaskIds.BUILD);

  // Calculer end et stop basés sur start et duration
  const start = entry.start;
  const end = start + entry.duration;

  const timeEntryData = {
    start: start,
    end: end,
    stop: end,
    description: entry.description || "",
    duration: entry.duration,
    tags: entry.tags || [ActivityType.BUILD],
    tid: validatedTid,
    billable: false,
    fromTimesheet: false,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(timeEntryData),
    redirect: "follow",
  };
  console.log(requestOptions);
  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/team/${TEAM_ID}/time_entries`,
      requestOptions
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Erreur lors de la création de l'entrée de temps:`, error);
    throw error;
  }
}

// Fonction principale pour traiter un tableau d'entrées
async function processTimeEntries(entries, authToken = API_KEY) {
  const results = [];

  for (const entry of entries) {
    try {
      const result = await createTimeEntry(entry, authToken);
      results.push(result);
      // Attendre un peu entre chaque requête pour éviter de surcharger l'API
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Échec du traitement de l'entrée:`, entry);
      results.push({ error: error.message, entry });
    }
  }

  return results;
}

// Utilisation de la fonction
processTimeEntries(timeEntries)
  .then((results) => {
    console.log("Résultats:", results);
  })
  .catch((error) => {
    console.error("Erreur générale:", error);
  });
