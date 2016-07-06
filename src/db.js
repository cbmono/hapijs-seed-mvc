import config from 'config';
import knex from 'knex';

export default knex(config.get('database'));
