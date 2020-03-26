//o que eu quero que seja feito
exports.up = function(knex) {
    //criando uma tabela
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        //string com a chave e o tamanho da quantidade de caracteres
        table.string('uf', 2).notNullable();
    })
};

//desfazendo o que foi feito caso eu faça alguma cagada
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
