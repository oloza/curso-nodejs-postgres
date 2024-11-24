require('dotenv').config();

const config ={
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'nico',
    dbPassword: process.env.DB_PASSWORD || 'admin123',
    dbName: process.env.DB_NAME || 'my_store',
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || 5432,
    // dbPoolSize: process.env.DB_POOL_SIZE || 10,
    // dbMax: process.env.DB_MAX || 10,
    // jwtSecret: process.env.JWT_SECRET || 'secret',
    // jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
}

module.exports = {config };
