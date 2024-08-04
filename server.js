require('dotenv').config()
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const testConnection = require('./config/test-connection')
const indexRouter = require('./routes/index')
const battleSystemsRouter = require('./routes/battleSystems')
const factionsRouter = require('./routes/factions')
const factionDescriptionsRouter = require('./routes/factionDescriptions')
const db = require('./models')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use('/', indexRouter)
app.use('/battle-systems', battleSystemsRouter)
app.use('/factions', factionsRouter)
app.use('/faction-descriptions', factionDescriptionsRouter)


const startServer = async () => {
  try {
    await testConnection()
    await db.sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    });
  } catch (error) {
    console.error('Failed to start the server:', error)
  }
}

startServer()
