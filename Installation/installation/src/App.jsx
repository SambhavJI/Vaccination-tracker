import './App.css'

function App() {
  const handleDownload = () => {
    // Replace 'app.apk' with your actual APK filename
    const link = document.createElement('a')
    link.href = '/app.apk'
    link.download = 'app.apk'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="download-container">
      <div className="download-card">
        <div className="header">
          <h1>Vaccine Tracker</h1>
          <p className="subtitle">Get started with our mobile app</p>
        </div>

        <div className="content">
          <svg className="app-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#4F46E5"/>
            <path d="M30 40C30 35 35 30 40 30H60C65 30 70 35 70 40V70C70 75 65 80 60 80H40C35 80 30 75 30 70V40Z" fill="white"/>
            <circle cx="50" cy="55" r="8" fill="#4F46E5"/>
            <rect x="48" y="48" width="4" height="14" fill="#4F46E5"/>
          </svg>

          <h2>Download Now</h2>
          <p>Download our mobile app to track your baby's vaccination schedule and never miss an appointment.</p>

          <button className="download-btn" onClick={handleDownload}>
            <span className="btn-icon">⬇︎</span>
            <span>Download APK</span>
          </button>

          <div className="app-info">
            <div className="info-item">
              <span className="info-label">Size:</span>
              <span className="info-value">85 MB</span>
            </div>
            <div className="info-item">
              <span className="info-label">Requires:</span>
              <span className="info-value">Android 8.0+</span>
            </div>
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">1.0.0</span>
            </div>
          </div>
        </div>

        <div className="features">
          <h3>Features</h3>
          <ul>
            <li>✓ Track vaccination schedule</li>
            <li>✓ Get timely reminders</li>
            <li>✓ Maintain health records</li>
            <li>✓ Multi-language support</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
