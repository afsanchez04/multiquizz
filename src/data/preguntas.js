// BANCO DE PREGUNTAS - MULTIQUIZ INGENIERÍAS

export const PREGUNTAS_POR_INGENIERIA = {
  
  // MULTIMEDIA 
  multimedia: [
    {
      id: 1,
      pregunta: "¿Qué es la resolución en una imagen digital?",
      opciones: [
        "El peso del archivo",
        "La cantidad de píxeles que contiene a lo largo y ancho",
        "El tipo de compresión",
        "El brillo de la imagen"
      ],
      correcta: 1,
      explicacion: "La resolución indica cuántos píxeles por unidad de medida tiene una imagen a mayor cantidad mayor resolución y mayor detalle."
    },
    {
      id: 2,
      pregunta: "¿Cuál es un formato de video común?",
      opciones: ["MP4", "DOCX", "WAV", "PNG"],
      correcta: 0,
      explicacion: "MP4 es uno de los formatos de video más usados por su eficiencia y nivel de compresión sin perdida de información."
    },
    {
      id: 3,
      pregunta: "¿Qué herramienta se usa principalmente para editar fotografías?",
      opciones: ["Illustrator", "Premiere", "Photoshop", "Audition"],
      correcta: 2,
      explicacion: "Photoshop es el estándar en edición y retoque de imágenes teniendo en cuenta su versatilidad y manejo de herramientas para edición."
    },
    {
      id: 4,
      pregunta: "¿Cuál es un color primario en RGB?",
      opciones: ["Amarillo", "Verde", "Morado", "Negro"],
      correcta: 1,
      explicacion: "RGB usa Rojo, Verde y Azul, colores emisivos de luz en formato digital."
    },
    {
      id: 5,
      pregunta: "¿Para qué sirve HTML?",
      opciones: [
        "Para diseñar audio",
        "Para estructurar páginas web",
        "Para animación 3D",
        "Para compilar programas"
      ],
      correcta: 1,
      explicacion: "HTML define la estructura básica de código de un sitio web."
    },
    {
      id: 6,
      pregunta: "¿Cuál de estas es una propiedad CSS para cambiar el tamaño del texto?",
      opciones: ["text-size", "font-size", "heading-size", "letter-height"],
      correcta: 1,
      explicacion: "font-size ajusta la altura del texto en CSS."
    },
    {
      id: 7,
      pregunta: "El formato WebP se caracteriza por:",
      opciones: [
        "Ser solo para audios",
        "Tener alta compresión y calidad",
        "Ser exclusivo de video",
        "Ser obsoleto"
      ],
      correcta: 1,
      explicacion: "WebP reduce peso sin sacrificar calidad, ideal para optimizar estructura de un sitio web."
    },
    {
      id: 8,
      pregunta: "¿Qué software es líder en animación 3D profesional?",
      opciones: ["Blender", "Excel", "Unity", "AutoCAD"],
      correcta: 0,
      explicacion: "Blender es ampliamente usado por su potencia y gratuidad, además de ser opensource."
    },
    {
      id: 9,
      pregunta: "La compresión de video inter-frame se basa en:",
      opciones: [
        "Analizar cada fotograma por separado",
        "Comparar fotogramas para reducir datos",
        "Eliminar sonido",
        "Repetir fotogramas"
      ],
      correcta: 1,
      explicacion: "Esta técnica reduce peso detectando cambios mínimos entre cuadros reduciendo tiempo en el codificado."
    },
    {
      id: 10,
      pregunta: "La corrección de color en postproducción permite:",
      opciones: [
        "Aumentar la resolución",
        "Unificar tonos y estilos de la imagen",
        "Reducir el tamaño del archivo",
        "Agregar efectos de sonido"
      ],
      correcta: 1,
      explicacion: "Se usa para ajustar apariencia y lograr coherencia visual."
    }
  ],

  // SOFTWARE 
  software: [
    {
      id: 1,
      pregunta: "¿Qué es un compilador?",
      opciones: [
        "Un sistema operativo",
        "Un programa que traduce código",
        "Un lenguaje de programación",
        "Un servidor"
      ],
      correcta: 1,
      explicacion: "Compila código de alto nivel a lenguaje máquina."
    },
    {
      id: 2,
      pregunta: "¿Qué símbolo se usa para comentarios en Python?",
      opciones: ["//", "#", "<!-- -->", ";;"],
      correcta: 1,
      explicacion: "En Python, # indica un comentario de línea."
    },
    {
      id: 3,
      pregunta: "¿Qué significa IDE?",
      opciones: [
        "Internet Development Engine",
        "Integrated Development Environment",
        "Internal Data Encryption",
        "Input Device Emulator"
      ],
      correcta: 1,
      explicacion: "Es un entorno que integra editor, depurador y herramientas."
    },
    {
      id: 4,
      pregunta: "JavaScript se ejecuta principalmente en:",
      opciones: ["La nube", "El navegador", "La BIOS", "El hardware"],
      correcta: 1,
      explicacion: "JavaScript es el lenguaje nativo de los navegadores web."
    },
    {
      id: 5,
      pregunta: "SQL se usa para:",
      opciones: [
        "Crear animaciones",
        "Diseñar interfaces",
        "Gestionar bases de datos",
        "Controlar redes"
      ],
      correcta: 2,
      explicacion: "SQL permite consultar, modificar y administrar información."
    },
    {
      id: 6,
      pregunta: "¿Qué estructura de datos sigue el principio FIFO?",
      opciones: ["Pila", "Cola", "Lista enlazada", "Árbol"],
      correcta: 1,
      explicacion: "En las colas el primero en entrar es el primero en salir."
    },
    {
      id: 7,
      pregunta: "¿Qué es un framework?",
      opciones: [
        "Un sistema operativo",
        "Un conjunto de herramientas y reglas",
        "Un lenguaje compilado",
        "Un archivo ejecutable"
      ],
      correcta: 1,
      explicacion: "Facilita el desarrollo y estandariza prácticas."
    },
    {
      id: 8,
      pregunta: "El patrón MVC separa:",
      opciones: [
        "Datos, servidores y redes",
        "Modelo, Vista y Controlador",
        "Hardware, software y firmware",
        "Datos lineales y no lineales"
      ],
      correcta: 1,
      explicacion: "MVC divide responsabilidades para mantener código limpio."
    },
    {
      id: 9,
      pregunta: "En concurrencia, una sección crítica es:",
      opciones: [
        "Código que nunca se ejecuta",
        "Código que usa recursos compartidos",
        "Código inútil",
        "Código sin variables"
      ],
      correcta: 1,
      explicacion: "Debe protegerse para evitar condiciones de carrera."
    },
    {
      id: 10,
      pregunta: "En aprendizaje automático, el sobreajuste ocurre cuando:",
      opciones: [
        "El modelo es demasiado simple",
        "El modelo memoriza los datos de entrenamiento",
        "El dataset es pequeño",
        "Se entrena poco tiempo"
      ],
      correcta: 1,
      explicacion: "Un modelo sobreajustado no generaliza a nuevos datos."
    }
  ],

  // CIVIL 
  civil: [
    {
      id: 1,
      pregunta: "¿Qué es una cimentación?",
      opciones: [
        "Una decoración",
        "La base que soporta una estructura",
        "Un material aislante",
        "Una tubería"
      ],
      correcta: 1,
      explicacion: "La cimentación distribuye cargas de peso al suelo."
    },
    {
      id: 2,
      pregunta: "¿Cuál de estos es un material de construcción?",
      opciones: ["Silicio", "Madera", "Petróleo", "Mercurio"],
      correcta: 1,
      explicacion: "La madera es uno de los materiales más usados históricamente."
    },
    {
      id: 3,
      pregunta: "¿Qué mide un flexómetro?",
      opciones: ["Peso", "Distancia", "Presión", "Temperatura"],
      correcta: 1,
      explicacion: "Es la herramienta más usada para medir longitudes."
    },
    {
      id: 4,
      pregunta: "¿Cuál de estos es un plano estructural?",
      opciones: ["De cortes", "De instalaciones", "De cimentación", "De acabados"],
      correcta: 2,
      explicacion: "Indica elementos que soportan la edificación."
    },
    {
      id: 5,
      pregunta: "El concreto se endurece por:",
      opciones: ["Evaporación", "Reacción química de hidratación", "Fusión", "Oxidación"],
      correcta: 1,
      explicacion: "La hidratación es una reacción exotérmica que da resistencia."
    },
    {
      id: 6,
      pregunta: "El ensayo Proctor sirve para medir:",
      opciones: [
        "Resistencia a tracción",
        "Compactación del suelo",
        "Conductividad eléctrica",
        "Permeabilidad del concreto"
      ],
      correcta: 1,
      explicacion: "Determina la humedad óptima para compactar un suelo."
    },
    {
      id: 7,
      pregunta: "La resistencia del acero A615 se clasifica por:",
      opciones: ["Dureza", "Diámetro", "Grado", "Elasticidad"],
      correcta: 2,
      explicacion: "El grado indica límite de fluencia."
    },
    {
      id: 8,
      pregunta: "Una viga se diseña para resistir principalmente:",
      opciones: ["Compresión pura", "Corte y flexión", "Torsión únicamente", "Peso propio"],
      correcta: 1,
      explicacion: "La flexión es la solicitación predominante en vigas."
    },
    {
      id: 9,
      pregunta: "El análisis sísmico dinámico representa:",
      opciones: [
        "Fuerzas estáticas",
        "La respuesta de la estructura en el tiempo",
        "Cambios térmicos",
        "Fallas eléctricas"
      ],
      correcta: 1,
      explicacion: "Se simula el comportamiento frente a un sismo real."
    },
    {
      id: 10,
      pregunta: "El módulo de Poisson relaciona:",
      opciones: [
        "Peso y volumen",
        "Deformación longitudinal y transversal",
        "Corte y compresión",
        "Dureza y densidad"
      ],
      correcta: 1,
      explicacion: "Indica cómo se deforma un material en distintas direcciones."
    }
  ],

  // MECATRÓNICA 
  mecatronica: [
    {
      id: 1,
      pregunta: "¿Qué es un actuador?",
      opciones: [
        "Un sensor",
        "Un dispositivo que ejecuta movimiento",
        "Un código de control",
        "Un diagrama eléctrico"
      ],
      correcta: 1,
      explicacion: "Los actuadores convierten energía en acción física."
    },
    {
      id: 2,
      pregunta: "¿Cuál es un microcontrolador muy usado?",
      opciones: ["Arduino Uno", "Windows", "Excel", "Bluetooth"],
      correcta: 0,
      explicacion: "Arduino facilita el prototipado electrónico."
    },
    {
      id: 3,
      pregunta: "Un sensor de ultrasonido mide:",
      opciones: ["Luz", "Distancia", "Color", "Humedad"],
      correcta: 1,
      explicacion: "Usa ondas ultrasónicas para medir proximidad."
    },
    {
      id: 4,
      pregunta: "¿Para qué sirve un diodo?",
      opciones: [
        "Amplificar",
        "Resistir",
        "Permitir flujo de corriente en un solo sentido",
        "Generar energía"
      ],
      correcta: 2,
      explicacion: "Es un componente fundamental para rectificación."
    },
    {
      id: 5,
      pregunta: "¿Qué lenguaje se usa en Arduino?",
      opciones: ["C/C++", "Java", "Python puro", "SQL"],
      correcta: 0,
      explicacion: "Arduino IDE utiliza una variante simplificada de C++."
    },
    {
      id: 6,
      pregunta: "El control PWM permite:",
      opciones: [
        "Regular voltaje fijo",
        "Modular potencia mediante pulsos",
        "Evitar interferencias",
        "Aumentar frecuencia de reloj"
      ],
      correcta: 1,
      explicacion: "PWM controla motores y LEDs modulando pulsos."
    },
    {
      id: 7,
      pregunta: "Un encoder rotatorio mide:",
      opciones: ["Masa", "Giros y posición angular", "Voltaje", "Frecuencia"],
      correcta: 1,
      explicacion: "Se usa para determinar la orientación y velocidad de rotación."
    },
    {
      id: 8,
      pregunta: "Un robot SCARA es ideal para:",
      opciones: [
        "Perforación profunda",
        "Ensamble rápido y preciso",
        "Movimiento omnidireccional",
        "Excavación"
      ],
      correcta: 1,
      explicacion: "SCARA destaca por su precisión en tareas repetitivas."
    },
    {
      id: 9,
      pregunta: "El filtro de Kalman se utiliza para:",
      opciones: [
        "Limpiar imágenes",
        "Estimar estados en sistemas dinámicos",
        "Enfriar motores",
        "Codificar señales"
      ],
      correcta: 1,
      explicacion: "Fusiona mediciones y modelos para estimaciones precisas."
    },
    {
      id: 10,
      pregunta: "El control PID ajusta la respuesta del sistema para:",
      opciones: [
        "Maximizar el ruido",
        "Minimizar error y mejorar estabilidad",
        "Aumentar frecuencia",
        "Crear trayectorias aleatorias"
      ],
      correcta: 1,
      explicacion: "Es uno de los controladores más usados en la industria."
    }
  ],

  // AMBIENTAL 
  ambiental: [
    {
      id: 1,
      pregunta: "¿Qué es un residuo sólido?",
      opciones: ["Un líquido tóxico", "Un material descartado", "Un gas contaminante", "Un mineral"],
      correcta: 1,
      explicacion: "Residuos sólidos incluyen plástico, papel, vidrio, etc."
    },
    {
      id: 2,
      pregunta: "¿Cuál es una energía renovable?",
      opciones: ["Gas natural", "Carbón", "Eólica", "Diesel"],
      correcta: 2,
      explicacion: "La energía eólica proviene del viento y es inagotable."
    },
    {
      id: 3,
      pregunta: "La lluvia ácida se genera por:",
      opciones: [
        "Tormentas solares",
        "Emisiones de SO₂ y NOₓ",
        "Olas de calor",
        "Humedad excesiva"
      ],
      correcta: 1,
      explicacion: "Estos gases reaccionan con agua formando ácidos."
    },
    {
      id: 4,
      pregunta: "¿Qué elemento es esencial para la fotosíntesis?",
      opciones: [
        "El dióxido de carbono",
        "El hierro",
        "El sodio",
        "El helio"
      ],
      correcta: 0,
      explicacion: "Las plantas usan CO₂ para generar energía."
    },
    {
      id: 5,
      pregunta: "El reciclaje permite:",
      opciones: [
        "Aumentar residuos",
        "Ahorrar energía y recursos",
        "Contaminar más",
        "Deteriorar materiales"
      ],
      correcta: 1,
      explicacion: "Reciclar reduce la explotación de materias primas."
    },
    {
      id: 6,
      pregunta: "Un bioindicador es:",
      opciones: [
        "Un robot",
        "Un organismo que refleja la calidad ambiental",
        "Un químico industrial",
        "Un sensor de laboratorio"
      ],
      correcta: 1,
      explicacion: "Su presencia o ausencia indica condiciones ambientales."
    },
    {
      id: 7,
      pregunta: "La huella hídrica mide:",
      opciones: [
        "Consumo de CO₂",
        "Cantidad de agua usada directa e indirectamente",
        "Temperatura",
        "Ruido"
      ],
      correcta: 1,
      explicacion: "Incluye agua consumida en producción y uso."
    },
    {
      id: 8,
      pregunta: "La capa de ozono se encuentra en:",
      opciones: ["La litosfera", "La troposfera", "La estratosfera", "El núcleo"],
      correcta: 2,
      explicacion: "Filtra radiación UV dañina para la vida."
    },
    {
      id: 9,
      pregunta: "La eutrofización provoca:",
      opciones: [
        "Aumento de biodiversidad",
        "Falta de oxígeno en cuerpos de agua",
        "Disminución de nutrientes",
        "Reducción del fitoplancton"
      ],
      correcta: 1,
      explicacion: "El exceso de nutrientes causa proliferación de algas y reduce oxígeno."
    },
    {
      id: 10,
      pregunta: "Una Evaluación de Impacto Ambiental (EIA) identifica:",
      opciones: [
        "Daños económicos",
        "Efectos ambientales de un proyecto",
        "Calidad del diseño arquitectónico",
        "Velocidad del viento"
      ],
      correcta: 1,
      explicacion: "Es un instrumento clave para prevenir impactos negativos."
    }
  ]
};
