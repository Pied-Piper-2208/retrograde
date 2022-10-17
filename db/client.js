const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/retrograde-db',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

const clientConnect = async () => {
    try {
        await client.connect();
        console.log('Database is open for business!');
      } catch (error) {
        console.error('Database is closed for repairs!\n', error);
        };
    }
    
clientConnect();

module.exports = client;