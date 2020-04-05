const request = require('supertest');
const app = require('../../app');
const connection = require('../../database/connection')
describe('ong', () =>{
    beforeEach( async ()=>{
        await connection.migrate.rollback();  
        await connection.migrate.latest();
    })

    afterAll( async () => {
        await connection.destroy();
    })

    //terminar de implementar os testes para todas as rotas
    it('sould be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@contato.com.br",
                whatsapp: "47000000000",
                city: "Rio do Sul",
                uf: "SC"
        })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})