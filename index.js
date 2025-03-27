// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
}

const dbData = central(id).then((retrievedDbName) => {
    return getFromDb(retrievedDbName); // Get the data from the correct database
  });
const vaultData = vault(id); // Fetch secure details from 'vault'

// Wait for both the database and vault to return data
  return Promise.all([dbData, vaultData])
    .then(([dbObj, vaultObj]) => {
      console.timeEnd("Request time for ID " + id); // Stop timer for this user
      return {
        id: id,
        name: vaultObj.name, // Sensitive user info from vault
        username: dbObj.username, // Public user info from database
        email: vaultObj.email,
        address: vaultObj.address,
        phone: vaultObj.phone,
        website: dbObj.website,
        company: dbObj.company,
      };
    })
    .catch((error) => {
        console.log(error); // If something goes wrong, log it
        console.timeEnd("Overall time for ID " + id); // Stop timer even if there's an error
        return "Error"; // Return aN error message
      });
  