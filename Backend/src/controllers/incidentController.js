const connection = require('../database/connection'); //Exportando o banco de dados

module.exports = {
    async index(request, response){ // Lista todos os incidentes
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count(); //Vai percorrer toda lista e contar e esse valor será armazenado em um array

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//Irá comparar o ID do sistema com o ID que será recebido do front-end
            .limit(5)//Irá limitar em 5 casos por página
            .offset((page -1) * 5)//Faz com que cada página liste no mínimo 5 casos
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
            //Irá retornar todo o incidents os nomes das ongs, emails...

        response.header('X-Total-Count', count['count(*)']);//Retornará a quantidade de casos

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
            .first();//Irá pegar o primeiro caso
        if (incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permited.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};