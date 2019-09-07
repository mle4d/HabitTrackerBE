require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Habit = require('../lib/models/Habit');

jest.mock('../lib/middleware/ensure-auth.js');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('makes a habit', () => {
    return request(app)
    .post('/api/v1/habit')
    .send({
      habit: 'drink water',
      description: 'wet the mouth & swallow'
    })
    .then(res => {
      expect(res.body).toEqual({
        _id: expect.any(String),
        habit: 'drink water',
      description: 'wet the mouth & swallow',
      user: 'Water Drinker',
      createdAt: expect.any(String),
      __v: 0
      });
    });
  });

  it('gets a habit', async() => {
    const habit = Habit.create({
      habit: 'drink water',
      description: 'wet the mouth & swallow',
      user: 'Water Drinker',
      timestamp: '1111'
    });
    return request(app)
    .get('/api/v1/habit')
    .then(res => {
      const habitJSON = JSON.parse(JSON.stringify(habit));
      expect(res.body).toEqual([habitJSON]);
    });
  });
  it('puts a habit', async() => {
    const habit = await Habit.create({
      habit: 'sleep',
      description: 'lay still and close eyes',
      user: 'Depression Nap',
      timestamp: '247'
    });
    return request(app)
      .put(`/api/v1/habit/${habit._id}`)
      .send({
        habit: 'sleep',
      description: 'lay still and close eyes',
      user: 'Depression Nap',
      timestamp: '247'
      })
      .then(res => {
        expect(res.body).toEqual({
          __id: expect.any(String),
          habit: 'sleep',
      description: 'lay still and close eyes',
      user: 'Depression Nap',
      timestamp: '247',
      __v: 0
        });
      });
  });
  it('deletes a habit', async() => {
    const habit = await Habit.create({
      habit: 'drink water',
      description: 'wet the mouth & swallow',
      user: 'Water Drinker',
      timestamp: '1111'
    });
    return request(app)
    .delete(`/api/v1/habit/${habit._id}`)
    .then(res => {
      expect(res.body).toEqual({
        _id: expect.any(String),
        habit: 'drink water',
      description: 'wet the mouth & swallow',
      user: 'Water Drinker',
      timestamp: '1111',
      __v: 0
      });
    });
  });
});