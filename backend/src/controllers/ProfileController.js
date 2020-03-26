const connection = require('../database/connection')

module.exports = {
    async index (request, response){

        //para listar os perfis a gente também passa o ongid pelo header
        const ong_id = request.headers.authorization;

        //listando os incidents com o ong_id
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
            
        return response.json(incidents);     
    }
}