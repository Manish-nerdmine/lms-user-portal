import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import axios from "axios"; 
import YouTube from "react-youtube"; 

export default function CoursePlayer() { 
  const { courseId } = useParams(); 
  const userId = localStorage.getItem("userId"); // currently logged-in user 

  const [videos, setVideos] = useState([]); 
  const [quizzes, setQuizzes] = useState([]); 
  const [activeItem, setActiveItem] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

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

  useEffect(() => { 
    const fetchContent = async () => { 
      try { 
        setLoading(true); 

        // Fetch videos 
        const resVideos = await axios.get( 
          `http://195.35.21.108:3002/auth/api/v1/courses/${courseId}/videos`, 
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
        ); 

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
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } } 
        ); 

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

  const handleVideoComplete = (videoId) => { 
    const updatedVideos = videos.map((v) => v._id === videoId ? { ...v, isCompleted: true } : v ); 
    setVideos(updatedVideos); 

    const newCompleted = [...completedVideos, videoId]; 
    setCompletedVideos(newCompleted); 
    localStorage.setItem(videoKey, JSON.stringify(newCompleted)); 

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
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^"&?/\s]{11})/); 
    return match ? match[1] : null; 
  }; 

  const completedCount = videos.filter((v) => v.isCompleted).length + completedQuizzes.length; 
  const totalCount = videos.length + quizzes.length; 
  const progress = totalCount ? Math.round((completedCount / totalCount) * 100) : 0; 
  localStorage.setItem(`progress_${userId}_${courseId}`, progress); 

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

  return ( 
    <div className="h-screen w-full flex flex-col bg-gray-100"> 
      {/* Header */} 
      <header className="px-6 py-4 bg-white shadow flex items-center justify-between"> 
        <div> 
          <h1 className="text-2xl font-bold">Course Player</h1> 
          <p className="text-gray-600 text-sm"> 
            Total Content: {totalCount} items ({videos.length} videos + {quizzes.length} quizzes) 
          </p> 
        </div> 
        <div className="w-48"> 
          <div className="w-full bg-gray-200 h-2 rounded-full"> 
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /> 
          </div> 

          <p className="text-xs text-gray-500 mt-1"> 
            {completedCount}/{totalCount} Completed ({progress}%) 
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
        <aside className="w-72 bg-white shadow-md p-4 overflow-y-auto"> 
          <h2 className="text-sm font-semibold mb-3">Course Content</h2> 
          <div className="flex flex-col gap-2"> 
            {videos.map((vid, index) => ( 
              <button key={vid._id} onClick={() => setActiveItem(vid)} className={`flex justify-between items-center px-3 py-2 rounded-md border transition ${ activeItem && activeItem._id === vid._id ? "bg-blue-600 text-white shadow" : "bg-gray-50 hover:bg-gray-100" }`}> 
                <p className="text-sm font-medium truncate">{index + 1}. {vid.title}</p> 
                {vid.isCompleted && <span className="text-green-500 font-bold">✔</span>} 
              </button> 
            ))} 
            {quizzes.map((quiz, index) => ( 
              <button key={quiz._id} onClick={() => setActiveItem(quiz)} className={`flex justify-between items-center px-3 py-2 rounded-md border transition ${ activeItem && activeItem._id === quiz._id ? "bg-blue-600 text-white shadow" : "bg-gray-50 hover:bg-gray-100" }`}> 
                <p className="text-sm font-medium truncate">Quiz {index + 1}: {quiz.title}</p> 
                {completedQuizzes.includes(quiz._id) && <span className="text-green-500 font-bold">✔</span>} 
              </button> 
            ))} 
          </div> 
        </aside> 

        {/* Main Content */} 
        <main className="flex-1 h-full overflow-y-auto p-4 flex flex-col"> 
          {activeItem ? ( 
            activeItem.type === "video" ? ( 
              <div className="flex flex-col flex-1"> 
                <div className="flex-1 w-full rounded-lg overflow-hidden shadow bg-black"> 
                  {getYouTubeId(activeItem.videoUrl) ? ( 
                    <YouTube 
                      videoId={getYouTubeId(activeItem.videoUrl)} 
                      opts={{ width: "100%", height: "100%", playerVars: { autoplay: 1, controls: 1 } }} 
                      className="w-full h-full" 
                      onEnd={() => handleVideoComplete(activeItem._id)} 
                    /> 
                  ) : ( 
                    <video 
                      key={activeItem._id} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-cover" 
                      src={activeItem.videoUrl} 
                      poster={activeItem.thumbnail || ""} 
                      onEnded={() => handleVideoComplete(activeItem._id)} 
                    /> 
                  )} 
                </div> 

                <div className="mt-4 bg-white rounded-lg shadow p-4"> 
                  <h2 className="text-lg font-semibold mb-2">{activeItem.title}</h2> 
                  <p className="text-gray-600">{activeItem.description}</p> 
                  <p className="text-sm text-gray-500 mt-2"> 
                    Uploaded: {new Date(activeItem.createdAt).toLocaleDateString()} 
                  </p> 
                </div> 
              </div> 
            ) : ( 
              <div className="bg-white rounded-lg shadow p-4"> 
                <h2 className="text-lg font-semibold mb-4">{activeItem.title}</h2> 
                {activeItem.questions.map((q, idx) => ( 
                  <div key={q._id} className="mb-4 border-b pb-2"> 
                    <p className="font-medium">Q{idx + 1}. {q.question} ({q.points} pts)</p> 
                    <div className="flex flex-col mt-1 gap-1"> 
                      {q.options.map((opt) => ( 
                        <button key={opt._id} onClick={() => handleOptionSelect(q._id, opt._id)} className={`px-3 py-1 rounded border text-left transition ${ quizSelections[q._id] === opt._id ? "bg-blue-600 text-white" : "hover:bg-gray-100" }`}> 
                          {opt.text} 
                        </button> 
                      ))} 
                    </div> 
                  </div> 
                ))} 
                {!completedQuizzes.includes(activeItem._id) && ( 
                  <button onClick={() => handleQuizComplete(activeItem._id)} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"> 
                    Submit Quiz 
                  </button> 
                )} 
                {completedQuizzes.includes(activeItem._id) && ( 
                  <p className="mt-2 text-green-600 font-bold">✅ Quiz Completed</p> 
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
