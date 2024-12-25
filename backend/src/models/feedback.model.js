import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['suggestion', 'bug report', 'feature request'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;