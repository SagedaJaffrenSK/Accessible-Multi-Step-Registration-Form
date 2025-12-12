export default function SuccessPage({ name, onRestart }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">

        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Registration Successful!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Welcome, <span className="font-semibold">{name}</span> 🎊  
        </p>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold shadow-md transition"
        >
          Start New Registration
        </button>

      </div>
    </div>
  );
}
