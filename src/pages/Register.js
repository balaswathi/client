import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/auth/AuthContext';
import GraphicalPasswordSelector from '../components/auth/GraphicalPasswordSelector';

const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Black', 'White'];
const sportOptions = ['Football', 'Basketball', 'Soccer', 'Tennis', 'Swimming', 'Baseball', 'Golf', 'Cricket'];
const imageOptions = ['image1', 'image2', 'image3', 'image4'];

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    colorPreference: '',
    sportPreference: '',
    graphicalPassword: {
      imageId: '',
      points: []
    }
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const { name, email, password, password2, colorPreference, sportPreference } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitStep1 = (e) => {
    e.preventDefault();
    
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      setStep(2);
    }
  };

  const onSubmitStep2 = (e) => {
    e.preventDefault();
    
    if (!colorPreference || !sportPreference) {
      toast.error('Please select both a color and sport preference');
    } else {
      setStep(3);
    }
  };

  const onSelectImage = (imageId) => {
    setSelectedImage(imageId);
    setFormData({
      ...formData,
      graphicalPassword: {
        ...formData.graphicalPassword,
        imageId
      }
    });
  };

  const onPointsSelected = (points) => {
    setFormData({
      ...formData,
      graphicalPassword: {
        ...formData.graphicalPassword,
        points
      }
    });
  };

  const onSubmitStep3 = async (e) => {
    e.preventDefault();
    
    if (!formData.graphicalPassword.imageId || formData.graphicalPassword.points.length !== 4) {
      toast.error('Please select an image and 4 points for your graphical password');
      return;
    }
    
    try {
      await register(formData);
      toast.success('Registration successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4>Register</h4>
      </div>
      <div className="card-body">
        {step === 1 && (
          <form onSubmit={onSubmitStep1}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                required
                minLength="6"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={password2}
                onChange={onChange}
                required
                minLength="6"
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Next</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onSubmitStep2}>
            <div className="mb-3">
              <label className="form-label">Select Your Favorite Color</label>
              <select
                className="form-select"
                name="colorPreference"
                value={colorPreference}
                onChange={onChange}
                required
              >
                <option value="">Select a color</option>
                {colorOptions.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Select Your Favorite Sport</label>
              <select
                className="form-select"
                name="sportPreference"
                value={sportPreference}
                onChange={onChange}
                required
              >
                <option value="">Select a sport</option>
                {sportOptions.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={onSubmitStep3}>
            <div className="mb-3">
              <h5>Select an Image for Your Graphical Password</h5>
              <div className="row mb-3">
                {imageOptions.map((imageId) => (
                  <div className="col-md-6 mb-2" key={imageId}>
                    <div 
                      className={`card ${selectedImage === imageId ? 'border-primary' : ''}`}
                      onClick={() => onSelectImage(imageId)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={`/images/${imageId}.jpg`} 
                        alt={imageId} 
                        className="card-img-top"
                        style={{ height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedImage && (
              <div className="mb-3">
                <h5>Create Your Graphical Password</h5>
                <GraphicalPasswordSelector 
                  imageId={selectedImage} 
                  onPointsSelected={onPointsSelected}
                  mode="create"
                />
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={formData.graphicalPassword.points.length !== 4}
              >
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;