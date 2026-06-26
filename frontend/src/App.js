import './App.css';
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [schoolUrl, setSchoolUrl] = useState('');
  const [brandScore, setBrandScore] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Enrollment', startDate: '2026-06-01', endDate: '2026-07-15', channel: 'Social Media', status: 'Active' },
    { id: 2, name: 'Open Day Campaign', startDate: '2026-05-01', endDate: '2026-05-30', channel: 'Email', status: 'Completed' },
  ]);

  const analyzeBrand = () => {
    if (!schoolUrl.trim()) {
      alert('Please enter a school URL!');
      return;
    }
    
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60; // 60-100
      setBrandScore(score);
      setAnalysisResult({
        visualIdentity: Math.floor(Math.random() * 40) + 60,
        messaging: Math.floor(Math.random() * 40) + 60,
        onlinePresence: Math.floor(Math.random() * 40) + 60,
        engagement: Math.floor(Math.random() * 40) + 60,
        recommendations: [
          'Update your logo to be more modern and scalable',
          'Add a clear call-to-action on your homepage',
          'Improve your social media presence with regular posts',
          'Add student testimonials to build trust',
          'Create a consistent color scheme across all platforms'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  const generateContent = () => {
    const posts = [
      { platform: 'Instagram', content: '📚 Discover what makes our school special! Schedule a tour today and see our students in action. #SchoolBranding #Education #FutureLeaders' },
      { platform: 'Facebook', content: '🎓 We are proud to announce our new academic programs! Enroll now for the upcoming session and give your child the best education. Contact us for more information.' },
      { platform: 'Twitter', content: '🏫 Our school is more than just a building - it\'s a community. Join us for our upcoming open day and experience the difference. #Education #SchoolCommunity #Learning' },
      { platform: 'LinkedIn', content: '💡 How is your school building its brand in 2026? Our latest strategies are helping schools stand out. Let\'s connect and share ideas! #SchoolMarketing #EducationLeadership' },
      { platform: 'Email', content: '📧 Subject: Enroll Now for the 2026 Session!\n\nDear Parents,\n\nWe are excited to announce our new programs for the 2026 academic session. With a focus on innovation and excellence, your child will thrive at our school.\n\nVisit our website or contact us to schedule a tour today.\n\nBest regards,\nThe Admissions Team' }
    ];
    setGeneratedContent(posts);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#2e7d32';
    if (score >= 60) return '#e65100';
    return '#c62828';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return '#e8f5e9';
    if (score >= 60) return '#fff3e0';
    return '#fce4ec';
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img 
            src="https://labelreach.com/wp-content/uploads/2025/09/LabelReach-llogo.webp" 
            alt="LabelReach Logo" 
            className="header-logo"
          />
          <div>
            <h1>School Branding & Marketing Toolkit</h1>
            <p>Grow Your School's Brand with AI-Powered Insights</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <button className={activeTab === 'dashboard' ? 'nav-active' : ''} onClick={() => setActiveTab('dashboard')}>
          📊 Dashboard
        </button>
        <button className={activeTab === 'analyze' ? 'nav-active' : ''} onClick={() => setActiveTab('analyze')}>
          🔍 Brand Scorecard
        </button>
        <button className={activeTab === 'content' ? 'nav-active' : ''} onClick={() => setActiveTab('content')}>
          ✍️ Content Generator
        </button>
        <button className={activeTab === 'campaigns' ? 'nav-active' : ''} onClick={() => setActiveTab('campaigns')}>
          📈 Campaign Tracker
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{brandScore ? brandScore : '—'}</h3>
                <p>Brand Score</p>
              </div>
              <div className="stat-card">
                <h3>{campaigns.filter(c => c.status === 'Active').length}</h3>
                <p>Active Campaigns</p>
              </div>
              <div className="stat-card">
                <h3>{campaigns.length}</h3>
                <p>Total Campaigns</p>
              </div>
              <div className="stat-card">
                <h3>{generatedContent.length}</h3>
                <p>Content Generated</p>
              </div>
            </div>

            <div className="recent-content">
              <h2>📋 Recent Campaigns</h2>
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Channel</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(campaign => (
                    <tr key={campaign.id}>
                      <td>{campaign.name}</td>
                      <td>{campaign.startDate}</td>
                      <td>{campaign.endDate}</td>
                      <td><span className="type-badge">{campaign.channel}</span></td>
                      <td>
                        <span className={`status-${campaign.status.toLowerCase()}`}>
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ANALYZE TAB */}
        {activeTab === 'analyze' && (
          <div className="analyze-container">
            <h2>🔍 School Brand Scorecard</h2>
            <p className="subtitle">Enter your school URL to get a comprehensive brand analysis</p>
            
            <div className="analyze-form">
              <input
                type="url"
                className="analyze-input"
                placeholder="Enter school URL (e.g., https://yourschool.com)"
                value={schoolUrl}
                onChange={(e) => setSchoolUrl(e.target.value)}
              />
              <button className="btn-primary" onClick={analyzeBrand} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Brand'}
              </button>
            </div>

            {loading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Analyzing your school's brand presence...</p>
              </div>
            )}

            {analysisResult && brandScore && (
              <div className="analysis-results">
                <div className="score-overview">
                  <div className="score-circle" style={{
                    background: `conic-gradient(${getScoreColor(brandScore)} ${brandScore}%, #e0e0e0 ${brandScore}%)`
                  }}>
                    <span className="score-number">{brandScore}</span>
                    <span className="score-label">Overall Score</span>
                  </div>
                </div>

                <div className="score-details">
                  <h3>Breakdown</h3>
                  {Object.entries(analysisResult).filter(([key]) => key !== 'recommendations').map(([key, value]) => (
                    <div className="score-item" key={key}>
                      <span className="score-item-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="score-bar">
                        <div className="score-bar-fill" style={{
                          width: `${value}%`,
                          background: getScoreColor(value)
                        }}></div>
                      </div>
                      <span className="score-item-value">{value}%</span>
                    </div>
                  ))}
                </div>

                <div className="recommendations">
                  <h3>💡 Recommendations</h3>
                  <ul>
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENT GENERATOR TAB */}
        {activeTab === 'content' && (
          <div className="content-generator-container">
            <h2>✍️ Marketing Content Generator</h2>
            <p className="subtitle">Generate ready-to-use marketing content for your school</p>
            
            <button className="btn-primary" onClick={generateContent}>
              🚀 Generate Content
            </button>

            {generatedContent.length > 0 && (
              <div className="generated-content-list">
                {generatedContent.map((item, index) => (
                  <div className="content-card" key={index}>
                    <h4>{item.platform}</h4>
                    <p>{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAMPAIGN TRACKER TAB */}
        {activeTab === 'campaigns' && (
          <div className="campaign-container">
            <h2>📈 Campaign Tracker</h2>
            <p className="subtitle">Track your marketing campaigns</p>
            
            <div className="campaign-grid">
              {campaigns.map(campaign => (
                <div className="campaign-card" key={campaign.id}>
                  <h4>{campaign.name}</h4>
                  <p>📅 {campaign.startDate} - {campaign.endDate}</p>
                  <p>📢 {campaign.channel}</p>
                  <span className={`status-${campaign.status.toLowerCase()}`}>{campaign.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 School Branding & Marketing Toolkit | Built for LabelReach</p>
      </footer>
    </div>
  );
}

export default App;