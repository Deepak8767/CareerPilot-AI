import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usercontext } from "../appcontext";
import Styles from "./profile.module.css";

function Profile() {
  const { serviceURL } = useContext(usercontext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    college: "",
    degree: "",
    skills: "",
    bio: "",
    linkedin: "",
    github: "",
    careerGoal: "",
    experience: "",
    profilePhoto: "",
    profileCompletion: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${serviceURL}/profile`, {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          toast.error("Session expired. Please login again.");
          navigate("/login");
        } else {
          toast.error("Could not load profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [serviceURL, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        username: profile.username,
        phone: profile.phone,
        college: profile.college,
        degree: profile.degree,
        skills: profile.skills,
        bio: profile.bio,
        linkedin: profile.linkedin,
        github: profile.github,
        careerGoal: profile.careerGoal,
        experience: profile.experience,
      };
      const response = await axios.put(`${serviceURL}/profile`, payload, {
        withCredentials: true,
      });
      setProfile(response.data);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = (event) => {
    setPhotoFile(event.target.files?.[0] || null);
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) {
      toast.error("Choose a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", photoFile);
    setUploading(true);

    try {
      const response = await axios.post(`${serviceURL}/profile/photo`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(response.data);
      setPhotoFile(null);
      toast.success("Profile photo updated.");
    } catch (error) {
      console.error(error);
      toast.error("Photo upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const completionClass = profile.profileCompletion >= 80 ? Styles.good : profile.profileCompletion >= 50 ? Styles.medium : Styles.low;

  const profileImage = profile.profilePhoto && profile.profilePhoto !== "" ? profile.profilePhoto : "https://via.placeholder.com/180?text=Photo";

  return (
    <div className={Styles.page}>
      <div className={Styles.header}>
        <button className={Styles.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div>
          <h1>Profile</h1>
          <p>Manage your account details, upload your photo, and complete your profile.</p>
        </div>
      </div>

      <div className={Styles.content}>
        <section className={Styles.summaryCard}>
          <div className={Styles.avatarWrapper}>
            <img src={profileImage} alt="Profile" className={Styles.avatar} />
          </div>
          <div className={Styles.progressBlock}>
            <div className={Styles.progressHeading}>Profile completion</div>
            <div className={Styles.progressBar}>
              <div className={`${Styles.progressFill} ${completionClass}`} style={{ width: `${profile.profileCompletion}%` }} />
            </div>
            <div className={Styles.progressLabel}>{profile.profileCompletion}% complete</div>
          </div>
        </section>

        <section className={Styles.formSection}>
          {loading ? (
            <div className={Styles.loading}>Loading profile…</div>
          ) : (
            <>
              <div className={Styles.formGrid}>
                <label>
                  Name
                  <input name="username" value={profile.username || ""} onChange={handleChange} placeholder="Your full name" />
                </label>
                <label>
                  Email
                  <input name="email" value={profile.email || ""} disabled />
                </label>
                <label>
                  Phone
                  <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder="Phone number" />
                </label>
                <label>
                  College
                  <input name="college" value={profile.college || ""} onChange={handleChange} placeholder="College or university" />
                </label>
                <label>
                  Degree
                  <input name="degree" value={profile.degree || ""} onChange={handleChange} placeholder="Degree or certification" />
                </label>
                <label>
                  Experience
                  <input name="experience" value={profile.experience || ""} onChange={handleChange} placeholder="Software, internship, freelance experience" />
                </label>
                <label>
                  LinkedIn URL
                  <input name="linkedin" value={profile.linkedin || ""} onChange={handleChange} placeholder="https://linkedin.com/in/you" />
                </label>
                <label>
                  GitHub URL
                  <input name="github" value={profile.github || ""} onChange={handleChange} placeholder="https://github.com/you" />
                </label>
              </div>

              <label className={Styles.fullWidth}>
                Skills
                <textarea name="skills" value={profile.skills || ""} onChange={handleChange} placeholder="Comma-separated skills or summary" rows={3} />
              </label>

              <label className={Styles.fullWidth}>
                Career Goal
                <textarea name="careerGoal" value={profile.careerGoal || ""} onChange={handleChange} placeholder="Your career objective" rows={2} />
              </label>

              <label className={Styles.fullWidth}>
                About you
                <textarea name="bio" value={profile.bio || ""} onChange={handleChange} placeholder="Short bio or summary" rows={4} />
              </label>

              <div className={Styles.photoUploadBlock}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                <button type="button" onClick={handleUploadPhoto} disabled={uploading}>
                  {uploading ? "Uploading…" : "Upload Photo"}
                </button>
              </div>

              <div className={Styles.actionBar}>
                <button className={Styles.saveButton} type="button" onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : "Save profile"}
                </button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
