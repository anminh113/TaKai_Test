const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  date: { type: String, default: null },
  content: { type: String, default: null },
  amount: { type: String, default: null },
  type: { type: String, default: null },
}, {
  timestamps: true,
});

module.exports = mongoose.model('transaction', transactionSchema);
