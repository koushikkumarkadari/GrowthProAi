import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/business-data', formData);
      setBusinessData(response.data);
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
    setLoading(false);
  };

  const handleRegenerateHeadline = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/regenerate-headline', {
        params: formData,
      });
      setBusinessData({ ...businessData, headline: response.data.headline });
    } catch (error) {
      console.error('Error regenerating headline:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Local Business Dashboard</h1>
        
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Business Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {/* Display Card */}
        {loading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          businessData && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h2 className="text-lg font-semibold">{formData.name}</h2>
              <p className="text-sm text-gray-600">{formData.location}</p>
              <p className="mt-2">Rating: {businessData.rating} ⭐</p>
              <p>Reviews: {businessData.reviews}</p>
              <p className="mt-2 font-medium">SEO Headline: {businessData.headline}</p>
              <button
                onClick={handleRegenerateHeadline}
                className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Regenerate SEO Headline
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;