import { createConnection } from 'typeorm';

createConnection().then(() => console.log('successfully connection database'));
