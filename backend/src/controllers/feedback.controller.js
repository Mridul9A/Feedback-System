import Feedback from '../models/feedback.model.js';

export const submitFeedback = async (req, res) => {
  try {
    const { userName, email, feedbackText, category } = req.body;

    const feedback = new Feedback({
      userName,
      email,
      feedbackText,
      category,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error in submitFeedback:', error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const { category, sortBy = 'timestamp', order = 'desc' } = req.query;

    let query = {};
    if (category) {
      query.category = category;
    }

    const feedback = await Feedback.find(query).sort({
      [sortBy]: order === 'desc' ? -1 : 1,
    });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
