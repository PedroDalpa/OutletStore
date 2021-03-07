module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'outlet',
  entities: [`./${process.env.DB_FOLDER}/app/models/*{.js,.ts}`],
  migrations: [`./${process.env.DB_FOLDER}/database/migrations/*{.js,.ts}`],
  cli: {
    migrationsDir: `./${process.env.DB_FOLDER}/database/migrations`,
  },
};
