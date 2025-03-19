const fs = require('fs/promises');

// File path for the users.json file
const usersFilePath = './users.json';

async function getUsers() {
  try {
    // Read the contents of the users.json file
    const usersData = await fs.readFile(usersFilePath, 'utf-8');

    // Check if the file is empty
    if (!usersData.trim()) {
      console.log('No users found.');
      return;
    }

    // Parse the JSON data to get the list of users
    const users = JSON.parse(usersData);

    // Log the list of users to the console
    console.log('List of Users:', users);
  } catch (error) {
    console.error('Error reading users.json:', error.message);
  }
}

// Call the function to get and log the list of users
getUsers();
