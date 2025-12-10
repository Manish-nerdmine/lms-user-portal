import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import { Clock } from "lucide-react";
import CodedAgentsYouTubePage from "../Components/CodedAgentsYouTubePage";

export default function CoursePlayers({ done, setDone }) {
  const { courseId } = useParams();
  const userId = localStorage.getItem("userId"); // currently logged-in user
  const employmentId = localStorage.getItem("employment");

  const [videos, setVideos] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videoDurations, setVideoDurations] = useState({}); // { videoId: durationInSeconds }

  // Keys for localStorage with userId + courseId
  const videoKey = `completedVideos_${userId}_${courseId}`;
  const quizKey = `completedQuizzes_${userId}_${courseId}`;
  const dateKey = `completedDate_${userId}_${courseId}`;
  const totalKey = `totalCount_${userId}_${courseId}`;

  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem(videoKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    const saved = localStorage.getItem(quizKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [completedDate, setCompletedDate] = useState(() => {
    return localStorage.getItem(dateKey) || null;
  });

  const [quizSelections, setQuizSelections] = useState({});
  const [newtitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tit = async () => {
      const res = await axios.get(
        `http://195.35.21.108:3002/auth/api/v1/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("tit", res.data.title);
      setNewTitle(res.data.title);
    };
    tit();
  }, [videos, quizzes]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        // Fetch videos
        const resVideos = await axios.get(
          `http://195.35.21.108:3002/auth/api/v1/courses/${courseId}/videos`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(resVideos.data);

        const videoData = Array.isArray(resVideos.data)
          ? resVideos.data.map((v) => ({
              ...v,
              isCompleted: completedVideos.includes(v._id),
              type: "video",
            }))
          : [];
        setVideos(videoData);

        // Fetch quizzes
        const resQuizzes = await axios.get(
          `http://195.35.21.108:3002/auth/api/v1/courses/${courseId}/quizzes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(resQuizzes.data.questions);
        const quizzesData = Array.isArray(resQuizzes.data)
          ? resQuizzes.data.map((q) => ({ ...q, type: "quiz" }))
          : [];
        setQuizzes(quizzesData);

        // Save total count for this user & course
        const total = videoData.length + quizzesData.length;
        localStorage.setItem(totalKey, total);

        // Set first active item
        if (videoData.length) setActiveItem(videoData[0]);
        else if (quizzesData.length) setActiveItem(quizzesData[0]);
      } catch (err) {
        console.error(err);
        setError("Failed to load course content.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [courseId]);

  const handleVideoComplete = async (videoId) => {
    // Step 1: Update UI & localStorage immediately (user ka progress visible rahe)
    const updatedVideos = videos.map((v) =>
      v._id === videoId ? { ...v, isCompleted: true } : v
    );
    setVideos(updatedVideos);

    const newCompleted = [...completedVideos, videoId];
    setCompletedVideos(newCompleted);
    localStorage.setItem(videoKey, JSON.stringify(newCompleted));

    // Step 2: Call backend API safely
    try {
      await axios.post(
        `http://195.35.21.108:3002/auth/api/v1/employment/${employmentId}/mark-video-complete`,
        {
          courseId: courseId,
          videoId: videoId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(" Video marked as complete on server!");
      console.log("Video completion successfully sent to backend ");
    } catch (err) {
      console.error(" Error marking video complete:", err);
      toast.warning(" Internet issue — progress saved locally.");

      // Step 3: Store failed API call for retry
      const failedCalls = JSON.parse(
        localStorage.getItem("failedVideoCompletions") || "[]"
      );

      failedCalls.push({
        courseId,
        videoId,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem(
        "failedVideoCompletions",
        JSON.stringify(failedCalls)
      );
    }

    // Step 4: Check full course completion (frontend logic)
    checkCourseCompletion(updatedVideos, completedQuizzes);
  };

  const handleQuizComplete = (quizId) => {
    const newCompletedQuizzes = [...completedQuizzes, quizId];
    setCompletedQuizzes(newCompletedQuizzes);
    localStorage.setItem(quizKey, JSON.stringify(newCompletedQuizzes));

    checkCourseCompletion(videos, newCompletedQuizzes);
  };

  const checkCourseCompletion = (updatedVideos, updatedQuizzes) => {
    if (
      updatedVideos.every((v) => v.isCompleted) &&
      updatedQuizzes.length === quizzes.length &&
      !completedDate
    ) {
      const today = new Date().toLocaleDateString();
      setCompletedDate(today);
      localStorage.setItem(dateKey, today);
      alert("🎉 Congratulations! You have completed the full course!");
    }
  };

  const handleOptionSelect = (questionId, optionId) => {
    setQuizSelections((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const completedCount =
    videos.filter((v) => v.isCompleted).length + completedQuizzes.length;
  const totalCount = videos.length + quizzes.length;
  const progress = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;
  localStorage.setItem(
    `progress_${userId}_${courseId}`,
    Math.min(progress, 100)
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading course content...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  const totalVideoDuration = Object.values(videoDurations).reduce(
    (acc, d) => acc + d,
    0
  );

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`;
  };

  console.log("durations:-", formatDuration(totalVideoDuration));
  localStorage.setItem(
    `totalVideoDuration_${userId}_${courseId}`,
    formatDuration(totalVideoDuration)
  );

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent;
  };
  localStorage.setItem(
    `handleVideoComplete_${userId}_${courseId}_${activeItem?._id}`,
    handleVideoComplete.toString()
  );

  console.log("done value in course player:", done);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <header className="px-6 py-4 bg-white shadow flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{newtitle}</h1>
          <p className="text-gray-600 text-sm">
            Total Videos: {videos.length} videos
          </p>
        </div>
        <div className="w-48">
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-purple-950 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {Math.min(completedCount, totalCount)}/{totalCount} Completed (
            {Math.min(progress, 100)}%)
          </p>

          {completedDate && (
            <p className="text-xs text-green-600 mt-1">
              ✅ Course Completed on {completedDate}
            </p>
          )}
        </div>
      </header>

      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar */}
        {/* Sidebar */}
        <aside className="w-72 bg-white shadow-md p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-3">Course Content</h2>
          <div className="flex flex-col gap-2">
            {[...videos, ...quizzes].map((item, index, arr) => {
              const isCompleted =
                item.type === "video"
                  ? completedVideos.includes(item._id)
                  : completedQuizzes.includes(item._id);

              // 👇 check: can user open this item?
              const canOpen =
                index === 0 ||
                arr.slice(0, index).every((prev) => {
                  return prev.type === "video"
                    ? completedVideos.includes(prev._id)
                    : completedQuizzes.includes(prev._id);
                });

              const handleClick = () => {
                if (canOpen) {
                  if (item.type === "video") {
                    // Navigate to new page for video
                    navigate(`/course/${courseId}/video/${item._id}`);
                  } else {
                    // For quiz, stay on same page
                    setActiveItem(item);
                  }
                } else {
                  toast.warning("⚠️ Pehle previous module complete karo!");
                }
              };

              return (
                <button
                  key={item._id}
                  onClick={handleClick}
                  disabled={!canOpen}
                  className={`flex justify-between items-center px-3 py-2 rounded-md border transition ${
                    activeItem && activeItem._id === item._id
                      ? "bg-purple-950 text-white shadow"
                      : canOpen
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-gray-200 cursor-not-allowed opacity-60"
                  }`}
                >
                  <p className="text-sm font-medium truncate">
                    {item.type === "video"
                      ? `Video: ${stripHtml(item.title)}`
                      : `Quiz: ${stripHtml(item.title)}`}
                  </p>
                  {isCompleted && (
                    <span className="text-green-500 font-bold">✔</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto p-4 flex flex-col">
          {activeItem ? (
            activeItem.type === "video" ? (
              <div className="flex flex-col flex-1 items-center justify-center">
                <div className="bg-white rounded-lg shadow p-6 w-full max-w-3xl text-center h-[20rem]">
                  <h2 className="text-2xl font-semibold mb-3 text-gray-800 mt-20">
                    **{stripHtml(activeItem.title)}**
                  </h2>

                  <button
                    onClick={() => {
                      navigate(`/course/${courseId}/video/${activeItem._id}`),
                        setDone(false);
                    }}
                    className="mt-4 bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Start {stripHtml(activeItem.title)} Module
                  </button>

                  {/* Mark Complete Button - Right Side */}
                  {done && (
                    <div className="w-full flex justify-end mt-[4.5rem] ml-3">
                      <button
                        onClick={() =>{ handleVideoComplete(activeItem._id), setDone(false)}}
                        className="mt-3 bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-700 transition text-xs"
                      >
                        Mark as Complete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 w-full">
                {!quizSelections[activeItem._id]?.started ? (
                  // --- QUIZ INTRO ---
                  <div className="text-center w-full max-w-md mx-auto">
                    <div className="flex justify-center mb-3">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Clock />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Course Completed!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Congratulations on completing the course. Now it's time to
                      test your knowledge.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left text-sm mb-5">
                      <p className="font-semibold mb-2">Quiz Requirements:</p>
                      <ul className="text-gray-700 list-disc list-inside space-y-1">
                        <li>Total Questions: {activeItem.questions.length}</li>
                        <li>
                          Passing Score:{" "}
                          {Math.ceil(activeItem.questions.length * 0.8)} out of{" "}
                          {activeItem.questions.length}
                        </li>
                        <li>Question Type: Multiple Choice</li>
                      </ul>
                    </div>
                    <button
                      onClick={() =>
                        setQuizSelections((prev) => ({
                          ...prev,
                          [activeItem._id]: {
                            ...prev[activeItem._id],
                            started: true,
                          },
                        }))
                      }
                      className="bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                    >
                      Start Quiz
                    </button>
                  </div>
                ) : quizSelections[activeItem._id]?.submitted ? (
                  // --- QUIZ RESULT SCREEN ---
                  (() => {
                    const total = activeItem.questions.length;
                    const correct = activeItem.questions.filter((q) => {
                      const selected = quizSelections[q._id];
                      const correctOpt = q.options.find((o) => o.isCorrect);
                      return selected === correctOpt?._id;
                    }).length;
                    const incorrect = total - correct;
                    const unanswered = activeItem.questions.filter(
                      (q) => !quizSelections[q._id]
                    ).length;
                    const scorePercent = Math.round((correct / total) * 100);
                    const pass = scorePercent >= 80;

                    return (
                      <div className="text-center">
                        <div
                          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                            pass ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          <span
                            className={`text-3xl ${
                              pass ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {pass ? "🎉" : "❌"}
                          </span>
                        </div>

                        <h2
                          className={`text-3xl font-bold ${
                            pass ? "text-green-600" : "text-red-600"
                          } mb-2`}
                        >
                          {pass ? "Passed!" : "Not Passed"}
                        </h2>
                        <p className="text-gray-600 mb-6">
                          You need to score at least 80% to pass. Please{" "}
                          {pass ? "celebrate!" : "try again."}
                        </p>

                        <div className="flex justify-center gap-6 mb-6">
                          <div className="bg-green-50 border rounded-lg px-6 py-3">
                            <p className="text-2xl font-bold text-green-600">
                              {correct}
                            </p>
                            <p className="text-sm text-gray-700">Correct</p>
                          </div>
                          <div className="bg-red-50 border rounded-lg px-6 py-3">
                            <p className="text-2xl font-bold text-red-600">
                              {incorrect}
                            </p>
                            <p className="text-sm text-gray-700">Incorrect</p>
                          </div>
                          <div className="bg-gray-50 border rounded-lg px-6 py-3">
                            <p className="text-2xl font-bold text-gray-600">
                              {unanswered}
                            </p>
                            <p className="text-sm text-gray-700">Unanswered</p>
                          </div>
                        </div>

                        <div className="text-sm bg-gray-50 border rounded-lg px-6 py-3 mb-6 inline-block">
                          <p>
                            <strong>Score:</strong> {correct}/{total} (
                            {scorePercent}%)
                          </p>
                          <p>
                            <strong>Passing Score:</strong> 80% (
                            {Math.ceil(total * 0.8)}/{total})
                          </p>
                        </div>

                        {pass ? (
                          <>
                            {/* ✅ DONE BUTTON AFTER PASS */}
                            <p className="text-green-600 font-bold text-lg mb-4">
                              🎉 Congratulations! You Passed the Quiz!
                            </p>
                            <button
                              onClick={() => {
                                handleQuizComplete(activeItem._id);
                                navigate("/todo-training");
                                window.location.reload();
                                toast.success("Quiz marked as complete!");
                              }}
                              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                              Done
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              setQuizSelections((prev) => ({
                                ...prev,
                                [activeItem._id]: { started: true },
                              }))
                            }
                            className="bg-purple-950 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                          >
                            Retake Quiz
                          </button>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  // --- QUIZ QUESTIONS ---
                  <div className="w-full max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-semibold">
                        Course Assessment Quiz
                      </h2>
                      <span className="bg-blue-100 text-purple-900 text-sm font-medium px-3 py-1 rounded">
                        {" "}
                        {Object.keys(quizSelections).length - 1}/{" "}
                        {activeItem.questions.length} Answered{" "}
                      </span>
                    </div>

                    {activeItem.questions.map((q, idx) => (
                      <div
                        key={q._id}
                        className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <p className="text-md font-semibold mb-3">
                          <span className="text-purple-900 font-bold">
                            Question {idx + 1}:
                          </span>{" "}
                          {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt) => (
                            <label
                              key={opt._id}
                              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                                quizSelections[q._id] === opt._id
                                  ? "bg-blue-50 border-blue-500"
                                  : "bg-white hover:bg-gray-100"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${q._id}`}
                                checked={quizSelections[q._id] === opt._id}
                                onChange={() =>
                                  handleOptionSelect(q._id, opt._id)
                                }
                                className="mr-3 accent-blue-600"
                              />
                              <span className="text-gray-800">{opt.text}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() =>
                        setQuizSelections((prev) => ({
                          ...prev,
                          [activeItem._id]: {
                            ...prev[activeItem._id],
                            submitted: true,
                          },
                        }))
                      }
                      className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Submit Quiz
                    </button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              Select a video or quiz to start.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
