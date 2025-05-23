import Header from './Layout/Header';
import ProfilePage from './Profile/ProfilePage';
function UserDetails (){
  return (
     <div className="app-container">
      <Header />
      <main className="main-content">
        <ProfilePage />
      </main>
    </div>
  );
};

export default UserDetails;
