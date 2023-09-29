require('dotenv').config();
import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';
mongoose.set('debug', true);
mongoose
  .connect(process.env.HOST_DB) //da definire
  .then((_) => {
    console.log('Connected to db');
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch((err) => {
    console.error(err);
  });
