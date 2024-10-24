import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const AlertCircle = () => <span>🔔</span>;
const MessageCircle = () => <span>💬</span>;
const TrendingUp = () => <span>📈</span>;
const Upload = () => <span>📤</span>;
const Clock = () => <span>🕒</span>;
const Users = () => <span>👥</span>;

const Card = ({ children }) => (
  <div className="border rounded-lg shadow-lg p-4 bg-white">{children}</div>
);
const CardHeader = ({ title, icon }) => (
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-lg">{title}</h3>
    {icon}
  </div>
);
const CardContent = ({ children }) => (
  <div className="mt-2">{children}</div>
);
const Button = ({ children, onClick }) => (
  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={onClick}>
    {children}
  </button>
);
const Alert = ({ title, description }) => (
  <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-lg mt-4">
    <strong>{title}</strong>
    <p>{description}</p>
  </div>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ChatAnalysisDashboard = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  // Simulated real-time data update
  useEffect(() => {
    const interval = setInterval(() => {
      if (analysisData) {
        setAnalysisData(prevData => ({
          ...prevData,
          totalMessages: prevData.totalMessages + Math.floor(Math.random() * 5),
          sentimentScore: (prevData.sentimentScore + (Math.random() * 0.2 - 0.1)).toFixed(2),
          messageHistory: [
            ...prevData.messageHistory.slice(1),
            { time: new Date().toLocaleTimeString(), count: prevData.messageHistory[prevData.messageHistory.length - 1].count + Math.floor(Math.random() * 5) }
          ]
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [analysisData]);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      setFile(uploadedFile);
      setLoading(true);
      setError(null);

      setTimeout(() => {
        setLoading(false);
        setAnalysisData({
          totalMessages: 1234,
          sentimentScore: 7.5,
          topTopic: 'Product Discussion',
          sentimentData: [
            { name: 'Positive', value: 60 },
            { name: 'Neutral', value: 30 },
            { name: 'Negative', value: 10 },
          ],
          topicsData: [
            { name: 'Product Discussion', count: 120 },
            { name: 'Customer Support', count: 80 },
            { name: 'Feature Requests', count: 60 },
            { name: 'Bug Reports', count: 40 },
            { name: 'General Inquiries', count: 20 },
          ],
          messageHistory: Array(10).fill().map((_, i) => ({
            time: new Date(Date.now() - (9 - i) * 60000).toLocaleTimeString(),
            count: Math.floor(Math.random() * 50) + 50
          })),
          activeUsers: 42,
          averageResponseTime: '2.5 minutes'
        });
      }, 2000);
    } else {
      setError("Failed to upload the file. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Chat Analysis Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader title="Total Messages" icon={<MessageCircle />} />
          <CardContent>
            <div className="text-2xl font-bold">{analysisData?.totalMessages || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Sentiment Score" icon={<TrendingUp />} />
          <CardContent>
            <div className="text-2xl font-bold">{analysisData?.sentimentScore || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Top Topic" icon={<AlertCircle />} />
          <CardContent>
            <div className="text-2xl font-bold">{analysisData?.topTopic || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Active Users" icon={<Users />} />
          <CardContent>
            <div className="text-2xl font-bold">{analysisData?.activeUsers || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Avg. Response Time" icon={<Clock />} />
          <CardContent>
            <div className="text-2xl font-bold">{analysisData?.averageResponseTime || 'N/A'}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="Data Source" icon={<Upload />} />
          <CardContent>
            <div className="text-sm text-gray-600">Upload chat data</div>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="chat-data-upload"
            />
            <label htmlFor="chat-data-upload">
              <Button>Choose File</Button>
            </label>
            {file && <div className="mt-2 text-sm">{file.name}</div>}
            {loading && <div className="mt-2 text-sm text-blue-600">Analyzing data...</div>}
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
          </CardContent>
        </Card>
      </div>

      {analysisData && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader title="Sentiment Analysis" icon={null} />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analysisData.sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analysisData.sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader title="Top Topics" icon={null} />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analysisData.topicsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader title="Message Volume Over Time" icon={null} />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analysisData.messageHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}

      <Alert 
        title="Real-time Updates" 
        description="This dashboard now simulates real-time updates. Data refreshes every 5 seconds when a file is uploaded." 
      />
    </div>
  );
};

export default ChatAnalysisDashboard;
