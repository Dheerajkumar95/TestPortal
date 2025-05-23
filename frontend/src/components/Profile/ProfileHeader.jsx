import React, { useRef } from 'react';
import { Mail, Phone, Briefcase, Camera } from 'lucide-react';

const ProfileHeader = ({ profile, onUpdateImage }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && onUpdateImage) {
      onUpdateImage(file);
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-image-wrapper">
        <img
          src={profile.profileImage}
          alt={`${profile.name}'s profile`}
          className="profile-image"
          onClick={handleImageClick}
        />
        <div className="image-overlay" onClick={handleImageClick}>
          <Camera className="camera-icon" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden-input"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="profile-details">
        <h1 className="profile-name">{profile.name}</h1>
        <p className="profile-position">{profile.position}</p>

        <div className="profile-contact">
          <div className="contact-item">
            <Mail size={18} />
            <span>{profile.email}</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>{profile.phone}</span>
          </div>
          <div className="contact-item">
            <Briefcase size={18} />
            <span>Employee ID: EMP-{profile.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
