const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

function createONG(){
  return request(app).post('/ongs').send({
    name: "APAD 2",
    email: "contato@contato.com",
    whatsapp: "1000000000",
    city: "Parnaiba",
    uf: "pi"
  });
}

describe('ONG', ()=> {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () =>{
    await connection.destroy();
  });
  it('should be able to create a new ONG', async () => {
    const response = await createONG();
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
  it('should be able to authenticate an ONG', async () => {
    const {body: ong} = await createONG();
    const response = await request(app).post('/sessions')
    .send({
      id: ong.id
    }); 
    expect(response.body).toHaveProperty('name');
  });
});