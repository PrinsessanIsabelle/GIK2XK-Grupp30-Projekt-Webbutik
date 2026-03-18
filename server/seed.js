#!/usr/bin/env node
// Denna fil - seed.js är nödvändig för att exekvera sql-filer
// eftersom sql-filer i sig själva bara är textfiler som inte kan exekveras automatiskt.
// Vid problem med CLI-path är detta ett alternativ. (run seed.js i terminalen).

const fs = require('fs');
const path = require('path');
const db = require('./models');

async function runSeedFiles() {
  try {
    console.log('Connecting to database...');
    await db.sequelize.authenticate();
    console.log('Database connected');

    const productsSqlPath = path.join(__dirname, 'products.sql');
    const passwordSqlPath = path.join(__dirname, 'add_password_hash.sql');

    // Kör products.sql i localhost-databasen
    console.log('\n Loading product data...');
    const productsSql = fs.readFileSync(productsSqlPath, 'utf8');
    const productStatements = productsSql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of productStatements) {
      await db.sequelize.query(statement);
    }
    console.log('Product data loaded');

    // Kör add_password_hash.sql
    console.log('\n Adding password_hash column...');
    const passwordSql = fs.readFileSync(passwordSqlPath, 'utf8');
    const passwordStatements = passwordSql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of passwordStatements) {
      await db.sequelize.query(statement);
    }
    console.log(' Password hash migration applied');

    console.log('\n Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('\n Error:', error.message);
    process.exit(1);
  }
}

runSeedFiles();
