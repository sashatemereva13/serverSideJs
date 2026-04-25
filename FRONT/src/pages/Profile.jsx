import { useEffect, useState } from "react";
import api from "../api/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      // if you add /students/me endpoint → better
      // for now, assume you know your id or backend returns it on login
      const id = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1]),
      ).id;
      const res = await api.get(`/students/${id}`);
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateProfile = async () => {
    try {
      const id = user._id;
      await api.patch(`/students/${id}/profile`, {
        bio: user.bio,
        skills: user.skills,
      });
      alert("Updated");
    } catch (e) {
      console.log(e);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2>{user.name}</h2>
        <textarea
          value={user.bio || ""}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
        />
        <button onClick={updateProfile}>Save</button>
      </div>
    </div>
  );
}
