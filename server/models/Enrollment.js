import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  city: { type: String, required: true },
  technology: { type: String, required: true },
  projectIdea: { type: String, default: '' },
  previousKnowledge: { type: String, default: '' },
  preferredBatch: { type: String, default: '' },
  message: { type: String, default: '' },
  planId: { type: String, default: 'project', enum: ['ai', 'project'] },
  plan: { type: String, default: 'Project Development' },
  amount: { type: Number, default: 3999 },
  duration: { type: String, default: '2 Months' },
  status: { type: String, default: 'active', enum: ['active', 'completed', 'cancelled'] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Enrollment', enrollmentSchema);