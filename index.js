const express = require('express')
const mysql = require('mysql')
const chalk = require('chalk')

require('dotenv').config()

const config = {
  port: 3000
}

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'templates')
  .use(express.static('static'))
  .get('/', index)
  .use(notFound)
  .listen(config.port, () => console.log(chalk.green(`[Server] listening on port ${config.port}...`)))

function index (req, res) {
  res.render('index')
}

function notFound (req, res) {
  res.status(404).render('error', {
    page: 'Error 404',
    error: 'De opgevraagde pagina bestaat niet.'
  })
}
