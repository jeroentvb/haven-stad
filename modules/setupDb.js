const mysql = require('mysql')
require('dotenv').config()

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

db.connect(err => {
  if (err) throw err
  console.log('[MySql] connection established..')
})

function createDb () {
  return new Promise((resolve, reject) => {
    db.query('CREATE DATABASE IF NOT EXISTS havenstad', (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log('[MySql] Database created')
        resolve()
      }
    })
  })
}

function createTable (query, tableName) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(`[MySql] ${tableName} table created`)
        resolve()
      }
    })
  })
}

const query = {
  articles: `CREATE TABLE IF NOT EXISTS havenstad.articles(
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255),
    date VARCHAR(255),
    title VARCHAR(255),
    text VARCHAR(255),
    textorimage VARCHAR(255),
    source VARCHAR(255),
    texthavenstad VARCHAR(255),
    PRIMARY KEY(id)
  )`
}

Promise.all([
  createDb(),
  createTable(query.articles, 'articles')
])
  .then(() => {
    console.log('[Mysql] databse set up succesfully')
    db.end()
  })
  .catch(err => {
    console.error(err)
    db.query('DROP DATABASE havenstad', (error, result) => {
      if (error) {
        console.log('Database could not be reset')
        throw error
      } else {
        console.log('Database was reset because of the following error:')
        throw err
      }
    })
  })
