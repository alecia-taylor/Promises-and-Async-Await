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

const vaultData = vault(id); //Fetch secure details from 'vault'
