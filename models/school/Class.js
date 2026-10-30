const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, maxlength: 1000, default: '' },
  eligibility: { type: String, maxlength: 500, default: '' },
  academicYearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    default: null
  },
  classTeacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  capacity: { type: Number, default: 40 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);