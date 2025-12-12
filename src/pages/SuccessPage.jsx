export default function SuccessPage({ name, onRestart }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-12 text-center max-w-lg w-full">
        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Registration Successful!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Welcome, <span className="font-semibold">{name}</span> 🎊
        </p>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
        >
          Start New Registration
        </button>
      </div>
    </div>
  );
}
