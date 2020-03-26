const connection = require('../database/connection')

module.exports = {
    async create (request, response){
        const { id } = request.body;

        //criando a sessão, fazendo um post e achando a referencia no banco de dados procurando o id dela
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if(!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    }
}