const { Router } = require('express');
const Habit = require('../models/Habit');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      habit, 
      description,
      user,
      timestamp
    } = req.body;

    Habit
      .create({ habit, description, user, timestamp })
      .then(habit => res.send(habit))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Habit
      .find()
      .then(habits => res.send(habits))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Habit 
      .findById(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Habit
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(habit => res.send(habit))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Habit
      .findByIdAndDelete(req.params.id)
      .then(habit => res.send(habit))
      .catch(next);
  });
