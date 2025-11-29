import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear estructura completa de usuario
    const nuevoUsuario = {
      email: formData.email,
      nombre: formData.nombre || formData.email.split('@')[0],
      avatar: '👤', // Avatar por defecto
      nivel: 1,
      xpTotal: 0,
      partidasJugadas: 0,
      mejorPuntuacion: 0,
      
      // Progreso por ingeniería
      progresoIngenierias: {
        multimedia: { completada: false, mejorScore: 0, intentos: 0 },
        software: { completada: false, mejorScore: 0, intentos: 0 },
        civil: { completada: false, mejorScore: 0, intentos: 0 },
        mecatronica: { completada: false, mejorScore: 0, intentos: 0 },
        ambiental: { completada: false, mejorScore: 0, intentos: 0 }
      },
      
      // Logros desbloqueados
      logros: [],
      
      // Certificados obtenidos
      certificados: [],
      
      // Fecha de registro
      fechaRegistro: new Date().toISOString()
    };
    
    // Simulación de login exitoso
    if (isLogin) {
      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(nuevoUsuario));
      navigate('/select-ingenieria');
    } else {
      // Registro exitoso
      localStorage.setItem('user', JSON.stringify(nuevoUsuario));
      alert('¡Registro exitoso! Redirigiendo...');
      navigate('/select-ingenieria');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="login-card fade-in">
        <div className="login-header">
          <h1>🎓 MultiQuiz Ingenierías</h1>
          <p>Aprende jugando con las mejores trivias de ingeniería</p>
        </div>

        <div className="tab-buttons">
          <button 
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {isLogin && (
            <div className="form-footer">
              <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full">
            {isLogin ? '🚀 Ingresar' : '✨ Crear Cuenta'}
          </button>
        </form>

        <div className="ingenierias-badges">
          <span className="badge badge-multimedia">Multimedia</span>
          <span className="badge badge-software">Software</span>
          <span className="badge badge-civil">Civil</span>
          <span className="badge badge-mecatronica">Mecatrónica</span>
          <span className="badge badge-ambiental">Ambiental</span>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;