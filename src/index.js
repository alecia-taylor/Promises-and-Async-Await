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
  
      // Helper function to retrieve data from the correct database
  function getFromDb(dbName) {
    return dbs[dbName](id).then((data) => ({
      username: data.username,
      website: data.website,
      company: data.company,
    }));
  }

  const usersQuery = [
    getUserData(1),
    getUserData(2),
    getUserData(3),
    getUserData(4),
    getUserData(5),
    getUserData(6),
    getUserData(7),
    getUserData(8),
    getUserData(9),
    getUserData(10),
    getUserData(true), // This will throw an error
    getUserData(11),
  ];

  // Wait for all user requests to finish
const userData = await Promise.all(usersQuery).then((results) => {
    return results; // Return the final results
  });
  
  const app = document.getElementById("app");
  const timer = document.createElement("h2");
  timer.textContent = "Check console for time stamps"; // Notify users on where to look
  app.appendChild(timer);
  
  // Display each user's data on the page
  userData.forEach((person) => {
    const pre = document.createElement("pre");
    pre.textContent = JSON.stringify(person, null, 2); // Print the JSON data
    app.appendChild(pre);
  });
  
  console.timeEnd("Overall Time"); // Stop the overall timer!