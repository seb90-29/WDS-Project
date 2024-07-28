const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const expressLayouts = require('express-ejs-layouts')
const testConnection = require('./config/test-connection')
const indexRouter = require('./routes/index')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', indexRouter)

const startServer = async () => {
    try {
      await testConnection(); // Test the database connection
  
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
      })
    } catch (error) {
      console.error('Failed to start the server:', error)
    }
  }
  
  startServer()


