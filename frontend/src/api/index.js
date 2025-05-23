import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get profile data
export const getProfileData = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to fetch profile data",
      };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Get score data
export const getScoreData = async () => {
  try {
    const response = await api.get("/scores");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to fetch score data",
      };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
};

// Mock profile data
export const getMockProfileData = () => {
  return {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Software Engineer",
    profileImage:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  };
};

// Mock score data
export const getMockScoreData = () => {
  return {
    id: "1",
    userId: "1",
    technicalSkills: 4.5,
    communication: 4.2,
    teamwork: 1.8,
    problemSolving: 4.6,
    leadershipSkills: 3.9,
    gobletScore: 88,
  };
};
