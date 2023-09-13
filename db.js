const { Pool } = require('pg');


const pool = new Pool({
    user: "postgres", 
    password: "2552",
    host: "localhost",
    port: 5432,
    database: "plants"

})

module.exports = pool;