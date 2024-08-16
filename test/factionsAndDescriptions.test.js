const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const request = require('supertest')
const app = require('../server')
const { Faction, FactionDescription, BattleSystem } = require('../models')
const { expect } = chai

chai.use(chaiHttp)

describe('Factions', () => {
  // Mock data
  const mockFaction = {
    id: 1,
    name: 'Orks',
    battleSystemId: 1,
    description: { description: 'Orks love fighting', imageUrl: '/uploads/orks.jpg' },
    update: sinon.stub().resolves(),
    destroy: sinon.stub().resolves()
  }

  const mockBattleSystem = {
    id: 1,
    name: 'Warhammer 40K'
  }

  // Stubbing model methods
  let findAllStub, findByPkStub, createStub, destroyStub

  beforeEach(() => {
    findAllStub = sinon.stub(Faction, 'findAll').resolves([mockFaction])
    findByPkStub = sinon.stub(Faction, 'findByPk').resolves(mockFaction)
    createStub = sinon.stub(Faction, 'create').resolves(mockFaction)
    destroyStub = sinon.stub(Faction, 'destroy').resolves()
    sinon.stub(BattleSystem, 'findByPk').resolves(mockBattleSystem)
  })

  afterEach(() => {
    sinon.restore()
  })

  // Positive test: Handle rendering factions by battle system
  it('should render factions by battle system', async () => {
    const res = await chai.request(app).get('/render/factions/battle-system/1')
    expect(res).to.have.status(200)
    expect(res.text).to.include('Orks')
  })

  // Negative test: Handle rendering factions by battle system with error
  it('should handle error when fetching factions by battle system', async () => {
    findAllStub.rejects(new Error('Database error'))
    const res = await chai.request(app).get('/render/factions/battle-system/1')
    expect(res).to.have.status(500)
    expect(res.text).to.include('Error fetching factions')
  })

  // Positive test: Handle rendering a faction by ID
  it('should render a faction by ID', async () => {
    const res = await chai.request(app).get('/render/factions/1')
    expect(res).to.have.status(200)
    expect(res.text).to.include('Orks')
    expect(res.text).to.include('Orks love fighting')
  })

  // Negative test: Handle rendering a faction by ID not found
  it('should handle faction not found by ID', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).get('/render/factions/999')
    expect(res).to.have.status(404)
    expect(res.text).to.include('Faction not found')
  })

  // Positive test: Handle creating a faction
  it('should create a new faction', async () => {
    const res = await chai.request(app)
      .post('/render/factions/battle-system/1')
      .send({ name: 'Eldar', description: 'Eldar are ancient aliens' })
    expect(res).to.redirect
    expect(createStub.calledOnce).to.be.true
  })

  // Negative test: Handle error when creating a faction
  it('should handle error when creating a faction', async () => {
    createStub.rejects(new Error('Database error'))
    const res = await chai.request(app)
      .post('/render/factions/battle-system/1')
      .send({ name: 'Eldar', description: 'Eldar are ancient aliens' })
    expect(res).to.have.status(500)
    expect(res.text).to.include('Failed to create new faction')
  })

  // Positive test: Handle editing a faction
  it('should update an existing faction', async () => {
    const res = await chai.request(app)
      .post('/render/factions/1/edit')
      .send({ name: 'Updated Orks', description: 'Updated Orks love fighting' })
    expect(res).to.redirect
    expect(mockFaction.update.calledOnce).to.be.true
  })

  // Negative test: Handle editing a faction not found
  it('should handle faction not found during update', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app)
      .post('/render/factions/999/edit')
      .send({ name: 'Updated Orks', description: 'Updated Orks love fighting' })
    expect(res).to.have.status(404)
    expect(res.text).to.include('Faction not found')
  })

  // Positive test: Handle deleting a faction
  it('should delete a faction', async () => {
    const res = await chai.request(app).post('/render/factions/1/delete')
    expect(res).to.redirect
    expect(mockFaction.destroy.calledOnce).to.be.true
  })

  // Negative test: Handle deleting a faction not found
  it('should handle faction not found during delete', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).post('/render/factions/999/delete')
    expect(res).to.have.status(404)
    expect(res.text).to.include('Faction not found')
  })
})
