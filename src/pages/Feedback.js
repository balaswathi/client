import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';

const Feedback = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 5
  });
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { title, content, rating } = formData;

  useEffect(() => {
    loadFeedbackHistory();
  }, []);

  const loadFeedbackHistory = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/feedback/me');
      setFeedbackHistory(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load feedback history');
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/feedback', formData);
      toast.success('Feedback submitted successfully');
      setFormData({
        title: '',
        content: '',
        rating: 5
      });
      loadFeedbackHistory();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit feedback');
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4>Submit Feedback</h4>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                  maxLength="100"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control"
                  name="content"
                  value={content}
                  onChange={onChange}
                  required
                  rows="5"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Rating (1-5)</label>
                <select
                  className="form-select"
                  name="rating"
                  value={rating}
                  onChange={onChange}
                  required
                >
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-light">
            <h4>Your Feedback History</h4>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading feedback history...</p>
            ) : feedbackHistory.length === 0 ? (
              <p>You haven't submitted any feedback yet.</p>
            ) : (
              feedbackHistory.map((feedback) => (
                <div key={feedback._id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="card-title">{feedback.title}</h5>
                      <span className="badge bg-primary">Rating: {feedback.rating}/5</span>
                    </div>
                    <p className="card-text">{feedback.content}</p>
                    <small className="text-muted">
                      Submitted on {new Date(feedback.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;