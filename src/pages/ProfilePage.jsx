import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const AVATARES_DISPONIBLES = ['👤', '👨‍💻', '👩‍💻', '🧑‍🎓', '👨‍🏫', '👩‍🏫', '🦸', '🦹', '🧙', '🧑‍🚀'];

const NOMBRES_INGENIERIAS = {
  multimedia: 'Multimedia',
  software: 'Software',
  civil: 'Civil',
  mecatronica: 'Mecatrónica',
  ambiental: 'Ambiental'
};

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoAvatar, setNuevoAvatar] = useState('');
  const [mostrarModalCertificado, setMostrarModalCertificado] = useState(false);
  const [ingenieriaSeleccionadaModal, setIngenieriaSeleccionadaModal] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userData.email) {
      navigate('/');
      return;
    }
    setUser(userData);
    setNuevoNombre(userData.nombre || '');
    setNuevoAvatar(userData.avatar || '👤');
  }, [navigate]);

  const guardarCambios = () => {
    const updatedUser = {
      ...user,
      nombre: nuevoNombre,
      avatar: nuevoAvatar
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditando(false);
  };

  const descargarCertificado = (ingenieria) => {
    setIngenieriaSeleccionadaModal(ingenieria);
    setMostrarModalCertificado(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return <div className="loading">Cargando perfil...</div>;

  const ingenieriasCompletadas = Object.values(user.progresoIngenierias || {}).filter(i => i.completada).length;
  const progresoTotal = Math.round((ingenieriasCompletadas / 5) * 100);

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={() => navigate('/select-ingenieria')}>
              🎓 MultiQuiz
            </div>
            <div className="header-actions">
              <button onClick={() => navigate('/select-ingenieria')} className="btn-secondary">
                🎮 Jugar
              </button>
              <button onClick={handleLogout} className="btn-logout">
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="profile-main">
        <div className="container">

          {/* Tarjeta de identidad */}
          <div className="profile-identity fade-in">
            <div className="identity-left">
              <div className="avatar-display">
                {editando ? (
                  <div className="avatar-selector">
                    {AVATARES_DISPONIBLES.map(av => (
                      <button
                        key={av}
                        className={`avatar-option ${nuevoAvatar === av ? 'selected' : ''}`}
                        onClick={() => setNuevoAvatar(av)}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="avatar-icon">{user.avatar || '👤'}</span>
                )}
              </div>

              <div className="identity-info">
                {editando ? (
                  <input
                    type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="edit-input"
                    placeholder="Tu nombre"
                  />
                ) : (
                  <h1>{user.nombre}</h1>
                )}
                <p className="user-email">{user.email}</p>
                <div className="level-badge">Nivel {user.nivel || 1}</div>
              </div>
            </div>

            <div className="identity-actions">
              {editando ? (
                <>
                  <button onClick={guardarCambios} className="btn btn-primary">Guardar</button>
                  <button onClick={() => setEditando(false)} className="btn btn-secondary">Cancelar</button>
                </>
              ) : (
                <button onClick={() => setEditando(true)} className="btn btn-secondary">
                  ✏️ Editar Perfil
                </button>
              )}
            </div>
          </div>

          {/* Estadísticas principales */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{user.xpTotal || 0}</div>
              <div className="stat-label">Experiencia Total</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">{user.partidasJugadas || 0}</div>
              <div className="stat-label">Partidas Jugadas</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">{user.mejorPuntuacion || 0}</div>
              <div className="stat-label">Mejor Puntuación</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📜</div>
              <div className="stat-value">{(user.certificados || []).length}</div>
              <div className="stat-label">Certificados</div>
            </div>
          </div>

          {/* Progreso por ingeniería */}
          <div className="section">
            <h2>📊 Progreso por Ingeniería</h2>
            <div className="progreso-total">
              <div className="progreso-bar">
                <div className="progreso-fill" style={{ width: `${progresoTotal}%` }}></div>
              </div>
              <span>{progresoTotal}% Completado</span>
            </div>

            <div className="ingenierias-progress">
              {Object.entries(user.progresoIngenierias || {}).map(([key, data]) => {
                const porcentaje = data.completada ? 100 : Math.min((data.mejorScore / 1000) * 100, 99);

                return (
                  <div key={key} className="ingenieria-progress-card">
                    <div className="ing-header">
                      <h3>{NOMBRES_INGENIERIAS[key]}</h3>
                      {data.completada && <span className="badge-completado">✓ Completada</span>}
                    </div>

                    <div className="ing-stats">
                      <span>Mejor puntaje: <strong>{data.mejorScore}</strong></span>
                      <span>Intentos: <strong>{data.intentos}</strong></span>
                    </div>

                    <div className="progreso-bar-small">
                      <div
                        className={`progreso-fill-${key}`}
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Logros */}
          <div className="section">
            <h2>🏅 Logros Desbloqueados ({(user.logros || []).length})</h2>
            <div className="logros-grid">
              {(user.logros || []).map(logro => (
                <div key={logro.id} className="logro-card">
                  <div className="logro-icon">{logro.icono}</div>
                  <h4>{logro.nombre}</h4>
                  <p>{logro.descripcion}</p>
                  <small>{new Date(logro.fechaDesbloqueo).toLocaleDateString()}</small>
                </div>
              ))}

              {(user.logros || []).length === 0 && (
                <p className="empty-state">Aún no has desbloqueado logros. ¡Sigue jugando!</p>
              )}
            </div>
          </div>

          {/* Certificados */}
          <div className="section">
            <h2>📜 Certificados Digitales</h2>
            <div className="certificados-grid">
              {(user.certificados || []).map((cert, index) => (
                <div key={index} className="certificado-card">
                  <div className="certificado-header">
                    <h3>🎓 Certificado de {NOMBRES_INGENIERIAS[cert.ingenieria]}</h3>
                    <span className="certificado-fecha">
                      {new Date(cert.fecha).toLocaleDateString()}
                    </span>
                  </div>
                  <p>Puntaje: <strong>{cert.puntaje} pts</strong></p>
                  <button
                    onClick={() => descargarCertificado(cert.ingenieria)}
                    className="btn btn-primary btn-small"
                  >
                    📥 Descargar
                  </button>
                </div>
              ))}

              {(user.certificados || []).length === 0 && (
                <p className="empty-state">
                  Completa una ingeniería con puntaje perfecto para obtener tu certificado.
                </p>
              )}
            </div>
          </div>

        </div>

      </main>
      {mostrarModalCertificado && (
        <div className="modal-overlay">
          <div className="modal-content fade-in">
            <h2>📜 Certificado listo</h2>
            <p>
              Descargando tu certificado de <strong>{NOMBRES_INGENIERIAS[ingenieriaSeleccionadaModal]}...</strong> 
            </p>

            <button
              className="btn btn-primary"
              onClick={() => setMostrarModalCertificado(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>


  );
}

export default ProfilePage;