import { useNavigate } from 'react-router-dom';
import './SelectIngenieriaPage.css';

function SelectIngenieriaPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const ingenierias = [
    {
      nombre: 'Multimedia',
      icono: '🎨',
      color: 'multimedia',
      descripcion: 'Diseño, animación y desarrollo web'
    },
    {
      nombre: 'Software',
      icono: '💻',
      color: 'software',
      descripcion: 'Programación y arquitectura de sistemas'
    },
    {
      nombre: 'Civil',
      icono: '🏗️',
      color: 'civil',
      descripcion: 'Construcción, estructuras y materiales'
    },
    {
      nombre: 'Mecatrónica',
      icono: '⚙️',
      color: 'mecatronica',
      descripcion: 'Robótica y automatización'
    },
    {
      nombre: 'Ambiental',
      icono: '🌱',
      color: 'ambiental',
      descripcion: 'Sostenibilidad y gestión de recursos'
    }
  ];

  const handleSeleccion = (ingenieria) => {
    // Guardar la ingeniería seleccionada
    localStorage.setItem('ingenieriaSeleccionada', ingenieria.toLowerCase());
    // Ir a la página del juego
    navigate('/game');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="select-container">
      <header className="select-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">🎓 MultiQuiz</div>
            <div className="user-info">
              <span className="user-name">👤 {user.nombre}</span>
              <button onClick={handleLogout} className="btn-logout">Salir</button>
            </div>
          </div>
        </div>
      </header>

      <main className="select-main">
        <div className="container">
          <div className="select-content fade-in">
            <h1>Selecciona tu Ingeniería</h1>
            <p className="subtitle">Elige el área de conocimiento para comenzar a jugar</p>

            <div className="ingenierias-grid">
              {ingenierias.map((ing) => (
                <button
                  key={ing.nombre}
                  onClick={() => handleSeleccion(ing.nombre)}
                  className={`ingenieria-card card-${ing.color}`}
                >
                  <div className="card-icon">{ing.icono}</div>
                  <h3>{ing.nombre}</h3>
                  <p>{ing.descripcion}</p>
                  <span className="card-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SelectIngenieriaPage;