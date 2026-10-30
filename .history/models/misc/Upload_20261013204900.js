const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
    // Example: 'image/jpeg', 'application/pdf'
  },
  fileSize: {
    type: Number,
    required: true
    // Bytes
  },
  category: {
    type: String,
    enum: ['profile', 'gallery', 'material', 'assignment', 'document', 'other'],
    default: 'other'
  },
  relatedEntity: {
    type: String,
    default: ''
    // Example: 'Student', 'Course'
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  cloudProvider: {
    type: String,
    enum: ['cloudinary', 'aws-s3', 'local', 'other'],
    default: 'cloudinary'
  },
  publicId: {
    type: String,
    default: ''
    // Cloudinary public ID
  }
}, { timestamps: true });

module.exports = mongoose.model('Upload', uploadSchema);