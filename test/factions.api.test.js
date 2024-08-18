const chai = require('chai')
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const app = require('../server')
const { FactionDescription } = require('../models')
const { expect } = chai

chai.use(chaiHttp)

describe('FactionDescription API', () => {
  // Mock data
  const mockFactionDescription = {
    id: 1,
    description: 'An example faction description',
    factionId: 1
  }

  // Stubbing model methods
  let findAllStub, findByPkStub, createStub, updateStub, destroyStub

  beforeEach(() => {
    findAllStub = sinon.stub(FactionDescription, 'findAll').resolves([mockFactionDescription])
    findByPkStub = sinon.stub(FactionDescription, 'findByPk').resolves(mockFactionDescription)
    createStub = sinon.stub(FactionDescription, 'create').resolves(mockFactionDescription)
    updateStub = sinon.stub(FactionDescription, 'update').resolves([1])
    destroyStub = sinon.stub(FactionDescription, 'destroy').resolves(1)
  })

  afterEach(() => {
    sinon.restore()
  })

  // Positive test: GET all faction descriptions
  it('should get all faction descriptions', async () => {
    const res = await chai.request(app).get('/api/faction-descriptions')
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal([mockFactionDescription])
  })

  // Negative test: Handle error when getting all faction descriptions
  it('should handle error when getting all faction descriptions', async () => {
    findAllStub.rejects(new Error('Database error'))
    const res = await chai.request(app).get('/api/faction-descriptions')
    expect(res).to.have.status(500)
    expect(res.body).to.have.property('error', 'Unable to fetch faction descriptions')
  })

  // Positive test: GET a faction description by ID
  it('should get a faction description by ID', async () => {
    const res = await chai.request(app).get('/api/faction-descriptions/1')
    expect(res).to.have.status(200)
    expect(res.body).to.deep.equal(mockFactionDescription)
  })

  // Negative test: Handle faction description not found by ID
  it('should handle faction description not found by ID', async () => {
    findByPkStub.resolves(null)
    const res = await chai.request(app).get('/api/faction-descriptions/999')
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Faction description not found')
  })

  // Positive test: POST create a new faction description
  it('should create a new faction description', async () => {
    const res = await chai.request(app).post('/api/faction-descriptions').send({
      description: 'New description',
      factionId: 1
    })
    expect(res).to.have.status(201)
    expect(createStub.calledOnce).to.be.true
    expect(res.body).to.deep.equal(mockFactionDescription)
  })

  // Negative test: Handle error when creating a faction description
  it('should handle error when creating a faction description', async () => {
    createStub.rejects(new Error('Validation error'))
    const res = await chai.request(app).post('/api/faction-descriptions').send({
      description: 'New description',
      factionId: 1
    })
    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error', 'Unable to create faction description')
  })

  // Positive test: PUT update an existing faction description
  it('should update an existing faction description', async () => {
    const res = await chai.request(app).put('/api/faction-descriptions/1').send({
      description: 'Updated description',
      factionId: 1
    })
    expect(res).to.have.status(200)
    expect(updateStub.calledOnce).to.be.true
    expect(res.body).to.deep.equal(mockFactionDescription)
  })

  // Negative test: Handle faction description not found during update
  it('should handle faction description not found during update', async () => {
    updateStub.resolves([0])
    const res = await chai.request(app).put('/api/faction-descriptions/999').send({
      description: 'Updated description',
      factionId: 1
    })
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Faction description not found')
  })

  // Negative test: Handle error when updating a faction description
  it('should handle error when updating a faction description', async () => {
    updateStub.rejects(new Error('Validation error'))
    const res = await chai.request(app).put('/api/faction-descriptions/1').send({
      description: 'Updated description',
      factionId: 1
    })
    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error', 'Unable to update faction description')
  })

  // Positive test: DELETE delete a faction description
  it('should delete a faction description', async () => {
    const res = await chai.request(app).delete('/api/faction-descriptions/1')
    expect(res).to.have.status(204)
    expect(destroyStub.calledOnce).to.be.true
  })

  // Negative test: Handle faction description not found during delete
  it('should handle faction description not found during delete', async () => {
    destroyStub.resolves(0)
    const res = await chai.request(app).delete('/api/faction-descriptions/999')
    expect(res).to.have.status(404)
    expect(res.body).to.have.property('error', 'Faction description not found')
  })

  // Negative test: Handle error when deleting a faction description
  it('should handle error when deleting a faction description', async () => {
    destroyStub.rejects(new Error('Database error'))
    const res = await chai.request(app).delete('/api/faction-descriptions/1')
    expect(res).to.have.status(400)
    expect(res.body).to.have.property('error', 'Unable to delete faction description')
  })
})
