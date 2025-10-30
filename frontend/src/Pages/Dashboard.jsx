import React, { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Circle,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = ({
  courses,
  overdueCourses,
  completedCourses,
  setOverdueCourses,
  setCompletedCourses,
  setCourses,
}) => {
  console.log(courses, overdueCourses, completedCourses);
  const gid = localStorage.getItem("groupId");
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // ✅ Fetch Group Courses
  useEffect(() => {
    console.log(overdueCourses);
    const fetchGroupCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedGroupId = gid;
        const uId = localStorage.getItem("uId");
        console.log(
          "Fetching courses for GroupId:",
          storedGroupId,
          "and uId:",
          uId
        );

        if (!storedGroupId || !token) {
          console.error("GroupId or Token missing");
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

        console.log("Group Courses Response:", res.data);

        const allCourses = res.data.courses || [];
        const normal = [];
        const overdue = [];
        const completed = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        allCourses.forEach((c) => {
          const due = new Date(c.dueDate);
          due.setHours(0, 0, 0, 0);

          //  Get progress and completed date from localStorage
          const progress =
            Number(localStorage.getItem(`progress_${userId}_${c.courseId}`)) ||
            0;
          const savedCompletion = localStorage.getItem(
            `completedDate_${userId}_${c.courseId}`
          );

          if (progress === 100) {
            //  Already completed — keep old date if exists or set new one
            const completionDate = savedCompletion || new Date().toISOString();

            const completedCourse = {
              ...c,
              completedDate: completionDate,
            };

            localStorage.setItem(
              `completedDate_${userId}_${c.courseId}`,
              completionDate
            );
            completed.push(completedCourse);
          } else if (due < today) {
            overdue.push(c);
          } else {
            normal.push(c);
          }
        });

        setCourses(normal);
        setCompletedCourses(completed);
        setOverdueCourses(overdue);

        //  Save completed courses to localStorage
        localStorage.setItem(
          `completedCourses_${userId}`,
          JSON.stringify(completed)
        );
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupCourses();
  }, [gid]);

  const now = new Date();
  const thisMonth = now.getMonth();
  const lastMonth = thisMonth - 1;

  // Filter completed courses by month
  const completedThisMonth = completedCourses.filter((c) => {
    const d = new Date(c.completedDate);
    return d.getMonth() === thisMonth && d.getFullYear() === now.getFullYear();
  });

  const completedLastMonth = completedCourses.filter((c) => {
    const d = new Date(c.completedDate);
    return d.getMonth() === lastMonth && d.getFullYear() === now.getFullYear();
  });

  // Percentage difference
  const growthRate =
    completedLastMonth.length === 0
      ? 100
      : ((completedThisMonth.length - completedLastMonth.length) /
          completedLastMonth.length) *
        100;

  const totalCourses =
    courses.length + overdueCourses.length + completedCourses.length;
  const completionRate =
    totalCourses === 0 ? 0 : (completedCourses.length / totalCourses) * 100;

  const weekAhead = new Date();
  weekAhead.setDate(now.getDate() + 7);

  const dueThisWeek = overdueCourses.filter((c) => {
    const due = new Date(c.dueDate);
    return due >= now && due <= weekAhead;
  });

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-purple-600">
            <BookOpen className="w-5 h-5" />
            <p className="text-sm text-gray-500">Total Trainings</p>
          </div>
          <h3 className="text-2xl font-bold">
            {courses.length + overdueCourses.length + completedCourses.length}
          </h3>
          <p className="text-green-600 text-xs">
            {" "}
            +{growthRate.toFixed(1)}% from last month
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          <h3 className="text-2xl font-bold text-green-600">
            {completedCourses.length}
          </h3>
          <p className="text-green-600 text-xs">
            {" "}
            +{completionRate.toFixed(0)}% completion rate
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-yellow-500">
            <Clock className="w-5 h-5" />
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <h3 className="text-2xl font-bold text-yellow-600">
            {courses.length}
          </h3>
          <p className="text-gray-500 text-xs">
            {" "}
            {dueThisWeek.length} due this week
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm text-gray-500">Overdue</p>
          </div>
          <h3 className="text-2xl font-bold text-red-600">
            {overdueCourses.length}
          </h3>
          <p className="text-red-500 text-xs">Requires attention</p>
        </div>
      </div>

      {/* Recent Activity */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>

        {/* Card 1 */}
        {courses
          .slice(courses.length - 1, courses.length)
          .map((course, idx) => {
            const progress =
              localStorage.getItem(`progress_${userId}_${course.courseId}`) ||
              0;
            return (
              <>
                <div key={idx} className="bg-white p-4 rounded-lg shadow mb-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      {course.courseDetails.title}
                    </h4>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" /> To Do
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {course.courseDetails.description}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 my-3">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${progress || 0}%` }}
                    ></div>
                  </div>
                  <button
                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                    onClick={() => navigate(`/videos/${course.courseId}`)}
                  >
                    Start Training
                  </button>
                </div>
              </>
            );
          })}

        {/* Card 2 */}
        {overdueCourses
          .slice(overdueCourses.length - 1, overdueCourses.length)
          .map((course, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow mb-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{course.courseDetails.title}</h4>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Overdue
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {course.courseDetails.description}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 my-3">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
              <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Start Now
              </button>
            </div>
          ))}

        {/* Card 3 */}
        {completedCourses
          .slice(completedCourses.length - 1, completedCourses.length)
          .map((course, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{course.courseDetails.title}</h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {course.courseDetails.description}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 my-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${course.progress || 100}%` }}
                ></div>
              </div>
              <button className="mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
                Review
              </button>
            </div>
          ))}
      </section>

      {/* Upcoming Deadlines */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Upcoming Deadlines</h3>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="space-y-3 text-sm text-gray-700">
            {/* 🔴 Overdue Courses */}
            {overdueCourses.slice(0, 5).map((course, idx) => (
              <li
                key={`overdue-${idx}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 text-red-500 fill-red-500" />
                  <span>{course.courseDetails.title}</span>
                </div>
                <span className="text-red-500">
                  Overdue :- {new Date(course.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}

            {/* 🟡 Normal Courses (In Progress / Upcoming) */}
            {courses.slice(0, 2).map((course, idx) => (
              <li
                key={`normal-${idx}`}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>{course.courseDetails.title}</span>
                </div>
                <span className="text-gray-500">
                  Due :- {new Date(course.dueDate).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200" onClick={() => navigate('/todo-training')}>
            View All Deadlines
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
