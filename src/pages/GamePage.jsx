import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PREGUNTAS_POR_INGENIERIA } from '../data/preguntas';
import './GamePage.css';

const nombresIngenieria = {
  multimedia: "Multimedia",
  software: "Software",
  civil: "Civil",
  mecatronica: "Mecatrónica",
  ambiental: "Ambiental"
};

function GamePage() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [mostrarModalNivel, setMostrarModalNivel] = useState(false);
  const [imagenNivel, setImagenNivel] = useState("");


  // ⭐ NUEVO: VIDAS
  const [vidas, setVidas] = useState(5);
  const [mostrarModalDerrota, setMostrarModalDerrota] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const ingenieriaSeleccionada = localStorage.getItem('ingenieriaSeleccionada') || 'multimedia';

  useEffect(() => {
    const preguntasIngenieria = PREGUNTAS_POR_INGENIERIA[ingenieriaSeleccionada] || [];
    setPreguntas(preguntasIngenieria);
  }, [ingenieriaSeleccionada]);

  // ⭐ NUEVO: Actualizar estadísticas del usuario cuando el juego termina
  useEffect(() => {
    if (juegoTerminado && vidas > 0) {
      actualizarEstadisticasUsuario();
    }
  }, [juegoTerminado, vidas]);

  // ⭐ Mostrar modal de niveles
  useEffect(() => {
    if (preguntaActual === 0) {
      setImagenNivel("./bienvenida.jpg");
      setMostrarModalNivel(true);
    }

    if (preguntaActual === 3) { // Pregunta 4 (índice 3)
      setImagenNivel("./nivel_medio.jpg");
      setMostrarModalNivel(true);
    }

    if (preguntaActual === 6) { // Pregunta 7 (índice 6)
      setImagenNivel("./nivel_alto.jpg");
      setMostrarModalNivel(true);
    }
  }, [preguntaActual]);


  const actualizarEstadisticasUsuario = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const ingenieria = ingenieriaSeleccionada;

    // Actualizar partidas jugadas
    user.partidasJugadas = (user.partidasJugadas || 0) + 1;

    // Actualizar partidas completadas (solo si no perdió)
    if (vidas > 0) {
      user.partidasCompletadas = (user.partidasCompletadas || 0) + 1;
    }

    // Actualizar XP total
    user.xpTotal = (user.xpTotal || 0) + puntos;

    // Actualizar mejor puntuación global
    if (puntos > (user.mejorPuntuacion || 0)) {
      user.mejorPuntuacion = puntos;
    }

    // Actualizar progreso de la ingeniería
    if (!user.progresoIngenierias) {
      user.progresoIngenierias = {};
    }

    if (!user.progresoIngenierias[ingenieria]) {
      user.progresoIngenierias[ingenieria] = { completada: false, mejorScore: 0, intentos: 0 };
    }

    user.progresoIngenierias[ingenieria].intentos += 1;

    if (puntos > user.progresoIngenierias[ingenieria].mejorScore) {
      user.progresoIngenierias[ingenieria].mejorScore = puntos;
    }

    // Marcar como completada si obtuvo puntaje perfecto
    const puntajePerfecto = preguntas.length * 100;
    if (puntos === puntajePerfecto) {
      user.progresoIngenierias[ingenieria].completada = true;

      // Agregar certificado si no existe
      if (!user.certificados) user.certificados = [];
      const certificadoExiste = user.certificados.find(c => c.ingenieria === ingenieria);

      if (!certificadoExiste) {
        user.certificados.push({
          ingenieria: ingenieria,
          fecha: new Date().toISOString(),
          puntaje: puntos
        });
      }
    }

    // Verificar logros
    verificarLogros(user);

    // Calcular nivel basado en XP
    user.nivel = Math.floor((user.xpTotal || 0) / 500) + 1;

    localStorage.setItem('user', JSON.stringify(user));
  };

  const verificarLogros = (user) => {
    if (!user.logros) user.logros = [];

    const logrosDisponibles = [
      { id: 'primera_partida', nombre: 'Primera Partida', descripcion: 'Juega tu primera partida', condicion: () => user.partidasCompletadas >= 1, icono: '🎮' },
      { id: 'perfeccionista', nombre: 'Perfeccionista', descripcion: 'Obtén un puntaje perfecto', condicion: () => user.mejorPuntuacion >= 1000, icono: '💯' },
      { id: 'explorador', nombre: 'Explorador', descripcion: 'Juega las 5 ingenierías', condicion: () => Object.values(user.progresoIngenierias || {}).filter(i => i.intentos > 0).length === 5, icono: '🗺️' },
      { id: 'maestro', nombre: 'Maestro', descripcion: 'Completa una ingeniería al 100%', condicion: () => Object.values(user.progresoIngenierias || {}).some(i => i.completada), icono: '🏆' },
      { id: 'veterano', nombre: 'Veterano', descripcion: 'Juega 10 partidas', condicion: () => user.partidasJugadas >= 10, icono: '⭐' }
    ];

    logrosDisponibles.forEach(logro => {
      const yaDesbloqueado = user.logros.find(l => l.id === logro.id);
      if (!yaDesbloqueado && logro.condicion()) {
        user.logros.push({
          id: logro.id,
          nombre: logro.nombre,
          descripcion: logro.descripcion,
          icono: logro.icono,
          fechaDesbloqueo: new Date().toISOString()
        });
      }
    });
  };

  const pregunta = preguntas[preguntaActual];

  const handleRespuesta = (indice) => {
    if (mostrarResultado) return;

    setRespuestaSeleccionada(indice);
    setMostrarResultado(true);

    if (indice === pregunta.correcta) {
      setPuntos(puntos + 100);
    } else {
      // ❌ Pierde una vida
      setVidas((v) => {
        const nuevasVidas = v - 1;
        if (nuevasVidas <= 0) {
          // ❌ Se queda sin vidas → Mostrar modal
          setMostrarModalDerrota(true);
          //actualizarEstadisticasUsuario()
        }
        return nuevasVidas;
      });
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

  // ⭐ Reiniciar después de perder
  const reiniciarYSalir = () => {
    setPuntos(0);
    setPreguntaActual(0);
    setVidas(5);
    setMostrarModalDerrota(false);
    setJuegoTerminado(true)
    navigate('/select-ingenieria');
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
            <h2>Ingeniería {nombresIngenieria[ingenieriaSeleccionada]}</h2>
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
              <span className="score sh1">❤️ {vidas}</span>
              <span className="score sh1">⭐ {puntos} pts</span>
              <button onClick={() => navigate('/profile')} className="btn-profile">
                👤 Perfil
              </button>
              <button onClick={handleLogout} className="btn-logout">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <header className="game-header gh2">
        <div className="container">
          <div className="header-content">
            <div className="user-info">
              <span className="score">❤️ {vidas}</span>
              <span className="score">⭐ {puntos} pts</span>
            </div>
          </div>
        </div>
      </header>

      <main className="game-main">
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "auto" }}>
            <button onClick={reiniciarYSalir} className="link">
              <i className="bi bi-arrow-left"></i> Volver a seleccionar ingeniería
            </button>
          </div>
          <div className="question-card fade-in">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((preguntaActual + 1) / preguntas.length) * 100}%` }}
              ></div>
            </div>

            <div className="question-header">
              <span className={`category badge-${ingenieriaSeleccionada}`}>
                {nombresIngenieria[ingenieriaSeleccionada]}
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
                  className={`option-btn ${mostrarResultado
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

      {mostrarModalDerrota && (
        <div className="modal-overlay fade-in">
          <div className="modal-content">
            <img src="./sad_face.png" alt="" width="100" />
            <h2>¡Te quedaste sin vidas!</h2>
            <p>Intenta nuevamente para mejorar tu puntuación.</p>
            <button onClick={reiniciarYSalir} className="btn btn-primary">
              Volver a seleccionar ingeniería
            </button>
          </div>
        </div>
      )}

      {mostrarModalNivel && (
        <div className="modal-overlay fade-in" onClick={() => setMostrarModalNivel(false)}>
          <div className="modal-content-info">
            <img src={imagenNivel} alt="Nivel" style={{ width: "100%", borderRadius: "10px" }} />
            <button className="btn btn-primary" onClick={() => setMostrarModalNivel(false)}>
              Continuar
            </button>
          </div>
        </div>
      )}


    </div>
  );
}

export default GamePage;