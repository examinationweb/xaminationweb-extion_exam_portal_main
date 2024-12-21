// ... existing imports

export default function Dashboard() {
  // ... existing state

  const handleVerification = async () => {
    if (!isEmailVerified) {
      try {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user?.email,
        });

        if (error) throw error;
        toast.success('Verification email sent! Please check your inbox.');
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  // ... rest of the component

  return (
    <div className="min-h-screen bg-gray-100">
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
          <div className="flex items-center gap-4">
            <button
              onClick={handleVerification}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-500"
            >
              <Mail className="w-5 h-5" />
              Verify Account
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
            >
              <span className="text-lg font-semibold text-purple-600">
                {user?.user_metadata?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ... rest of the component */}
    </div>
  );
}