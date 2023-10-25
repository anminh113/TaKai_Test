require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Define routes
const transactionRoutes = require('./routes/transaction');
app.use('/transaction', transactionRoutes);
const userRoutes = require('./routes/user');
app.use('/', userRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// The last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});
