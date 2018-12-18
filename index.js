const express = require('express')
const mysql = require('mysql')
const chalk = require('chalk')
const helper = require('jeroentvb-helper')

require('dotenv').config()

// create mysql connection
var dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}
var db
function handleDisconnect () {
  console.log(chalk.green('[MySql] trying to connect..'))
  db = mysql.createConnection(dbConfig)
  // connect to db
  db.connect(err => {
    if (err) {
      console.error('[MySql] error while connecting to the db:', err)
      setTimeout(handleDisconnect, 10000)
    } else {
      console.log(chalk.green('[MySql] connection established..'))
    }
  })
  // Handle db errors
  db.on('error', err => {
    console.error('[MySql] db error:', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect()
    } else {
      throw err
    }
  })
}
handleDisconnect()

function query (query, params) {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

const config = {
  port: 3000
}

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(express.static('static'))
  .get('/', index)
  .get('/article/:id', getArticle)
  .use(notFound)
  .listen(config.port, () => console.log(chalk.green(`[Server] listening on port ${config.port}...`)))

function index (req, res) {
  res.render('index')
}

function getArticle (req, res) {
  let id = req.params.id
  console.log(id)
  query('SELECT * FROM havenstad WHERE id = ?', id)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err)
      res.send(err)
    })
}

function notFound (req, res) {
  res.status(404).render('error', {
    page: 'Error 404',
    error: 'De opgevraagde pagina bestaat niet.'
  })
}
