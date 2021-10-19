import { Client } from 'pg';
import config from 'config';
import Logger from './logging';

let db;
const logger = Logger('db');

export function connect() {
  db = new Client(config.db);
  return db.connect();
}

export function disconnectDB() {
  return db
    .end()
    .then(() => logger.log('client has disconnected'))
    .catch((err) => logger.error('error during disconnection', err.stack));
}

export async function query(queryString: string, parameters?: any) {
  if (!db) await connect();

  return db.query(queryString, parameters);
}
