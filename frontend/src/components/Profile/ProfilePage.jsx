import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ScoreSection from './ScoreSection';
import GobletScore from './GobletScore';
import { getProfileData, getScoreData, getMockProfileData, getMockScoreData } from '../../api';


const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const profileResponse = await getProfileData();
        const scoreResponse = await getScoreData();
        
        if (!profileResponse.success) {
          console.log('Using mock profile data');
          setProfile(getMockProfileData());
        } else {
          setProfile(profileResponse.data);
        }

        if (!scoreResponse.success) {
          console.log('Using mock score data');
          setScores(getMockScoreData());
        } else {
          setScores(scoreResponse.data);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setProfile(getMockProfileData());
        setScores(getMockScoreData());
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateImage = (file) => {
    if (!profile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({
        ...profile,
        profileImage: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="loading">
        <Loader className="w-8 h-8 mb-4" />
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!profile || !scores) {
    return <div className="error">No profile data available</div>;
  }

  return (
    <div className="profile-container">
      <ProfileHeader profile={profile} onUpdateImage={handleUpdateImage} />
      <ScoreSection scores={scores} />
      <GobletScore score={scores.gobletScore} />
    </div>
  );
};

export default ProfilePage;
