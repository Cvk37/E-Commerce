import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthenticationContext from '../context/AuthenticationContext';

interface UserProfileData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  // Add other fields as necessary
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useContext(AuthenticationContext); // Assume authentication state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get<UserProfileData>('http://localhost:8080/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProfile();
    }
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
