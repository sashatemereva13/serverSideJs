import { useEffect, useState } from "react";
import { getStudents } from "../api/studentApi";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async (searchQuery = "") => {
    try {
      const res = await getStudents({
        search: searchQuery,
      });

      setStudents(res.data.data.students);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <SearchBar onSearch={fetchStudents} />

      <h2>Students</h2>

      <div className="studentsGrid">
        {students.map((s) => (
          <div key={s._id} className="studentCard">
            <h3>{s.name}</h3>
            <p className="email">{s.email}</p>

            {s.major && (
              <p>
                <strong>Major:</strong> {s.major}
              </p>
            )}

            {s.gpa && (
              <p>
                <strong>GPA:</strong> {s.gpa}
              </p>
            )}

            {s.bio && <p className="bio">{s.bio}</p>}

            {s.skills?.length > 0 && (
              <div className="skills">
                {s.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
