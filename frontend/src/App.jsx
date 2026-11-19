import { useState, useEffect } from 'react';

const API_BASE_URL = `http://${window.location.hostname}:8080`;

function App() {
  const [health, setHealth] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchTelemetry = async () => {
    setLoading(true);
    try {
      const [healthRes, sysRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/health`),
        fetch(`${API_BASE_URL}/api/system-info`)
      ]);

      if (!healthRes.ok || !sysRes.ok) {
        throw new Error('Backend response error');
      }

      const healthData = await healthRes.json();
      const sysData = await sysRes.json();

      setHealth(healthData);
      setSystemInfo(sysData);
      setError(false);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>CloudOps Telemetry &amp; Incident Tracker</h1>
          <p style={styles.subtitle}>
            AWS EC2 + Docker Containerized Full-Stack Monitor ({API_BASE_URL})
          </p>
        </div>
        <div style={styles.actions}>
          <span
            style={{
              ...styles.badge,
              backgroundColor: error ? '#7f1d1d' : '#064e3b',
              color: error ? '#fca5a5' : '#6ee7b7',
              borderColor: error ? '#ef4444' : '#10b981'
            }}
          >
            {loading ? 'CHECKING...' : error ? 'BACKEND OFFLINE' : 'SYSTEM ONLINE'}
          </span>
          <button onClick={fetchTelemetry} style={styles.button}>
            Refresh Now
          </button>
        </div>
      </header>

      {error ? (
        <div style={styles.errorBox}>
          <h3>Unable to reach Spring Boot Backend</h3>
          <p>
            Ensure the backend container is running on port 8080 and Security Group allows inbound TCP 8080.
          </p>
        </div>
      ) : (
        <main style={styles.grid}>
          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Service Health (/api/health)</h2>
            {health ? (
              <div style={styles.list}>
                {Object.entries(health).map(([key, value]) => (
                  <div key={key} style={styles.row}>
                    <span style={styles.key}>{key}</span>
                    <span style={styles.val}>{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.muted}>Loading health metrics...</p>
            )}
          </section>

          <section style={styles.card}>
            <h2 style={styles.cardTitle}>Runtime Telemetry (/api/system-info)</h2>
            {systemInfo ? (
              <div style={styles.list}>
                {Object.entries(systemInfo).map(([key, value]) => (
                  <div key={key} style={styles.row}>
                    <span style={styles.key}>{key}</span>
                    <span style={styles.val}>{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={styles.muted}>Loading system telemetry...</p>
            )}
          </section>
        </main>
      )}

      <footer style={styles.footer}>
        Last Synced: {lastUpdated || 'Waiting...'} | Auto-refresh every 10s
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '2rem'
  },
  header: {
    maxWidth: '1000px',
    margin: '0 auto 2rem auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    borderBottom: '1px solid #1e293b',
    paddingBottom: '1.25rem'
  },
  title: { margin: 0, fontSize: '1.6rem', color: '#38bdf8' },
  subtitle: { margin: '0.35rem 0 0 0', fontSize: '0.9rem', color: '#94a3b8' },
  actions: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  badge: {
    padding: '0.4rem 0.85rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: '700',
    border: '1px solid'
  },
  button: {
    padding: '0.45rem 1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  grid: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '10px',
    padding: '1.5rem',
    border: '1px solid #334155'
  },
  cardTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
    color: '#e2e8f0',
    borderBottom: '1px solid #334155',
    paddingBottom: '0.5rem'
  },
  list: { display: 'flex', flexDirection: 'column', gap: '0.65rem' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    padding: '0.6rem 0.85rem',
    borderRadius: '6px',
    fontSize: '0.9rem'
  },
  key: { color: '#94a3b8', textTransform: 'capitalize' },
  val: { color: '#38bdf8', fontWeight: '600' },
  errorBox: {
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: '#450a0a',
    border: '1px solid #dc2626',
    padding: '1.5rem',
    borderRadius: '10px',
    color: '#fecaca'
  },
  muted: { color: '#64748b' },
  footer: {
    maxWidth: '1000px',
    margin: '2rem auto 0 auto',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#64748b'
  }
};

export default App;