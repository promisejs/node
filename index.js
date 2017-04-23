var express = require('express')
var app = express()
var text = "Hello World"
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Code from events.js
function Event(id, title, description, date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
}
//object events
let codingSessionEvent1 = new Event(1, 'Coding session1', 'Javascript is weird1', 2017)
let codingSessionEvent2 = new Event(2, 'Coding session2', 'Javascript is weird2', 2018)
let codingSessionEvent3 = new Event(3, 'Coding session3', 'Javascript is weird3', 2019)

//array event
let blablaEvent = {
    id: 2,
    title: 'Bla bla bla',
    description: 'Bla bla bla description',
    date: 2020
}

let events = [];

events.push(codingSessionEvent1, codingSessionEvent2, codingSessionEvent3, blablaEvent);

//###### SERVER
app.get('/', (req, res) => { res.send(text) })

app.get('/events', (req, res) => { res.send(events) })

app.listen(3000, () => console.log('Listening port 3000'))

app.post('/', (req, res) => { res.send('Post request') })


app.post('/events', (req, res) => {
    console.log(req.body);
    events.push(req.body);
    res.send(events);
})

app.get('/events/:id', (req, res) => {
    events.forEach(function(item) {
        if (item.id == req.params.id) {
            res.send(item)
        }
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





app.get('/test', (req, res, next) => {
    console.log("Test")
        .then(function() {
            console.log("Test 2");
        }).then(function() {
            res.send("Done! 222222222");
        }).catch(function(err) {
            next(err);
        });
});




app.use(function(err, req, res, next) {
    var statusCode;
    if (err.status != null) {
        statusCode = err.status;
    } else {
        statusCode = 500;
    }
    res.status(statusCode).send(err.message);
});