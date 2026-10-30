const mongoose = require('mongoose');

const admissionInfoSchema = new mongoose.Schema({
  procedure: { type: String, required: true, maxlength: 3000 },
  classesAvailable: { type: [String], default: [] },
  eligibility: { type: String, required: true, maxlength: 1500 },
  requiredDocuments: { type: [String], default: [] },
  schedule: { type: String, maxlength: 1000, default: '' },
  instructions: { type: String, maxlength: 2000, default: '' }
}, { timestamps: true });

admissionInfoSchema.statics.getSingleton = async function() {
  let info = await this.findOne();
  if (!info) {
    info = await this.create({
      procedure: 'Admission school office mein physically hoti hai',
      classesAvailable: ['Class 1', 'Class 2', 'Class 3'],
      eligibility: 'Age requirements as per class',
      requiredDocuments: ['Birth Certificate', 'CNIC Copy']
    });
  }
  return info;
};

module.exports = mongoose.model('AdmissionInformation', admissionInfoSchema);