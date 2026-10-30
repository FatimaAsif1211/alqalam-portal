const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 300 
  },
  author: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 150 
  },
  isbn: { 
    type: String, 
    unique: true, 
    sparse: true,
    trim: true 
  },
  category: {
    type: String,
    enum: ['fiction', 'non-fiction', 'science', 'math', 'history', 'islamiat', 'urdu', 'english', 'reference', 'other'],
    default: 'other'
  },
  publisher: { 
    type: String, 
    default: '' 
  },
  edition: { 
    type: String, 
    default: '' 
  },
  totalCopies: { 
    type: Number, 
    required: true, 
    default: 1 
  },
  availableCopies: { 
    type: Number, 
    required: true, 
    default: 1 
  },
  shelfNumber: { 
    type: String, 
    default: '' 
  },
  coverImage: { 
    type: String, 
    default: '' 
  },
  description: { 
    type: String, 
    maxlength: 1000, 
    default: '' 
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'lost'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);