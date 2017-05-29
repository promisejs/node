const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
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

    var events = db.collection('events');
    var allEvents = events.find({}).toArray(function(err, docs) {
        res.send(docs)
    });
})



app.post('/', (req, res) => {
    res.send('Post request')
})

app.post('/events', (req, res) => {
    postEvent(req.body)
        .then(event => {
            var events = db.collection('events');
            events.insertOne(event, function(err, result) {
                console.error(err);
            });
            res.send(event)
        })
        .catch(err => {
            res.send(err)
        })
})

app.put('/events/:id', (req, res) => {
    putEvent(req.params.id, req.body)
        .then(updatedItem => {
            res.send(updatedItem)
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
  var events = db.collection('events');
  var eventSingle = events.find({id: parseInt(req.params.id)}).toArray(function(err, event) {
    res.send(event)
  });
})


app.delete('/events/:id', (req, res) => {
    deleteEvent(req.params.id)
        .then(deletedItem => {
            let message = { value: "" }
            message.value = "deleted"
            res.send(message)
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
          var events = db.collection('events');
          var eventSingle = events.find({id: parseInt(5)}).toArray(function(err, event) {
            resolve(event)
          });
        } else {
            reject("The event id is incorrect")
        }
        if (index === null) {
            reject("Event doesn't exist")
        }
    })
}


//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/db';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open', function() {
    console.log("Success MongoDB")
});
