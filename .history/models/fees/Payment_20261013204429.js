const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  voucherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeeVoucher',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['cash', 'bank', 'online', 'cheque'],
    required: true
  },
  receiptNumber: {
    type: String,
    required: true,
    unique: true
  },
  transactionId: {
    type: String,
    default: ''
  },
  paidAt: {
    type: Date,
    default: Date.now
  },
  remarks: {
    type: String,
    default: ''
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);