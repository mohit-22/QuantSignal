export default function MongoDBError() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">
            MongoDB Atlas Connection Blocked
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Your IP address needs to be whitelisted in MongoDB Atlas to connect to the database.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg mb-8 text-left">
          <h2 className="text-xl font-semibold mb-4 text-green-400">📋 How to Fix:</h2>
          <ol className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <span>Go to <a href="https://cloud.mongodb.com" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a> and login</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <span>Navigate to <strong>Network Access</strong> → <strong>IP Access List</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <span>Click <strong>"Add IP Address"</strong></span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
              <span>Add <code className="bg-gray-700 px-2 py-1 rounded">0.0.0.0/0</code> (Allow Access from Anywhere) OR your current IP address</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">5</span>
              <span>Click <strong>"Confirm"</strong></span>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-900 border border-yellow-600 p-4 rounded-lg mb-8">
          <h3 className="font-semibold text-yellow-400 mb-2">⚠️ Security Note:</h3>
          <p className="text-yellow-200 text-sm">
            For development, <code className="bg-yellow-800 px-1 rounded">0.0.0.0/0</code> allows access from anywhere.
            For production, restrict to specific IP addresses only.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/"
            className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            🔄 Try Again After Whitelisting
          </a>

          <a
            href="https://cloud.mongodb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            🚀 Go to MongoDB Atlas
          </a>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>Need help? Check the console for more detailed error information.</p>
        </div>
      </div>
    </div>
  );
}
