import { createConnection } from 'typeorm';

createConnection().then(() => console.info('successfully connection database'));
