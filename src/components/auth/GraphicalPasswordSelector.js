import { useState, useRef, useEffect } from 'react';

const GraphicalPasswordSelector = ({ imageId, onPointsSelected, mode = 'create' }) => {
  const [points, setPoints] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.width,
        height: imageRef.current.height
      });
    }
  }, [imageRef.current]);

  const handleImageClick = (e) => {
    if (mode === 'create' && points.length >= 4) {
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    const newPoint = { x, y };
    
    if (mode === 'create') {
      const newPoints = [...points, newPoint];
      setPoints(newPoints);
      
      if (newPoints.length === 4) {
        onPointsSelected(newPoints);
      }
    } else {
      // In login mode, collect points until we reach 4
      const newPoints = [...points, newPoint];
      setPoints(newPoints);
      
      if (newPoints.length === 4) {
        onPointsSelected(newPoints);
      }
    }
  };

  const resetPoints = () => {
    setPoints([]);
  };

  return (
    <div className="graphical-password-container position-relative">
      <img 
        src={`/images/${imageId}.jpg`} 
        alt="Graphical Password" 
        className="img-fluid border rounded"
        onClick={handleImageClick}
        ref={imageRef}
      />
      
      <div className="mb-3">
        <h5 className="text-primary mb-3">
          {mode === 'create' 
            ? 'Create Your Graphical Password' 
            : 'Enter Your Graphical Password'}
        </h5>
        <p className="text-muted">
          {mode === 'create' 
            ? 'Select 4 points on the image to create your graphical password.' 
            : 'Select your 4 points to authenticate.'}
        </p>
        <div className="d-flex align-items-center">
          <div className="progress flex-grow-1 me-2" style={{ height: '10px' }}>
            <div 
              className="progress-bar bg-primary" 
              role="progressbar" 
              style={{ width: `${(points.length / 4) * 100}%` }} 
              aria-valuenow={points.length} 
              aria-valuemin="0" 
              aria-valuemax="4"
            ></div>
          </div>
          <span className="text-primary fw-bold">{points.length}/4</span>
        </div>
      </div>
      
      {/* Display selected points coordinates */}
      {points.length > 0 && (
        <div className="mb-3">
          <h6 className="text-secondary">Selected Points:</h6>
          <div className="row">
            {points.map((point, index) => (
              <div key={index} className="col-md-3 col-6 mb-2">
                <div className="card bg-light">
                  <div className="card-body p-2 text-center">
                    <small>Point {index + 1}: ({point.x}, {point.y})</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {points.length > 0 && (
        <div className="text-center">
          <button 
            className="btn btn-outline-secondary" 
            onClick={resetPoints}
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i>
            Reset Points
          </button>
        </div>
      )}
    </div>
  );
};

export default GraphicalPasswordSelector;