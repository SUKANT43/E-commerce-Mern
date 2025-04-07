import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    doorNo: '',
    street: '',
    city: '',
    district: '',
    state: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:2005/api/userProfile/getUserData', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data.data;
        if (data) {
          setUserData(data);
          setFormData({
            doorNo: data.doorNo || '',
            street: data.street || '',
            city: data.city || '',
            district: data.district || '',
            state: data.state || ''
          });
        }
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      let response;
      if (userData) {
        response = await axios.put('http://localhost:2005/api/userProfile/editUserData', formData, config);
        setUserData(response.data.updateData);
      } else {
        response = await axios.post('http://localhost:2005/api/userProfile/newUserData', formData, config);
        setUserData(response.data.newData);
      }

      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Operation failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your address?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:2005/api/userProfile/delete', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserData(null);
        setFormData({ doorNo: '', street: '', city: '', district: '', state: '' });
        setError('');
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to delete address');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20 mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      {!userData && !isEditing ? (
        <div className="text-center">
          <p className="mb-4">You don't have an address saved yet.</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Address
          </button>
        </div>
      ) : (
        <>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {['doorNo', 'street', 'city', 'district', 'state'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              ))}

              <div className="flex space-x-4">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <h3 className="font-semibold text-lg mb-2">Your Address</h3>
                <p>{userData.doorNo}, {userData.street}</p>
                <p>{userData.city}, {userData.district}</p>
                <p>{userData.state}</p>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Address</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete Address</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
