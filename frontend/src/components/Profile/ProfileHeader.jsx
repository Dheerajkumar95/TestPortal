import React, { useRef, useState } from "react";
import { Mail, Phone, Camera, Hash, CalendarRange, BookOpenText, Landmark,UserCheck } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import defaultImage from "../../images/avatar.png";
 
const ProfileHeader = () => {
  const { authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profileImage: base64Image }); 
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-wrapper" onClick={handleImageClick}>
          <img
            src={selectedImg || authUser?.profileImage || defaultImage}
            alt="Profile"
            className="profile-image"
          />
          <div className="image-overlay">
            <Camera className="camera-icon" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden-input"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="profile-details">
          <h1 className="profile-name">{authUser?.fullName}</h1>
          <div className="profile-contact">
            <div className="contact-item">
              <Mail size={18} />
              <span>{authUser?.email}</span>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <span>{authUser?.contact}</span>
            </div>
          </div>  
        </div>
      </div>

      <div className="profile-info-grid">
        <div className="info-section">
          <div className="detail">
            <Landmark className="icon" />
            <span className="detail-label">College:</span>
            <span className="detail-value">{authUser?.collegeName}</span>
          </div>
          <div className="detail">
            <BookOpenText className="icon" />
            <span className="detail-label">Course:</span>
            <span className="detail-value">{authUser?.course}</span>
          </div>
          <div className="detail">
            <BookOpenText className="icon" />
            <span className="detail-label">Branch:</span>
            <span className="detail-value">{authUser?.branch}</span>
          </div>
        </div>

        <div className="info-section">
          <div className="detail">
            <Hash className="icon" />
            <span className="detail-label">Roll Number:</span>
            <span className="detail-value">{authUser?.rollNumber}</span>
          </div>
          <div className="detail">
            <Hash className="icon" />
            <span className="detail-label">Batch:</span>
            <span className="detail-value">{authUser?.batch}</span>
          </div>
        </div>

        <div className="info-section">
          <div className="detail">
            <CalendarRange className="icon" />
            <span className="detail-label">DOB:</span>
            <span className="detail-value">{authUser?.dob}</span>
          </div>
          <div className="detail">
            <UserCheck className="icon" />
            <span className="detail-label">Gender:</span>
            <span className="detail-value">{authUser?.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;