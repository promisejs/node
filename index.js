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
  console.log("Test").then(function() {
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
