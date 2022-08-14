const environment = process.env.NODE_ENV || 'development';

let path = `${__dirname}/.env`;
if (environment === 'development') {
  path = `${__dirname}/.env.${environment}`;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path });

module.exports = {
  type: 'mariadb',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  dropSchema: process.env.DB_DROP_SCHEMA === 'true',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: process.env.DB_RUN_MIGRATIONS === 'true',
  cache: true,
};
