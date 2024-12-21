import React, { useState } from 'react';
import { X } from 'lucide-react';
import { generateExamCode } from '../../utils/examUtils';

interface ConductExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function ConductExamModal({
  isOpen,
  onClose,
  onSubmit
}: ConductExamModalProps) {
  const [examData, setExamData] = useState({
    name: '',
    totalMarks: '',
    numberOfQuestions: '',
    meetLink: ''
  });
  const [showCode, setShowCode] = useState(false);
  const [examCode, setExamCode] = useState('');

  const handleSubmit = () => {
    const code = generateExamCode();
    setExamCode(code);
    setShowCode(true);
  };

  const handleFrameQuestions = () => {
    onSubmit({
      ...examData,
      code: examCode,
      questions: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Conduct Examination</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showCode ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Examination Name"
              className="w-full p-3 border rounded-lg"
              value={examData.name}
              onChange={(e) => setExamData({ ...examData, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Total Marks"
              className="w-full p-3 border rounded-lg"
              value={examData.totalMarks}
              onChange={(e) => setExamData({ ...examData, totalMarks: e.target.value })}
            />

            <input
              type="number"
              placeholder="Number of Questions"
              className="w-full p-3 border rounded-lg"
              value={examData.numberOfQuestions}
              onChange={(e) => setExamData({ ...examData, numberOfQuestions: e.target.value })}
            />

            <input
              type="text"
              placeholder="Google Meet Link"
              className="w-full p-3 border rounded-lg"
              value={examData.meetLink}
              onChange={(e) => setExamData({ ...examData, meetLink: e.target.value })}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Generate Exam Code
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Examination Code</h3>
              <p className="text-2xl font-mono text-center">{examCode}</p>
            </div>

            <button
              onClick={handleFrameQuestions}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Frame Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}