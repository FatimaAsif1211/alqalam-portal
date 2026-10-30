const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  sectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    default: null
  },
  academicYearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true
  },
  dayOfWeek: {
    type: String,
    required: true,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  },
  periods: [{
    periodNumber: { type: Number, required: true },
    subjectId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Subject',
      required: true 
    },
    teacherId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      default: null 
    },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    room: { type: String, default: '' }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { timestamps: true });

timetableSchema.index({ classId: 1, sectionId: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model('Timetable', timetableSchema);