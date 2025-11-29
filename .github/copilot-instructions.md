# MultiQuiz Ingenierías - Guía para Agentes de IA

## Descripción del Proyecto
**MultiQuiz Ingenierías** es un juego educativo tipo trivia para estudiantes de ingeniería, inspirado en "Preguntados". Combina gamificación (insignias, rankings, certificados) con contenido académico en 5 especialidades de ingeniería.

## Arquitectura General

### Stack Tecnológico
- **Frontend:** React 19 + React Router 7 (SPA)
- **Build:** Vite con plugin React SWC
- **Almacenamiento:** localStorage (sin backend)
- **Generación de PDFs:** jsPDF + html2canvas
- **Linting:** ESLint 9 con configuración React

### Flujo de Navegación
```
LoginPage (/) → SelectIngenieriaPage (/select-ingenieria)
    ↓
GamePage (/game) → ProfilePage (/profile)
    ↓
RankingPage (/ranking)
```
**Protección:** `App.jsx` implementa rutas protegidas verificando `localStorage.user` antes de acceso.

## Estructura de Datos Clave

### Perfil de Usuario (localStorage)
Guardado como JSON en `localStorage.getItem('user')`:
```javascript
{
  email: string,
  nombre: string,
  puntosTotales: number,
  partidasJugadas: number,
  ultimaPuntuacion: number,
  vidasRestantes: number,
  insignias: string[], // IDs de insignias desbloqueadas
  ingenieriasCompletadas: string[],
  ingenieriasJugadas: string[], // Set interno convertido a Array
  avatar: string
}
```

### Preguntas (src/data/preguntas.js)
```javascript
PREGUNTAS_POR_INGENIERIA = {
  multimedia: [{ id, pregunta, opciones[], correcta: index, explicacion }, ...],
  software: [...],
  civil: [...],
  mecatronica: [...],
  ambiental: [...]
}
```
Cada pregunta tiene **explicación inmediata** mostrada tras responder.

### Insignias (src/data/insignias.js)
- 8 insignias disponibles con requisitos variados
- Sistema de verificación basado en `tipo` de requisito (puntos_partida, sin_errores, ingenierias_jugadas, etc.)
- Verificación ocurre en `verificarYOtorgarInsignias()` tras cada partida
- Modal de insignia nueva (`InsigniaModal.jsx`) mostrado al desbloquear

## Patrones Clave del Proyecto

### 1. **Gestión de Estado en GamePage**
Componente monolítico que maneja:
- Estado del quiz (pregunta actual, puntos, vidas, resultado mostrado)
- Sistema de 5 vidas (derrota al llegar a 0)
- Modal de derrota personalizado
- Selección de respuesta con validación
- Delay de 1.5s antes de pasar a siguiente pregunta

**Patrón:** Estados segregados por funcionalidad (`estdosDelJuego`, `estadosParaInsignias`, `navegaciónYReferencias`).

### 2. **Servicios de UserService (src/services/userService.js)**
- **obtenerPerfilUsuario():** Retorna perfil completo desde localStorage
- **actualizarPerfilDespuesDePartida():** Actualiza puntos, partidas, ingeniería jugada Y ranking global
- **obtenerPosicionUsuario():** Calcula ranking del usuario en lista global
- **agregarInsignia():** Añade ID de insignia al array

**Convención:** Todos los cambios de usuario van a localStorage (no hay persistencia backend).

### 3. **Insignias - Verificación Post-Partida**
En `GamePage.jsx`, al terminar:
```javascript
const insigniasNuevas = verificarYOtorgarInsignias({
  puntos: puntos,
  vidas: vidas,
  ingenieria: ingenieriaSeleccionada
});
// Si hay insignias nuevas, mostrar modal
```
Solo verifica insignias **no desbloqueadas previamente** (`!perfil.insignias.includes(insignia.id)`).

### 4. **Certificados (certificadoService.js)**
- Genera PDF landscape con jsPDF
- Muestra nombre usuario, ingeniería, puntuación
- Styling: bordes azules, texto centrado, diseño formal
- Función `calificaParaCertificado()` verifica requisitos (puntuación mínima)

### 5. **Ranking Global**
- Almacenado en localStorage bajo clave `rankingGlobal`
- Array de objetos: `{ email, nombre, puntosTotales, fecha }`
- Ordenado por puntos descendentes
- Se actualiza cada partida en `actualizarPerfilDespuesDePartida()`

## Convenciones Específicas

### Nomenclatura
- **Ingenierías:** lowercase (`multimedia`, `software`, `civil`, `mecatronica`, `ambiental`)
- **Insignias:** snake_case en ID (`primera_victoria`, `super_estrella`)
- **Variables React:** camelCase
- **Funciones de verificación:** prefijo `verificar` o `obtener`

### localStorage
- **Claves principales:** `user`, `ingenieriaSeleccionada`, `rankingGlobal`
- **Siempre JSON.stringify()** para guardar objetos
- **Siempre try-catch** al hacer JSON.parse() (ver GamePage.jsx línea ~37)

### Estilos CSS
- **Archivos:** `PageName.css` junto a `PageName.jsx`
- **Variables de color recurrentes:** Azul (#2980b9), gris (#333), blanco
- **Animaciones:** fade-in, transiciones suaves en respuestas
- **Responsive:** Flexbox, media queries en perfiles

### Componentes
- **InsigniaModal.jsx:** Modal reutilizable para mostrar insignia + animación
- **Props esperadas:** `insignia` (objeto), `onClose` (callback)

## Workflows Críticos

### Iniciar Desarrollo
```bash
npm install
npm run dev  # Puerto default: http://localhost:5173
```

### Build para Producción
```bash
npm run build  # Output en ./dist
npm run preview  # Previsualizar build
```

### Linting
```bash
npm run lint  # Verifica según eslint.config.js
```
**Regla especial:** Variables mayúsculas (constantes) no disparan `no-unused-vars`.

### Agregar Nuevas Preguntas
1. Editar `src/data/preguntas.js`
2. Añadir objeto con estructura: `{ id, pregunta, opciones[], correcta: index, explicacion }`
3. **Importante:** El índice `correcta` es 0-based

### Agregar Nueva Insignia
1. Editar `src/data/insignias.js` → array `INSIGNIAS_DISPONIBLES`
2. Definir requisito con tipo conocido (ej: `{ tipo: 'puntos_partida', valor: 500 }`)
3. Si tipo nuevo, extender `verificarInsignia()` switch-case
4. La verificación ocurre automáticamente tras partida

### Descarga de Certificado
- Llamada desde `ProfilePage.jsx` → `generarCertificado()`
- Genera PDF automático con nombre usuario
- Usa `jsPDF` (orientación landscape, A4)

## Puntos de Extensión Comunes

1. **Integración de backend:** Reemplazar localStorage con API calls (userService.js es el punto de entrada)
2. **Nuevas ingenierías:** Añadir entrada en `PREGUNTAS_POR_INGENIERIA` + selector en `SelectIngenieriaPage`
3. **Sistema de vidas:** Actualmente 5 vidas fijas, modificable en `GamePage.jsx` inicial state
4. **Dificultad progresiva:** README menciona 5 niveles (Fácil→Gran Maestro) pero NO implementados aún
5. **Autenticación real:** LoginPage ahora simula login, conectar a backend aquí

## Testing & Debugging

### Acceso a Datos
- DevTools → Application → localStorage
- Todos los datos persistentes son accesibles/editables aquí
- Reset: `localStorage.clear()` en console

### Lógica de Insignias
- Verificación ocurre **siempre** tras partida, pero solo desbloquea si `!perfil.insignias.includes(insigniaId)`
- Para forzar desbloqueada de insignia: editar array en `localStorage.user`

### Estados de GamePage
- Si quiz "se queda" en pregunta: revisar `timeoutRef.current` en useEffect
- Modal de derrota: `mostrarModalDerrota` boolean controla visibilidad

## Archivos Críticos a Conocer

| Archivo | Propósito |
|---------|-----------|
| `src/App.jsx` | Enrutador principal + protección de rutas |
| `src/pages/GamePage.jsx` | Lógica completa del quiz (351 líneas) |
| `src/services/userService.js` | API localStorage para perfil |
| `src/services/insigniasService.js` | Verificación + otorgamiento de insignias |
| `src/data/preguntas.js` | Banco de preguntas (520 líneas) |
| `src/data/insignias.js` | Catálogo de insignias + verificación |
| `src/services/certificadoService.js` | Generación de PDFs |
