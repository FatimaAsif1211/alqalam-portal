const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login', 'logout', 'create', 'update', 'delete',
      'view', 'export', 'import', 'publish', 'unpublish',
      'password_change', 'failed_login'
    ]
  },
  entity: {
    type: String,
    required: true,
    // Example: 'User', 'Student', 'Announcement'
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  }
}, { timestamps: true });

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ entity: 1, entityId: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);