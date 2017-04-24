const express = require('express')
const app = express()
const port = 3000
const events = require('./data')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => console.log('Listening on port', port))

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.post('/', (req, res) => {
    res.send('Post request')
})

app.post('/events', (req, res) => {
    postEvent(req.body)
        .then(event => {
            events.push(event)
            res.send(events)
        })
        .catch(err => {
            res.send(err)
        })
})

app.post('/events/:id', (req, res) => {
    events.forEach(function(item) {
        if (item.id == req.params.id) {
            var index = events.indexOf(item)
            events[index] = req.body
        }
    })
    res.send(events)
})


app.get('/events/:id', (req, res) => {
    getEvent(req.params.id)
        .then(event => {
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })
})


app.delete('/events/:id', (req, res) => {
    deleteEvent(req.params.id)
        .then(deletedItem => {
            res.send("Deleted: " + deletedItem.title)
        })
        .catch(err => {
            res.send(err)
        })
})

const deleteEvent = (eventId) => {
    let index = null;
    return new Promise((resolve, reject) => {
        if (eventId >= 0) {
            events.forEach(function(item) {
                if (item.id == eventId) {
                    index = events.indexOf(item)
                    events.splice(index, 1)
                    resolve(item)
                }
            })
        } else {
            reject("The event id is incorrect")
        }
        if (index === null) {
            reject("Event doesn't exist");
        }
    })
}



const postEvent = (body) => {
    return new Promise((resolve, reject) => {
        if (body) {
            resolve(body)
        } else {
            reject("Event needs to have body :()")
        }
    })
}

const getEvent = (index) => {
    return new Promise((resolve, reject) => {
        let event = events[index];
        if (event) { // if event exists  !== undefined
            resolve(event); // fulfilled successfully
        } else {
            reject("Event not found"); // error, rejected
        }
    })
};