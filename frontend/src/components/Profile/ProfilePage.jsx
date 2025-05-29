 
import { Loader } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ScoreSection from './ScoreSection';
import GobletScore from './GobletScore';
const ProfilePage = () => {
  return (
    <div className="profile-container">
      <ProfileHeader />
        <ScoreSection  />
      <GobletScore />
    </div>
  );
};

export default ProfilePage;
