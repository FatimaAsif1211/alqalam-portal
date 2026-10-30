const mongoose = require('mongoose');

const gradingScaleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  grades: [{
    grade: { type: String, required: true },
    minPercentage: { type: Number, required: true },
    maxPercentage: { type: Number, required: true },
    remarks: { type: String, default: '' }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('GradingScale', gradingScaleSchema);