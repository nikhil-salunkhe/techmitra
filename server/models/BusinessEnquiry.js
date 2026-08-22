import mongoose from 'mongoose';

const businessEnquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, default: '' },
  businessType: {
    type: String,
    required: true,
    enum: ['Bank', 'Shop', 'School', 'Classes', 'Hotel', 'Mall', 'Restaurant', 'Other'],
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Website Development', 'Billing Software', 'Both Website & Billing', 'Custom Application'],
  },
  budget: { type: String, default: '' },
  timeline: { type: String, default: '' },
  description: { type: String, default: '' },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'contacted', 'in-progress', 'completed', 'rejected'],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('BusinessEnquiry', businessEnquirySchema);
