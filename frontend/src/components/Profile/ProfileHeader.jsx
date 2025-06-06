import React, { useRef, useState } from "react";
import { Mail, Phone, Camera ,Hash, CalendarRange, BookOpenText} from "lucide-react";
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
      await updateProfile({ profileImage: base64Image }); // Must match backend field name
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-header">
      <div className="profile-image-wrapper" onClick={handleImageClick}>
        <img
          src={selectedImg || authUser?.profileImage || defaultImage}
          alt="Profile"
          className="profile-image"
        />
        <div className="image-overlay1">
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
      <div className="profile-right">
  <div className="detail">
    <Hash className="icon" />
    <span className="detail-span">Roll No.</span> {authUser?.rollNumber}
  </div>
  <div className="detail">
    <CalendarRange className="icon" />
    <span className="detail-span">Batch</span> {authUser?.batch}
  </div>
  <div className="detail">
    <BookOpenText className="icon" />
    <span className="detail-span">Branch</span> {authUser?.branch}
  </div>
</div>
    </div>
  );
};

export default ProfileHeader;
