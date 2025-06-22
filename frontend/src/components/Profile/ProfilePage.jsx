 
import ProfileHeader from './ProfileHeader';
import ScoreSection from './ScoreSection';
import GobletScore from './GobletScore';
const ProfilePage = () => {
  return (
    <div className="profile-container">
      <ProfileHeader />
      <GobletScore />
       <ScoreSection  />
    </div>
  );
};

export default ProfilePage;
