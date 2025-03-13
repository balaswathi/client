import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth/AuthContext';
import GraphicalPasswordSelector from '../components/auth/GraphicalPasswordSelector';

const Login = () => {
  const navigate = useNavigate();
  const { verifyColor, verifySport, verifyGraphical } = useAuth();

  // State for form steps
  const [step, setStep] = useState(1);
  
  // State for form fields
  const [email, setEmail] = useState('');
  const [colorPreference, setColorPreference] = useState('');
  const [sportPreference, setSportPreference] = useState('');
  const [password, setPassword] = useState('');
  const [imageId, setImageId] = useState('');
  const [loading, setLoading] = useState(false);

  // Color options
  const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
  
  // Sport options
  const sportOptions = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 'Running'];

  const onSubmitStep1 = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Verifying color with:', { email, colorPreference });
      
      // Verify color preference
      const result = await verifyColor({ email, colorPreference });
      
      console.log('Color verification result:', result);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Color verification failed');
      console.error('Color verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitStep2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Verifying sport with:', { 
        email, 
        sportPreference, 
        password 
      });
      
      // Verify sport preference
      const result = await verifySport({ 
        email, 
        sportPreference, 
        password 
      });
      
      console.log('Sport verification result:', result);
      setImageId(result.imageId);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Sport verification failed');
      console.error('Sport verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const onPointsSelected = async (points) => {
    setLoading(true);
    
    try {
      console.log('Verifying graphical password with:', { email, points });
      
      // Verify graphical password
      await verifyGraphical({ email, points });
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Graphical password verification failed');
      console.error('Graphical verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h2 className="text-center mb-4">Login</h2>
        
        {loading && (
          <div className="text-center mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {step === 1 && (
          <form onSubmit={onSubmitStep1}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Your Color Preference</label>
              <select
                className="form-select"
                value={colorPreference}
                onChange={(e) => setColorPreference(e.target.value)}
                required
              >
                <option value="">Select a color</option>
                {colorOptions.map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              Next
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onSubmitStep2}>
            <div className="mb-3">
              <label className="form-label">Select Your Sport Preference</label>
              <select
                className="form-select"
                value={sportPreference}
                onChange={(e) => setSportPreference(e.target.value)}
                required
              >
                <option value="">Select a sport</option>
                {sportOptions.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div>
            <h5>Enter Your Graphical Password</h5>
            <p className="text-muted">Select the 4 points you chose during registration</p>
            
            <GraphicalPasswordSelector 
              imageId={imageId} 
              onPointsSelected={onPointsSelected}
              mode="login"
            />
            
            <div className="mt-3">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setStep(2)}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;