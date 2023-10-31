const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const app = express();

dotenv.config();

// add middleware
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());

// mongo db Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB database connected');
  })
  .catch((error) => {
    console.log(error);
  });
const PORT = 8000;

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
