const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id) //Compara o ID recebido com o ID do Banco de Dados
            .select('name')
            .first(); // Não retorna um array apena um resultado

        if (!ong){
            return response.status(400).json({ error: 'No ONG found with this ID' });
        }

        return response.json(ong);

    }
}