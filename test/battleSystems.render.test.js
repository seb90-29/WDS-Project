const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const request = require('supertest')
const app = require('../server')
const { BattleSystem } = require('../models')
const { expect } = chai

chai.use(chaiHttp)

describe('BattleSystems', () => {
  // Mock data
  const mockBattleSystem = {
    id: 1,
    name: 'Warhammer 40K',
    update: sinon.stub().resolves(),
    destroy: sinon.stub().resolves()
  }

  // Stubbing model methods
  let findAllStub, findByPkStub, createStub

  beforeEach(() => {
    findAllStub = sinon.stub(BattleSystem, 'findAll').resolves([mockBattleSystem])
    findByPkStub = sinon.stub(BattleSystem, 'findByPk').resolves(mockBattleSystem)
    createStub = sinon.stub(BattleSystem, 'create').resolves(mockBattleSystem)
  })

  afterEach(() => {
    sinon.restore()
  })

  // Positive test: Handle Rendering all battle systems
  it('should render all battle systems', async () => {
    const res = await chai.request(app).get('/render/battle-systems')
    expect(res).to.have.status(200)
    expect(res.text).to.include('Warhammer 40K')
  })

  // Negative test: Render all battle systems with a database error
  it('should handle error when fetching all battle systems', async () => {
    findAllStub.rejects(new Error('Database error'))
    const res = await chai.request(app).get('/render/battle-systems')
    expect(res).to.have.status(500)
    expect(res.text).to.include('Unable to fetch battle systems')
  })

  // Positive test: Handle Rendering battle system by ID
  it('should redirect when rendering a battle system by ID', async () => {
    const res = await chai.request(app).get('/render/battle-systems/1')
    expect(res).to.have.status(200)
    expect(res.redirects[0]).to.include('/render/battle-systems')
  })

  // Negative test: Render battle system by ID not found
  it('should handle battle system not found by ID', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).get('/render/battle-systems/999')
    expect(res).to.have.status(404)
    expect(res.text).to.include('Battle system not found')
  })

  // Positive test: Handle creating a new battle system
  it('should create a new battle system and redirect', async () => {
    const res = await chai.request(app).post('/render/battle-systems').send({ name: 'New Battle System' })
    expect(res).to.have.status(200)
    expect(res.redirects[0]).to.include('/render/battle-systems')
    expect(createStub.calledOnce).to.be.true
  })

  // Negative test: Handle creating a duplicate battle system
  it('should handle duplicate battle system creation', async () => {
    createStub.rejects({ name: 'SequelizeUniqueConstraintError' })
    const res = await chai.request(app).post('/render/battle-systems').send({ name: 'Warhammer 40K' })
    expect(res).to.have.status(409)
    expect(res.text).to.include('A battle system with that name already exists.')
  })

  // Positive test: Handle editing a battle system
  it('should update an existing battle system and redirect', async () => {
    const res = await chai.request(app).post('/render/battle-systems/1/edit').send({ name: 'Updated Battle System' })
    expect(res).to.have.status(200)
    expect(res.redirects[0]).to.include('/render/battle-systems')
    expect(mockBattleSystem.update.calledOnce).to.be.true
  })

  // Negative test: Handle editing a non-existent battle system
  it('should handle battle system not found during update', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).post('/render/battle-systems/999/edit').send({ name: 'Updated Battle System' })
    expect(res).to.have.status(404)
    expect(res.text).to.include('Battle system not found')
  })

  // Negative test: Handle unique constraint error during update
  it('should handle unique constraint error during update', async () => {
    mockBattleSystem.update.rejects({ name: 'SequelizeUniqueConstraintError' })
    const res = await chai.request(app).post('/render/battle-systems/1/edit').send({ name: 'Duplicate Name' })
    expect(res).to.have.status(409)
    expect(res.text).to.include('A battle system with that name already exists.')
  })

  // Positive test: Handle deleting a battle system
  it('should delete a battle system and redirect', async () => {
    const res = await chai.request(app).post('/render/battle-systems/1/delete')
    expect(res).to.have.status(200)
    expect(res.redirects[0]).to.include('/render/battle-systems')
    expect(mockBattleSystem.destroy.calledOnce).to.be.true
  })

  // Negative test: Handle deleting a non-existent battle system
  it('should handle battle system not found during delete', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).post('/render/battle-systems/999/delete')
    expect(res).to.have.status(404)
    expect(res.text).to.include('Battle system not found')
  })
})
