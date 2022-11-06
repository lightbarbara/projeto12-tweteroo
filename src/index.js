import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post('/sign-up', (req, res) => {
    const { username, avatar } = req.body

    if (!username || !avatar) {
        res.status(400).send('There are some fields missing')
        return
    }

    const newUser = {
        username,
        avatar
    }

    users.push(newUser)
    res.status(201).send('OK')
})

app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body

    if (!username || !tweet) {
        res.status(400).send('There are some fields missing')
        return
    }

    const newTweet = {
        username,
        tweet
    }

    tweets.splice(0, 0, newTweet)
    res.status(201).send('OK')
})

app.get('/tweets', (req, res) => {

    const newTweets = []
    for (let t=0; t<tweets.length; t++) {
        newTweets.push({...tweets[t]})
    }

    newTweets.map(t => {
        const user = users.find(u => u.username === t.username)
        user ? t.avatar = user.avatar : t.avatar = ''
    })

    res.send(newTweets.slice(0,10))
})

app.listen(5000, () => {
    console.log('App running on port 5000')
})