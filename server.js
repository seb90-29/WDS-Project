require('dotenv').config()
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const multer = require('multer');
const testConnection = require('./config/test-connection')
const indexRouter = require('./routes/index')

// Set up multer for file uploads
const upload = multer({ dest: 'public/uploads/' })

// API and Render routes import
const battleSystemsRouter = require('./routes/api/battleSystems')
const factionsRouter = require('./routes/api/factions')
const factionDescriptionsRouter = require('./routes/api/factionDescriptions')
const renderBattleSystemsRouter = require('./routes/render/battleSystems')
const renderFactionsRouter = require('./routes/render/factions')
const renderFactionDescriptionsRouter = require('./routes/render/factionDescriptions')

const db = require('./models')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(upload.array())
app.use('/', indexRouter)

// API and Render routes
app.use('/api/battle-systems', battleSystemsRouter)
app.use('/api/factions', factionsRouter)
app.use('/api/faction-descriptions', factionDescriptionsRouter)
app.use('/render/battle-systems', renderBattleSystemsRouter)
app.use('/render/factions', renderFactionsRouter)
app.use('/render/faction-descriptions', renderFactionDescriptionsRouter)

const startServer = async () => {
  try {
    await testConnection()
    await db.sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start the server:', error)
  }
}

startServer()