const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', require('./routes/api/UserRoutes'));
app.use('/api/thoughts', require('./routes/api/ThoughtRoutes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));