import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitFeedback } from '../api/feedback';

const FeedbackForm = () => {
  const queryClient = useQueryClient();
  const [submissionError, setSubmissionError] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      try {
        const result = await submitFeedback(data);
        return result;
      } catch (error) {
        setSubmissionError(error.message || 'Failed to submit feedback. Please try again.');
        throw error;
      }
    },
    onError: (error) => {
      setSubmissionError(error.message || 'Failed to submit feedback. Please try again.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['feedback']);
      setFormData({
        userName: '',
        email: '',
        feedbackText: '',
        category: 'suggestion'
      });
      setSubmissionError(null);
    }
  });

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    feedbackText: '',
    category: 'suggestion'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);
    
    try {
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="feedback-form">
      <div className="form-header">
        <h2>Submit Feedback</h2>
      </div>
      
      {submissionError && (
        <div className="alert alert-error">
          {submissionError}
        </div>
      )}
      
      {mutation.isSuccess && (
        <div className="alert alert-success">
          Feedback submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-input"
            value={formData.userName}
            onChange={handleChange}
            required
            disabled={mutation.isLoading}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={mutation.isLoading}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-input"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={mutation.isLoading}
          >
            <option value="suggestion">Suggestion</option>
            <option value="bug report">Bug Report</option>
            <option value="feature request">Feature Request</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="feedbackText">Feedback</label>
          <textarea
            id="feedbackText"
            name="feedbackText"
            className="form-textarea"
            value={formData.feedbackText}
            onChange={handleChange}
            required
            disabled={mutation.isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="submit-button"
        >
          {mutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;