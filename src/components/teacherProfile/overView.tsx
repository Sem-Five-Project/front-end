
import React, { useState } from 'react';
import { User, Mail, DollarSign } from 'lucide-react';


export default function TeacherProfileOverview(props:any) {
    const { profile, isEditing, onSendData } = props;
  return (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-purple-400" />
                  About Me
                </h2>
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-purple-300 text-sm font-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => onSendData({...profile, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-300 text-sm font-semibold mb-2">Hourly Rate</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                          <input
                            type="number"
                            value={profile.hourlyRate}
                            onChange={(e) => onSendData({...profile, hourlyRate: parseInt(e.target.value)})}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-purple-300 text-sm font-semibold mb-2">Professional Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => onSendData({...profile, bio: e.target.value})}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-none"
                        placeholder="Tell students about your teaching philosophy, experience, and what makes your classes special..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <div className="font-semibold">{profile.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-sm text-gray-400">Hourly Rate</div>
                          <div className="font-semibold">${profile.hourlyRate}/hour</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-xl">
                      <h3 className="font-semibold text-purple-300 mb-3">Professional Bio</h3>
                      <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </div>
  );
}