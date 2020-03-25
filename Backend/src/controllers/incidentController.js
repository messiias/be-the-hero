const connection = require('../database/connection'); //Exportando o banco de dados

module.exports = {
    async index(request, response){ // Lista todos os incidentes
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
         //O ong_id não estará na lista dos requisitados, pois ele será enviado pelo header
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;


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
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};