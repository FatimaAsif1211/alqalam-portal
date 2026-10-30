const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['admin', 'teacher', 'student', 'parent', 'accountant', 'librarian']
  },
  description: {
    type: String,
    default: ''
  },
  permissions: {
    type: [String],
    default: []
  },
  isSystemRole: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);