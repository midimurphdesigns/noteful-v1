'use strict';

// TEMP: Simple In-Memory Database
const data = require('./db/notes');
const express = require('express');
const app = express();

app.use(express.static('public'));

// Listen for incoming connections
app.listen(8080, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  if (searchTerm) {
    const filterBySearchTerm = data.filter(item => item.title.includes(searchTerm) || item.content.includes(searchTerm));
    res.json(filterBySearchTerm);
  } else {
    res.json(data);
  }
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  res.json(data.find(item => item.id === Number(id)));
});
