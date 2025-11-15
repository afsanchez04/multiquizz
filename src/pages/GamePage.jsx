import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PREGUNTAS_POR_INGENIERIA } from '../data/preguntas';
import './GamePage.css';

function GamePage() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const ingenieriaSeleccionada = localStorage.getItem('ingenieriaSeleccionada') || 'multimedia';

  useEffect(() => {
    // Cargar las preguntas de la ingeniería seleccionada
    const preguntasIngenieria = PREGUNTAS_POR_INGENIERIA[ingenieriaSeleccionada] || [];
    setPreguntas(preguntasIngenieria);
  }, [ingenieriaSeleccionada]);

  const pregunta = preguntas[preguntaActual];

  const handleRespuesta = (indice) => {
    if (mostrarResultado) return;
    
    setRespuestaSeleccionada(indice);
    setMostrarResultado(true);

    if (indice === pregunta.correcta) {
      setPuntos(puntos + 100);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
      setRespuestaSeleccionada(null);
      setMostrarResultado(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  const volverASeleccion = () => {
    navigate('/select-ingenieria');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('ingenieriaSeleccionada');
    navigate('/');
  };

  if (preguntas.length === 0) {
    return (
      <div className="game-container">
        <div className="game-results fade-in">
          <h1>⚠️ No hay preguntas disponibles</h1>
          <p>No se encontraron preguntas para {ingenieriaSeleccionada}</p>
          <button onClick={volverASeleccion} className="btn btn-primary">
            Volver a seleccionar ingeniería
          </button>
        </div>
      </div>
    );
  }

  if (juegoTerminado) {
    return (
      <div className="game-container">
        <div className="game-results fade-in">
          <h1>🎉 ¡Juego Terminado!</h1>
          <div className="ingenieria-completada">
            <h2>Ingeniería {ingenieriaSeleccionada}</h2>
          </div>
          <div className="final-score">
            <span className="score-label">Puntuación Final</span>
            <span className="score-value">{puntos}</span>
          </div>
          <p className="result-message">
            {puntos >= 200 ? "¡Excelente! Eres un experto 🏆" : 
             puntos >= 100 ? "¡Buen trabajo! Sigue practicando 💪" :
             "Sigue aprendiendo, tú puedes 📚"}
          </p>
          <div className="result-actions">
            <button onClick={volverASeleccion} className="btn btn-primary">
              🔄 Otra Ingeniería
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              🚪 Salir
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">🎓 MultiQuiz</div>
            <div className="user-info">
              <span className="user-name">👤 {user.nombre}</span>
              <span className="score">⭐ {puntos} pts</span>
              <button onClick={handleLogout} className="btn-logout">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <main className="game-main">
        <div className="container">
          <div className="question-card fade-in">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
              ></div>
            </div>

            <div className="question-header">
              <span className={`category badge-${ingenieriaSeleccionada}`}>
                {ingenieriaSeleccionada}
              </span>
              <span className="question-number">
                Pregunta {preguntaActual + 1} de {preguntas.length}
              </span>
            </div>

            <h2 className="question-text">{pregunta.pregunta}</h2>

            <div className="options-grid">
              {pregunta.opciones.map((opcion, indice) => (
                <button
                  key={indice}
                  onClick={() => handleRespuesta(indice)}
                  disabled={mostrarResultado}
                  className={`option-btn ${
                    mostrarResultado
                      ? indice === pregunta.correcta
                        ? 'correct'
                        : indice === respuestaSeleccionada
                        ? 'incorrect'
                        : ''
                      : respuestaSeleccionada === indice
                      ? 'selected'
                      : ''
                  }`}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + indice)}
                  </span>
                  <span className="option-text">{opcion}</span>
                  {mostrarResultado && indice === pregunta.correcta && (
                    <span className="check-icon">✓</span>
                  )}
                  {mostrarResultado && indice === respuestaSeleccionada && indice !== pregunta.correcta && (
                    <span className="cross-icon">✗</span>
                  )}
                </button>
              ))}
            </div>

            {mostrarResultado && (
              <div className="explanation fade-in">
                <p><strong>💡 Explicación:</strong> {pregunta.explicacion}</p>
                <button onClick={siguientePregunta} className="btn btn-primary">
                  {preguntaActual < preguntas.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados 🏆'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default GamePage;