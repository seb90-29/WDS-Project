const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const request = require('supertest')
const app = require('../server')
const { BattleSystem } = require('../models')
const { expect } = chai

chai.use(chaiHttp)

describe('BattleSystem API', () => {
  // Mock data
  const mockBattleSystem = {
    id: 1,
    name: 'Warhammer 40K'
  }

  // Stubbing model methods
  let findAllStub, findByPkStub, createStub, updateStub, destroyStub

  beforeEach(() => {
    findAllStub = sinon.stub(BattleSystem, 'findAll').resolves([mockBattleSystem])
    findByPkStub = sinon.stub(BattleSystem, 'findByPk').resolves(mockBattleSystem)
    createStub = sinon.stub(BattleSystem, 'create').resolves(mockBattleSystem)
    updateStub = sinon.stub(BattleSystem, 'update').resolves([1])
    destroyStub = sinon.stub(BattleSystem, 'destroy').resolves(1)
  })

  afterEach(() => {
    sinon.restore()
  })

  // Positive test: Handle GET all battle systems
  it('should get all battle systems', async () => {
    const res = await chai.request(app).get('/api/battle-systems')
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal([mockBattleSystem])
  })

  // Negative test: Handle GET all battle systems
  it('should handle error when getting all battle systems', async () => {
    findAllStub.rejects(new Error('Database error'))
    const res = await chai.request(app).get('/api/battle-systems')
    expect(res).to.have.status(500)
    expect(res.body).to.have.property('error', 'Unable to fetch battle systems')
  })

  // Positive test: Handle GET battle system by ID
  it('should get a battle system by ID', async () => {
    const res = await chai.request(app).get('/api/battle-systems/1')
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(mockBattleSystem)
  })

  // Negative test: Handle GET battle system by ID
  it('should handle battle system not found by ID', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).get('/api/battle-systems/999')
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Battle system not found')
  })

  // Positive test: Handle POST create a battle system
  it('should create a new battle system', async () => {
    const res = await chai.request(app).post('/api/battle-systems').send({ name: 'New Battle System' })
    expect(res).to.have.status(201)
    expect(res.body).to.deep.equal(mockBattleSystem)
    expect(createStub.calledOnce).to.be.true
  })

  // Negative test: Handle POST creating a duplicate battle system
  it('should handle duplicate battle system creation', async () => {
    createStub.rejects({ name: 'SequelizeUniqueConstraintError' })
    const res = await chai.request(app).post('/api/battle-systems').send({ name: 'Warhammer 40K' })
    expect(res).to.have.status(409)
    expect(res.body).to.have.property('error', 'A battle system with that name already exists.')
  })

  // Negative test: Handle POST create battle system with server error
  it('should handle error when creating a battle system', async () => {
    createStub.rejects(new Error('Database error'))
    const res = await chai.request(app).post('/api/battle-systems').send({ name: 'New Battle System' })
    expect(res).to.have.status(500)
    expect(res.body).to.have.property('error', 'Unable to create battle system')
  })

  // Positive test: Handle PUT update a battle system
  it('should update an existing battle system', async () => {
    const res = await chai.request(app).put('/api/battle-systems/1').send({ name: 'Updated Battle System' })
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(mockBattleSystem)
    expect(updateStub.calledOnce).to.be.true
  })

  // Negative test: Handle PUT updating a non-existent battle system
  it('should handle battle system not found during update', async () => {
    updateStub.resolves([0]) // 0 rows updated
    const res = await chai.request(app).put('/api/battle-systems/999').send({ name: 'Updated Battle System' })
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Battle system not found')
  })

  // Negative test: Handle PUT updating a battle system with server error
  it('should handle error when updating a battle system', async () => {
    updateStub.rejects(new Error('Database error'))
    const res = await chai.request(app).put('/api/battle-systems/1').send({ name: 'Updated Battle System' })
    expect(res).to.have.status(500)
    expect(res.body).to.have.property('error', 'Unable to update battle system')
  })

  // Positive test: Handle DELETE a battle system
  it('should delete a battle system', async () => {
    const res = await chai.request(app).delete('/api/battle-systems/1')
    expect(res).to.have.status(204)
    expect(destroyStub.calledOnce).to.be.true
  })

  // Negative test: Handle DELETE a non-existent battle system
  it('should handle battle system not found during delete', async () => {
    destroyStub.resolves(0) // 0 rows deleted
    const res = await chai.request(app).delete('/api/battle-systems/999')
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Battle system not found')
  })

  // Negative test: Handle DELETE with server error
  it('should handle error when deleting a battle system', async () => {
    destroyStub.rejects(new Error('Database error'))
    const res = await chai.request(app).delete('/api/battle-systems/1')
    expect(res).to.have.status(500)
    expect(res.body).to.have.property('error', 'Unable to delete battle system')
  })
})