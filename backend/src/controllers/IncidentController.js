const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //paginação
        //valores default
        const { page = 1 } = request.query;


        //retornando a primeira posição do array que a query retorna
        const [count] = await connection('incidents')
            .count();

        //selecionando a paginação no banco de dados
        const incidents = await connection('incidents')
            //criando relacionamento entre os dados
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset(( page - 1 ) * 5)
            //filtrando os campos
            .select(['incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        response.headers('X-Total-Count', count['count('*')']);
        
        return response.json(incidents);
    },

    async create (request, response){
        const { title, description, value } = request.body;
        
        //eles recebem o id da ong pelo cabeçalho
        const ong_id = request.headers.authorization;
    
        //criando os incidents
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        
        //ele recebe o id pelo cabeçalho
        const ong_id = request.headers.authorization;
        
        //apagando incident
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        //se o id do incident for diferente do id da ong a gente nao deixa ele apagar
        if (incident.ong_id != ong_id){
            return response.status(401)
        }
        
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};