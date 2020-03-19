
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

  await knex('results').insert([
    { question: "How did you feel when the outbreak started in Wuhan?", first: 0, second: 0, third: 0, fourth: 0 },
    { question: "Do you think it will get worse around the globe?", first: 0, second: 0, third: 0, fourth: 0 },
    { question: "Have you been tested for COVID-19?", first: 0, second: 0, third: 0, fourth: 0 },
    { question: "Do you know where to get tested?", first: 0, second: 0, third: 0, fourth: 0 },
    { question: "Has the pandemic negatively affected your financial situation?", first: 0, second: 0, third: 0, fourth: 0 },
    { question: "Do you wash your hands regularly?", first: 0, second: 0, third: 0, fourth: 0 },
  ])

  await knex('participants').insert({ count: 0 })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('results')
  await knex.schema.dropTableIfExists('participants')
};
