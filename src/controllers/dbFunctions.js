const { Pool } = require('pg');
const config = require('../config');
const pool = new Pool(config.db);

// Function handling the DB query and returns the response
async function query(query, params) {
  const { rows, fields } = await pool.query(query, params);

  return rows;
}

// Function handling the strategy for the deletion of entries from the DB
async function deleteMessages(lockID) {
  await query(
    'DELETE FROM messages WHERE lock_id = ($1);',
    [lockID]
  );
}

function emptyOrRows(rows) {
  if (!rows) {
    return "No data found";
  }
  return rows;
}

// Function handling the strategy for the retrieval of entries from the DB
// Epoch in ms is used as an identifier, TODO: convert to use the consumer id
async function getMessages() {
  const lockID = new Date().getTime().toString();
  console.log(lockID);
  await query(
    'UPDATE messages SET lock = \'L\', lock_id = ($1) WHERE lock = \'U\';',
    [lockID]
  );

  const rows = await query(
    'SELECT received_message FROM messages WHERE lock_id = ($1);',
    [lockID]
  );
  const data = emptyOrRows(rows);

  if (data.length) {
    deleteMessages(lockID);
  }

  return {
    data
  }
}

// Incoming message checks
function validateCreate(receivedMessage) {
  let input_error = [];

  console.log(receivedMessage);

  if (!receivedMessage) {
    input_error.push('No object is provided');
  }

  if (receivedMessage && JSON.stringify(receivedMessage).length > 1000) {
    input_error.push('Message cannot be longer than 1000 characters');
  }

  if (input_error.length) {
    let error = input_error.join();
    return error
  }
  else {
    return "Success"
  }
}

// Function handling the strategy for the addition of entries from the DB
async function createMessage(receivedMessage) {
  messageStatus = validateCreate(receivedMessage);
  if (messageStatus == "Success") {
    const result = await query(
      'INSERT INTO messages(received_message,lock) VALUES ($1,$2) RETURNING *',
      [receivedMessage,'U']
    );
    
    if (result.length) {
      message = 'Quote created successfully';
    }
  }
  else {
    console.log(messageStatus)
  }

  message = messageStatus;
  return { message };
}

module.exports = {
  getMessages,
  createMessage
}