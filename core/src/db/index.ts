import knex from 'knex';
import configuration from './knexfile.ts';

const db = knex(configuration.development);

export default db;
