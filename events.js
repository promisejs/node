function Event(id, title, description, date) {
  this.id = id;
  this.title = title;
  this.description = description;
  this.date = date;
}

//object events
let codingSessionEvent1 = new Event(1, 'Coding session1', 'Javascript is weird1', 2017)
let codingSessionEvent2= new Event(2, 'Coding session2', 'Javascript is weird2', 2018)
let codingSessionEvent3 = new Event(3, 'Coding session3', 'Javascript is weird3', 2019)

//array event
let blablaEvent = {id: 2,
  title: 'Bla bla bla',
  description: 'Bla bla bla description',
  date: 2020}

// console.log(blablaEvent.title);
// console.log(codingSessionEvent3.date)



module.exports = codingSessionEvent1;
