const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const events = require('./data')

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
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })
})

app.put('/events/:id', (req, res) => {
    putEvent(req.params.id, req.body)
        .then(updatedItem => {
            res.send("Updated: " + updatedItem.title)
        })
        .catch(err => {
            res.send(err)
        })
})


const putEvent = (eventId, body) => {
    let index = null
    return new Promise((resolve, reject) => {
        if (eventId >= 0) {
            events.forEach(function(event) {
                if (event.id == eventId) {
                    index = events.indexOf(event)
                    let eventToUpdate = events[index]
                    if (body.title) {
                        eventToUpdate.title = body.title
                    }
                    if (body.description) {
                        eventToUpdate.description = body.description
                    }
                    if (body.date) {
                        eventToUpdate.date = body.date
                    }
                    resolve(event)
                }
            })
        } else {
            reject("The event id is incorrect")
        }
        if (index === null) {
            reject("Event doesn't exist")
        }
    })
}

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
            reject("Event doesn't exist")
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

const getEvent = (eventId) => {
    let index = null;
    return new Promise((resolve, reject) => {
        if (eventId >= 0) {
            events.forEach(function(item) {
                if (item.id == eventId) {
                    index = events.indexOf(item)
                    resolve(item)
                }
            })
        } else {
            reject("The event id is incorrect")
        }
        if (index === null) {
            reject("Event doesn't exist")
        }
    })
}