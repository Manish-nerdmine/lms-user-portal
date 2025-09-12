import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TodoTraining = ({ groupId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gid, setGid] = useState(groupId || localStorage.getItem("groupId"));

  // GroupId
  useEffect(() => {
    if (groupId) {
      setGid(groupId);
      localStorage.setItem("groupId", groupId);
    }
  }, [groupId]);

  // API Call
  useEffect(() => {
    const fetchGroupCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedGroupId = gid;

        if (!storedGroupId || !token) {
          console.error("GroupId or Token missing ");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://195.35.21.108:3002/auth/api/v1/employment/group/${storedGroupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched courses:", res);
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      } 
    };

    fetchGroupCourses();
  }, [gid]);

  const navigate = useNavigate();

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">To-Do Training</h2>
          <p className="text-sm text-gray-500">
            {courses.length} trainings to complete
          </p>
        </div>
      </header>

      {/* Loading / Empty */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search completed trainings..."
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading trainings...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">No trainings available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((c, index) => {
            const details = c.courseDetails || {};
            return (
              <div
                key={c.courseId || index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                {details.thumbnail && details.thumbnail !== "null" ? (
                  <img
                    src={details.thumbnail}
                    alt={details.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-3 text-gray-400 text-sm">
                    No Thumbnail
                  </div>
                )}

                {/* Title + Status */}
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-lg">{details.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      details.isActive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {details.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-2">
                  {details.description}
                </p>

                {/* Progress  */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `0%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mb-3">Progress: 0%</p>

                {/* Due Date */}
                <p className="text-xs text-gray-400 mb-3">
                  📅 Due {new Date(c.dueDate).toLocaleDateString()}
                </p>

                {/* Button */}
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700" onClick={()=>navigate(`/videos/${c.courseId}`)}>
                  Start Training
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default TodoTraining;
