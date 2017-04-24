const express = require('express')
const app = express()
const port = 3000
const events = require('./data')

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
    console.log(req.body);
    events.push(req.body);
    res.send(events);
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

app.delete('/events/:id', (req, res) => {
    let deletedItem;
    events.forEach(function(item) {
        if (item.id == req.params.id) {
            deletedItem = item;
            var index = events.indexOf(item)
            events.splice(index, 1);
        }
    })
    res.send("Deleted: " + deletedItem.title)
})


app.get('/events/:id', function(req, res) {
    getEvent(req.params.id)
        .then(event => {
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })
})


const getEvent = (index) => {
    return new Promise(function(resolve, reject) {
        let event = events[index - 1];
        if (event) { // if event exists  !== undefined
            resolve(event); // fulfilled successfully
        } else {
            reject("Event not found"); // error, rejected
        }
    })
};