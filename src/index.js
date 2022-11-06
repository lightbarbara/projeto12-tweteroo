import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body
    const newUser = {
        username,
        avatar
    }
    users.push(newUser)
    res.status(201).send('OK')
})

app.post('/', (req, res) => {
    const {username, tweet} = req.body
    if (!username || !tweet) {
        res.status(400).send('There are some fields missing')
        return
    }
    const newTweet = {
        id: tweets.length + 1,
    }
    res.status(201).send('')
})

app.get('/tweets', (req, res) => {
    
})

app.listen(5000, () => {
    console.log('App running on port 5000')
})