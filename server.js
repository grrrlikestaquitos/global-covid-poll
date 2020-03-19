const express = require('express')
const bodyParser = require('body-parser')
const knexfile = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const knex = require('knex')(knexfile[env])

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('Content-Type', 'application/json')

app.get('/api/participants', async (req, res) => {
  const participantCount = await knex('participants').select('count')

  res.status(200).json(participantCount[0])
})

app.get('/api/addVote', async (req, res) => {
  const { question, position } = req.query
  const decodedQuestion = decodeURI(question)

  const currentVoteCount = await knex('results').where({ question: decodedQuestion }).select(position)
  const updatedVoteCount = currentVoteCount[0][position] += 1
  const completedUpdating = await knex('results').where({ question: decodedQuestion }).update(position, updatedVoteCount)

  if (completedUpdating === 1) {
    res.status(200).json(updatedVoteCount)
  } else {
    res.status(400).json('Failed to update')
  }
})

app.get('/api/addParticipant', async (req, res) => {
  const currentVoteCount = await knex('participants').select('count')
  const updatedVoteCount = currentVoteCount[0].count += 1
  const completedUpdating = await knex('participants').update('count', updatedVoteCount)

  if (completedUpdating === 1) {
    res.status(200).json(updatedVoteCount)
  } else {
    res.status(400).json('Failed to update')
  }
})

app.get('/api/pollResults', async (req, res) => {
  const { question } = req.query
  const decodedQuestion = decodeURI(question)

  const questionResults = await knex('results').where({ question: decodedQuestion }).select('*')

  res.status(200).json(questionResults[0])
})

app.get('/api/addQuestion', async (req, res) => {
  const { question } = req.query
  decodedQuestion = decodeURI(question)

  await knex('results').insert({ question: decodedQuestion, first: 0, second: 0, third: 0, fourth: 0 })

  res.status(200).json('Question has been added')
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`))