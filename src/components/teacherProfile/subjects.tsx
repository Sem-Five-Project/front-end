
import { BookOpen, Plus, X } from "lucide-react";
import React from "react"

export default function TeacherProfileOverview(props:any) {

    const { subjects, isEditing, newSubject,onRemoveSubject,onAddSubject,onClickAddSubject } = props;

    return (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                   <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                     <BookOpen className="w-6 h-6 text-purple-400" />
                     Teaching Subjects
                   </h2>
                   
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                     {subjects.map((subject:any, index:any) => (
                       <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                         <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-80`}></div>
                         <div className="relative p-6 text-white">
                           <div className="flex justify-between items-start mb-4">
                             <h3 className="font-bold text-lg">{subject.name}</h3>
                             {isEditing && (
                               <button
                                 onClick={() => onRemoveSubject(index)}
                                 className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/30"
                               >
                                 <X className="w-4 h-4" />
                               </button>
                             )}
                           </div>
                           <div className="space-y-2">
                             <div className="flex justify-between">
                               <span className="text-sm opacity-80">Level:</span>
                               <span className="text-sm font-semibold">{subject.level}</span>
                             </div>
                             <div className="flex justify-between">
                               <span className="text-sm opacity-80">Students:</span>
                               <span className="text-sm font-semibold">{subject.students}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
       
                   {isEditing && (
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                       <h3 className="font-semibold text-purple-300 mb-4">Add New Subject</h3>
                       <div className="grid md:grid-cols-3 gap-4">
                         <input
                           type="text"
                           value={newSubject.name}
                           onChange={(e) => onAddSubject({...newSubject, name: e.target.value})}
                           placeholder="Subject name"
                           className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                         />
                         <select
                           value={newSubject.level}
                           onChange={(e) => onAddSubject({...newSubject, level: e.target.value})}
                           className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
                         >
                           <option value="Beginner">Beginner</option>
                           <option value="Intermediate">Intermediate</option>
                           <option value="Advanced">Advanced</option>
                           <option value="Expert">Expert</option>
                         </select>
                         <button
                           onClick={onClickAddSubject}
                           className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                         >
                           <Plus className="w-4 h-4 inline mr-2" />
                           Add Subject
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
    )
}