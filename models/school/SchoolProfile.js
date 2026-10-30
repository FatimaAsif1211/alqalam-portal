const mongoose = require('mongoose');

const schoolProfileSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  campus: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 2000 },
  mission: { type: String, maxlength: 1000, default: '' },
  vision: { type: String, maxlength: 1000, default: '' },
  leadershipMessage: { type: String, maxlength: 2000, default: '' },
  address: { type: String, required: true, maxlength: 300 },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true },
  timings: { type: String, maxlength: 200, default: '' },
  logoUrl: { type: String, default: '' }
}, { timestamps: true });

schoolProfileSchema.statics.getSingleton = async function() {
  let profile = await this.findOne();
  if (!profile) {
    profile = await this.create({
      name: 'Al-Qalam Grammar School',
      campus: 'Muhammad Town Arifwala Campus',
      description: 'Default description',
      address: 'Default address',
      phone: '000-0000000',
      email: 'info@alqalam.edu'
    });
  }
  return profile;
};

module.exports = mongoose.model('SchoolProfile', schoolProfileSchema);