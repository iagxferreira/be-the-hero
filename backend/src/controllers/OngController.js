const crypto = require('crypto');
const connection = require('../database/connection')


module.exports = {
    async index (request, response) {

        //listagem é só passar um sleect simples
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        //gerando um hash para identificar cada ong
        const id = crypto.randomBytes(4).toString('HEX');
    
        //insert no banco de dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
    }
}