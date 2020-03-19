
exports.up = async function(knex) {
  const resultsTable = knex.schema.createTable('results', (t) => {
    t.string('question').notNullable().primary()
    t.integer('first').notNullable()
    t.integer('second').notNullable()
    t.integer('third').notNullable()
    t.integer('fourth').notNullable()
  })

  const participantTable = knex.schema.createTable('participants', (t) => {
    t.integer('count').notNullable().primary()
  })

  await resultsTable
  await participantTable
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('results')
  await knex.schema.dropTableIfExists('participants')
};
