// Import express and mongoose
const express = require('express');
const mongoose = require('mongoose');
// Express setup
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Route setup
app.use(require('./routes'));
// Mongoose setup
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('debug', true);
// Start Server
app.listen(PORT, () => console.log("Connected on localhost: " + PORT));
