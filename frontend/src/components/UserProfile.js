import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthenticationContext from '../context/AuthenticationContext';

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useContext(AuthenticationContext); // Assume you have authentication state here

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/profile', {
          headers: {
            'Authorization':`Bearer ${localStorage.getItem('token')}` 
          }
        })
        console.log(response.data)
        setProfile(response.data);
        setLoading(false);
        return;
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [isLoggedIn]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div>
        <strong>Username:</strong> {profile.username}
      </div>
      <div>
        <strong>Email:</strong> {profile.email}
      </div>
      <div>
        <strong>First Name:</strong> {profile.firstName}
      </div>
      <div>
        <strong>Last Name:</strong> {profile.lastName}
      </div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default UserProfile;