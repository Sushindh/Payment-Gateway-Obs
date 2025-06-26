import { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [logs, setLogs] = useState([]);

  const simulateError = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.post('http://localhost:8000/admin');
      
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        message: 'Error simulation triggered',
        response: response.data
      }]);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to simulate error'
      });
      setLogs(prev => [...prev, {
        timestamp: new Date().toISOString(),
        message: 'Error simulation failed',
        error: error.message
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Error Simulation</h2>
        <button
          onClick={simulateError}
          disabled={loading}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Simulating...' : 'Simulate Error'}
        </button>

        {message.text && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Logs</h2>
        <div className="space-y-4">
          {logs.map((log, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="text-sm text-gray-500">
                {new Date(log.timestamp).toLocaleString()}
              </div>
              <div className="mt-1 text-sm text-gray-900">
                {log.message}
              </div>
              {log.response && (
                <pre className="mt-2 text-xs bg-gray-50 p-2 rounded">
                  {JSON.stringify(log.response, null, 2)}
                </pre>
              )}
              {log.error && (
                <div className="mt-2 text-sm text-red-600">
                  Error: {log.error}
                </div>
              )}
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-500 text-center py-4">
              No logs available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 