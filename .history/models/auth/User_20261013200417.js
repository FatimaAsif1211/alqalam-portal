const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name zaroori hai'],
    trim: true,
    minlength: [2, 'Name kam az kam 2 characters'],
    maxlength: [80, 'Name zyada se zyada 80 characters']
  },
  email: {
    type: String,
    required: [true, 'Email zaroori hai'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Valid email do']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password zaroori hai']
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'teacher', 'student', 'parent', 'accountant', 'librarian'],
    default: 'student'
  },
  phone: {
    type: String,
    default: '',
    trim: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);