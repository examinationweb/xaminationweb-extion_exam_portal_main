import React from 'react';
import { Play, Video } from 'lucide-react';

interface ExamCodeInputProps {
  examCode: string;
  meetCode: string;
  onExamCodeChange: (code: string) => void;
  onMeetCodeChange: (code: string) => void;
  onJoinExam: () => void;
  onJoinMeet: () => void;
}

export default function ExamCodeInput({
  examCode,
  meetCode,
  onExamCodeChange,
  onMeetCodeChange,
  onJoinExam,
  onJoinMeet
}: ExamCodeInputProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter exam code"
          value={examCode}
          onChange={(e) => onExamCodeChange(e.target.value)}
          className="w-64 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button
          onClick={onJoinExam}
          className="flex items-center gap-2 bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
        >
          <Play className="w-4 h-4" />
          Join Examination
        </button>
        <input
          type="text"
          placeholder="Enter meet code"
          value={meetCode}
          onChange={(e) => onMeetCodeChange(e.target.value)}
          className="w-64 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <button
          onClick={onJoinMeet}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Video className="w-4 h-4" />
          Join Google Meet
        </button>
      </div>
    </div>
  );
}