"use client";
import {
  FileText,
  Trash2,
  Download,
  Share2,
  Plus,
  Upload,
} from "lucide-react";
import { useState, useRef } from "react";

export default function Schedule(props: any) {
  const {
    isEditing,
    documents,
    newDoc,
    onSetNewDoc,
    onRemoveDoc,
    OnAddDocument,
  } = props;
  const [hoveredDoc, setHoveredDoc] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FileText className="w-6 h-6 text-purple-400" />
        Documents & Resources
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {documents.map((doc: any) => (
          <div
            key={doc.id}
            className="group relative p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
            onMouseEnter={() => setHoveredDoc(doc.id)}
            onMouseLeave={() => setHoveredDoc(null)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-white mb-1">{doc.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full border `}>
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-400">{doc.size}</span>
                  </div>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={() => onRemoveDoc(doc.id)}
                  className="w-8 h-8 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-all duration-300 border border-blue-500/30">
                <Download className="w-3 h-3 inline mr-1" />
                Download
              </button>
              <button className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-500/30 transition-all duration-300 border border-purple-500/30">
                <Share2 className="w-3 h-3 inline mr-1" />
                Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="font-semibold text-purple-300 mb-4">
            Add New Document
          </h3>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newDoc.name}
                onChange={(e) =>
                  onSetNewDoc({ ...newDoc, name: e.target.value })
                }
                placeholder="Document name"
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
              />
              <select
                value={newDoc.type}
                onChange={(e) =>
                  onSetNewDoc({ ...newDoc, type: e.target.value })
                }
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
              >
                <option value="pdf">PDF</option>
                <option value="docx">DOCX</option>
                <option value="txt">TXT</option>
                <option value="pptx">PPTX</option>
              </select>
              <select
                value={newDoc.category}
                onChange={(e) =>
                  onSetNewDoc({ ...newDoc, category: e.target.value })
                }
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 transition-all duration-300"
              >
                <option value="General">General</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Exercises">Exercises</option>
                <option value="Assessment">Assessment</option>
                <option value="Philosophy">Philosophy</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={OnAddDocument}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Document
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Upload File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onSetNewDoc({ ...newDoc, name: file.name.split(".")[0] });
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
