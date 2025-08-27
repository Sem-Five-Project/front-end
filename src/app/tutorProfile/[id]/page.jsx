"use client"
import React, { useState, useRef } from 'react';
import { Edit2, Save, X, Plus, Trash2, Upload, User, Mail, BookOpen, DollarSign, FileText, Star, Award, Calendar, Clock, Users, TrendingUp, Eye, Download, Share2, Heart, MessageCircle, Camera, CalendarDays, MapPin, Video } from 'lucide-react';
import OverView from '@/components/teacherProfile/overView';
import Subjects from '@/components/teacherProfile/subjects';
import Documents from '@/components/teacherProfile/documents';
// import addSession from '@/components/teacherProfile/addSession';
export default function TeacherProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [likedDocs, setLikedDocs] = useState(new Set());
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "Senior Mathematics Teacher",
    bio: "Experienced mathematics educator with over 10 years of teaching experience. Specialized in advanced calculus, statistics, and helping students overcome math anxiety. Passionate about making complex concepts accessible and engaging for students of all levels.",
    hourlyRate: 45,
    profilePic: "/api/placeholder/200/200",
    rating: 4.9,
    totalStudents: 847,
    totalHours: 2340,
    joinDate: "2019",
    verified: true
  });

  const [subjects, setSubjects] = useState([
    { name: "Advanced Calculus", level: "Advanced", students: 124, color: "from-purple-500 to-pink-500" },
    { name: "Statistics", level: "Intermediate", students: 89, color: "from-blue-500 to-cyan-500" },
    { name: "Linear Algebra", level: "Advanced", students: 76, color: "from-green-500 to-emerald-500" },
    { name: "Differential Equations", level: "Expert", students: 45, color: "from-orange-500 to-red-500" }
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: "Advanced Calculus Syllabus", type: "pdf", size: "2.3 MB", uploadDate: "2024-01-15", downloads: 234, views: 1205, likes: 45, category: "Syllabus" },
    { id: 2, name: "Statistics Problem Sets", type: "docx", size: "1.8 MB", uploadDate: "2024-01-10", downloads: 189, views: 892, likes: 38, category: "Exercises" },
    { id: 3, name: "Student Assessment Rubric", type: "pdf", size: "945 KB", uploadDate: "2024-01-08", downloads: 156, views: 678, likes: 29, category: "Assessment" },
    { id: 4, name: "Teaching Philosophy", type: "pdf", size: "1.2 MB", uploadDate: "2024-01-05", downloads: 98, views: 445, likes: 52, category: "Philosophy" }
  ]);

  const [newSubject, setNewSubject] = useState({ name: "", level: "Beginner", color: "from-purple-500 to-pink-500" });
  const [newDoc, setNewDoc] = useState({ name: "", type: "pdf", category: "General" });

 const timeSlots = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [schedule, setSchedule] = useState({
    Monday: {
      '09:00': { subject: 'Advanced Calculus', duration: 2, type: 'online', students: 12 },
      '14:00': { subject: 'Statistics', duration: 1.5, type: 'in-person', students: 8 }
    },
    Tuesday: {
      '10:00': { subject: 'Linear Algebra', duration: 2, type: 'online', students: 15 }
    },
    Wednesday: {
      '09:00': { subject: 'Advanced Calculus', duration: 2, type: 'online', students: 12 },
      '16:00': { subject: 'Differential Equations', duration: 1.5, type: 'in-person', students: 6 }
    },
    Thursday: {
      '11:00': { subject: 'Statistics', duration: 2, type: 'online', students: 10 }
    },
    Friday: {
      '09:00': { subject: 'Linear Algebra', duration: 2, type: 'in-person', students: 15 },
      '15:00': { subject: 'Advanced Calculus', duration: 1.5, type: 'online', students: 8 }
    }
  });

  const [sessions, setSessions] = useState([
    { sessionId: 1, tutorId: 101, subjectId: 1, startTime: new Date('2025-08-10T09:00:00+0530'), endTime: new Date('2025-08-10T11:00:00+0530'), status: 'booked', linkForMeeting: "https://zoom.us/j/123456789", createdAt: new Date(), notificationSent: false },
    { sessionId: 2, tutorId: 101, subjectId: 2, startTime: new Date('2025-08-11T14:00:00+0530'), endTime: new Date('2025-08-11T15:30:00+0530'), status: 'completed', linkForMeeting: "https://zoom.us/j/987654321", createdAt: new Date(), notificationSent: true }
  ]);

  const [newSession, setNewSession] = useState({
    day: 'Monday',
    time: '09:00',
    subject: '',
    duration: 1,
    type: 'online',
    students: 1
  });

  const [newCustomSession, setNewCustomSession] = useState({
    subjectId: '',
    startTime: new Date(),
    duration: 1,
    type: 'online',
    status: 'booked'
  });

  const stats = [
    { label: "Total Students", value: profile.totalStudents, icon: Users, color: "text-blue-400" },
    { label: "Teaching Hours", value: `${profile.totalHours}+`, icon: Clock, color: "text-green-400" },
    { label: "Average Rating", value: profile.rating, icon: Star, color: "text-yellow-400" },
    { label: "Years Experience", value: `${new Date().getFullYear() - parseInt(profile.joinDate)}+`, icon: Calendar, color: "text-purple-400" }
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  const addSubject = () => {
    if (newSubject.name.trim()) {
      setSubjects([...subjects, { ...newSubject, students: 0 }]);
      setNewSubject({ name: "", level: "Beginner", color: "from-purple-500 to-pink-500" });
    }
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const addDocument = () => {
    if (newDoc.name.trim()) {
      const doc = {
        id: Date.now(),
        name: newDoc.name.trim(),
        type: newDoc.type,
        category: newDoc.category,
        size: "New file",
        uploadDate: new Date().toISOString().split('T')[0],
        downloads: 0,
        views: 0,
        likes: 0
      };
      setDocuments([...documents, doc]);
      setNewDoc({ name: "", type: "pdf", category: "General" });
    }
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const toggleLike = (docId) => {
    const newLiked = new Set(likedDocs);
    if (newLiked.has(docId)) {
      newLiked.delete(docId);
    } else {
      newLiked.add(docId);
    }
    setLikedDocs(newLiked);
  };

  const addScheduleSession = async () => {
    if (newSession.subject.trim()) {

      const response = await addSession({
        session_name: newSession.subject,
        tutor_id: 101,
        subject_id: 1,
        start_time: new Date(`2025-08-10T${newSession.time}:00+0530`),
        end_time: new Date(`2025-08-10T${newSession.time}:00+0530` + newSession.duration * 60 * 60000),
        status: 'booked',
        link_for_meeting: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
        notification_sent: false
      });

      setSchedule(prev => ({
        ...prev,
        [newSession.day]: {
          ...prev[newSession.day],
          [newSession.time]: {
            subject: newSession.subject,
            duration: newSession.duration,
            type: newSession.type,
            students: newSession.students
          }
        }
      }));
      setNewSession({
        day: 'Monday',
        time: '09:00',
        subject: '',
        duration: 1,
        type: 'online',
        students: 1
      });
      setShowScheduleModal(false);
    }
  };

  const removeScheduleSession = (day, time) => {
    setSchedule(prev => {
      const newSchedule = { ...prev };
      delete newSchedule[day][time];
      return newSchedule;
    });
  };

  const getSessionColor = (type) => {
    return type === 'online' 
      ? 'from-blue-500 to-cyan-500' 
      : 'from-green-500 to-emerald-500';
  };

  const isTimeSlotOccupied = (day, time) => {
    return schedule[day] && schedule[day][time];
  };



  const getCategoryColor = (category) => {
    const colors = {
      'Syllabus': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'Exercises': 'bg-green-500/20 text-green-300 border-green-500/30',
      'Assessment': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'Philosophy': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'General': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    };
    return colors[category] || colors['General'];
  };

  const addCustomSession = () => {
    if (newCustomSession.subjectId && newCustomSession.startTime) {
      const newSessionId = sessions.length + 1;
      setSessions([...sessions, { 
        sessionId: newSessionId, 
        tutorId: 101, 
        subjectId: parseInt(newCustomSession.subjectId), 
        startTime: newCustomSession.startTime, 
        endTime: new Date(newCustomSession.startTime.getTime() + newCustomSession.duration * 60 * 60000),
        status: newCustomSession.status,
        linkForMeeting: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
        createdAt: new Date(),
        notificationSent: false
      }]);
      setNewCustomSession({
        subjectId: '',
        startTime: new Date(),
        duration: 1,
        type: 'online',
        status: 'booked'
      });
    }
  };

  const handleProfileDataFromOverview = (data) => {
    setProfile(data);
  };

  const handleAddNewSubject = (data) => {
    setNewSubject(data)
  }

  const handleSetNewDoc = (data) => {
    setNewDoc(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden">
                    <User className="w-12 h-12 text-purple-300" />
                  </div>
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-all duration-200 hover:scale-110">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                    {profile.name}
                  </h1>
                  {profile.verified && (
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-purple-300 font-medium mb-1">{profile.role}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {profile.rating}
                  </span>
                  <span>{profile.totalStudents} students</span>
                  <span>Since {profile.joinDate}</span>
                </div>
              </div>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </div>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105"
                >
                  <X className="w-4 h-4 inline mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <TrendingUp className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors duration-300" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 mb-8 shadow-xl">
          <div className="flex gap-2 overflow-x-auto">
            {['overview', 'subjects', 'schedule', 'documents', 'current-sessions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab === 'schedule' && <CalendarDays className="w-4 h-4 inline mr-2" />}
                {tab === 'current-sessions' && <Calendar className="w-4 h-4 inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <OverView profile={profile} isEditing={isEditing} onSendData={handleProfileDataFromOverview}/>
        )}

        {activeTab === 'subjects' && (
        <Subjects subjects={subjects} isEditing={isEditing} onRemoveSubject={removeSubject} newSubject={newSubject} onAddSubject={handleAddNewSubject} onClickAddSubject={addSubject}/>
        )}

        {activeTab === 'schedule' && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <CalendarDays className="w-6 h-6 text-purple-400" />
                Teaching Schedule
              </h2>
              {isEditing && (
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add Session
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-8 gap-2 mb-4">
                  <div className="p-3 font-semibold text-purple-300 text-center">Time</div>
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-3 font-semibold text-purple-300 text-center">
                      {day.slice(0, 3)}
                    </div>
                  ))}
                </div>

                {timeSlots.map(time => (
                  <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                    <div className="p-3 text-sm text-gray-400 text-center bg-white/5 rounded-lg border border-white/10">
                      {time}
                    </div>
                    {daysOfWeek.map(day => {
                      const session = schedule[day]?.[time];
                      return (
                        <div key={`${day}-${time}`} className="relative group">
                          {session ? (
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${getSessionColor(session.type)} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}>
                              <div className="flex items-center justify-between mb-1">
                                <div className="font-semibold text-xs truncate">{session.subject}</div>
                                {isEditing && (
                                  <button
                                    onClick={() => removeScheduleSession(day, time)}
                                    className="w-4 h-4 bg-red-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                                  >
                                    <X className="w-2 h-2" />
                                  </button>
                                )}
                              </div>
                              <div className="flex items-center gap-1 text-xs opacity-90 mb-1">
                                {session.type === 'online' ? (
                                  <Video className="w-3 h-3" />
                                ) : (
                                  <MapPin className="w-3 h-3" />
                                )}
                                <span>{session.duration}h</span>
                              </div>
                              <div className="text-xs opacity-80">
                                {session.students} students
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`p-3 h-20 rounded-lg border-2 border-dashed border-white/10 hover:border-purple-400/50 transition-all duration-300 ${
                                isEditing ? 'cursor-pointer hover:bg-white/5' : ''
                              }`}
                              onClick={() => {
                                if (isEditing) {
                                  setNewSession({...newSession, day, time});
                                  setShowScheduleModal(true);
                                }
                              }}
                            >
                              {isEditing && (
                                <div className="flex items-center justify-center h-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                                  <Plus className="w-4 h-4 text-purple-400" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="font-semibold text-purple-300 mb-3">This Week</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Sessions:</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => total + Object.keys(day).length, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Hours:</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.values(day).reduce((dayTotal, session) => dayTotal + session.duration, 0), 0
                      )}h
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Students:</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.values(day).reduce((dayTotal, session) => dayTotal + session.students, 0), 0
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="font-semibold text-purple-300 mb-3">Session Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    <span className="text-gray-400">Online Sessions</span>
                    <span className="font-semibold ml-auto">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.values(day).filter(session => session.type === 'online').length, 0
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                    <span className="text-gray-400">In-Person Sessions</span>
                    <span className="font-semibold ml-auto">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.values(day).filter(session => session.type === 'in-person').length, 0
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="font-semibold text-purple-300 mb-3">Peak Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Morning (8-12):</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.keys(day).filter(time => parseInt(time.split(':')[0]) >= 8 && parseInt(time.split(':')[0]) < 12).length, 0
                      )} sessions
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Afternoon (12-17):</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.keys(day).filter(time => parseInt(time.split(':')[0]) >= 12 && parseInt(time.split(':')[0]) < 17).length, 0
                      )} sessions
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Evening (17-21):</span>
                    <span className="font-semibold">
                      {Object.values(schedule).reduce((total, day) => 
                        total + Object.keys(day).filter(time => parseInt(time.split(':')[0]) >= 17 && parseInt(time.split(':')[0]) <= 21).length, 0
                      )} sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <Documents isEditing={isEditing} documents={documents} newDoc={newDoc} onSetNewDoc={handleSetNewDoc} onRemoveDoc={removeDocument} OnAddDocument={addDocument}/>
        )}

      
      </div>

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-purple-300">Add Teaching Session</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 text-sm font-semibold mb-2">Day</label>
                  <select
                    value={newSession.day}
                    onChange={(e) => setNewSession({...newSession, day: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-purple-300 text-sm font-semibold mb-2">Time</label>
                  <select
                    value={newSession.time}
                    onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time} disabled={isTimeSlotOccupied(newSession.day, time)}>
                        {time} {isTimeSlotOccupied(newSession.day, time) ? '(Occupied)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  value={newSession.subject}
                  onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                  placeholder="Enter subject name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-300 text-sm font-semibold mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={newSession.duration}
                    onChange={(e) => setNewSession({...newSession, duration: parseFloat(e.target.value)})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-purple-300 text-sm font-semibold mb-2">Students</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={newSession.students}
                    onChange={(e) => setNewSession({...newSession, students: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-300 text-sm font-semibold mb-2">Session Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNewSession({...newSession, type: 'online'})}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      newSession.type === 'online'
                        ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                        : 'border-white/20 hover:border-blue-400/50'
                    }`}
                  >
                    <Video className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-semibold">Online</div>
                  </button>
                  <button
                    onClick={() => setNewSession({...newSession, type: 'in-person'})}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      newSession.type === 'in-person'
                        ? 'border-green-500 bg-green-500/20 text-green-300'
                        : 'border-white/20 hover:border-green-400/50'
                    }`}
                  >
                    <MapPin className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-sm font-semibold">In-Person</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={addScheduleSession}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                Add Session
              </button>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}