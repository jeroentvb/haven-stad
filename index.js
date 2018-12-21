const express = require('express')
const mysql = require('mysql')
const chalk = require('chalk')
const helper = require('jeroentvb-helper')
const bodyParser = require('body-parser')

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
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .get('/', index)
  .get('/add', addArticleForm)
  .post('/addarticle', addArticle)
  .get('/article/:id', getArticle)
  .use(notFound)
  .listen(config.port, () => console.log(chalk.green(`[Server] listening on port ${config.port}...`)))

function index (req, res) {
  res.render('index')
}

function getArticle (req, res) {
  let id = req.params.id
  query('SELECT * FROM havenstad.articles WHERE id = ?', id)
    .then(data => {
      if (data[0] !== undefined) {
        res.render('article', {
          data: data[0]
        })
      } else {
        res.render('error', {
          page: 'Artikel bestaat niet',
          error: `Het opgevraagde artikel met id ${id}, bestaat niet.`
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
}

function addArticleForm (req, res) {
  res.render('form')
}

function addArticle (req, res) {
  let data = {
    category: req.body.category,
    date: req.body.date,
    title: req.body.title,
    text: req.body.text,
    textorimage: req.body.textorimage,
    source: req.body.source,
    texthavenstad: req.body.texthavenstad
  }
  query('INSERT INTO havenstad.articles SET ?', data)
    .then(response => res.redirect('/add'))
    .catch(err => {
      console.log(err)
      res.render('error', {
        error: err
      })
    })
}

function notFound (req, res) {
  res.status(404).render('error', {
    page: 'Error 404',
    error: 'De opgevraagde pagina bestaat niet.'
  })
}
