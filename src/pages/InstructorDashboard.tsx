// ... existing imports

export default function InstructorDashboard() {
  // ... existing state

  const handleDeleteExam = (examId: string) => {
    setExams(exams.filter(exam => exam.id !== examId));
    toast.success('Examination deleted successfully');
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="src/components/image/logonew.png"
              alt="Extion Logo"
              className="h-12"
            />
            <h1 className="text-2xl font-bold text-purple-600">Extion Examination Portal</h1>
          </div>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
          >
            <span className="text-lg font-semibold text-purple-600">
              {instructor?.name?.[0]?.toUpperCase() || 'I'}
            </span>
          </button>
        </div>
      </header>

      {/* ... rest of the component */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onEdit={() => {/* ... */}}
            onShowCode={() => {/* ... */}}
            onDelete={() => handleDeleteExam(exam.id)}
          />
        ))}
      </div>
    </div>
  );
}