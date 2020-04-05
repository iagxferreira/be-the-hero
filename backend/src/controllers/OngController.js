const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId');


module.exports = {
    async index (request, response) {

        //listagem é só passar um sleect simples
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        //gerando um hash para identificar cada ong
        const id = generateUniqueId(); 
    
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