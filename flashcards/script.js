const flashcards = [
  {
    category: "📊 Estadísticas",
    question: "¿Qué factor crees que está detrás del 31% de los accidentes mortales?",
    answer:
      '<strong>Las distracciones.</strong> Siguen siendo el "enemigo número uno" en carretera. Según datos de la DGT, abstraerse al volante causa más muertes que el alcohol o la velocidad.',
  },
  {
    category: "📱 Tecnología",
    question: "¿Cuánto multiplica el riesgo de accidente enviar un WhatsApp mientras conduces?",
    answer:
      "<strong>Lo multiplica por 23.</strong> Al escribir un mensaje, pierdes la atención visual, cognitiva y manual. Es como conducir a ciegas durante cientos de metros.",
  },
  {
    category: "⚖️ Normativa",
    question: "¿Sabes cuántas multas por distracciones se pusieron en 2024?",
    answer:
      "<strong>Casi 26.000 (exactamente 25.967).</strong> Es una de las cifras más altas de los últimos 10 años, lo que demuestra que aún nos cuesta dejar el móvil aparcado.",
  },
  {
    category: "🧠 Psicología",
    question: "¿Por qué los trayectos rutinarios (como ir al trabajo) son los más peligrosos?",
    answer:
      "<strong>Por el exceso de confianza.</strong> Tu cerebro entra en 'piloto automático' y baja la guardia, haciendo que cualquier imprevisto se convierta en un accidente inevitable.",
  },
  {
    category: "👶 Jóvenes",
    question: "¿Qué grupo de edad es 10 veces más propenso a distraerse que los mayores?",
    answer:
      "<strong>Los jóvenes de 18 a 29 años.</strong> La hiperconectividad y la falsa sensación de control sobre el móvil los convierte en el grupo de mayor riesgo.",
  },
  {
    category: "📏 Física",
    question: "A 120 km/h, ¿qué distancia recorres si apartas la vista solo 5 segundos?",
    answer:
      "<strong>Recorres 167 metros.</strong> Eso es más de un campo y medio de fútbol avanzado sin ver absolutamente nada de lo que ocurre delante de ti.",
  },
  {
    category: "📞 Manos Libres",
    question: "¿Es 100% seguro hablar por manos libres mientras conduces?",
    answer:
      "<strong>No.</strong> Aunque tus manos estén en el volante, tu cerebro sufre 'ceguera por atención'. Dejas de procesar hasta el 50% de las señales de tráfico.",
  },
  {
    category: "🚫 Malos Hábitos",
    question: "¿Fumar mientras conduces es solo una distracción visual?",
    answer:
      "<strong>No, es triple:</strong> Manual (sujetas el cigarro), Visual (buscas el cenicero) y Química (el monóxido de carbono reduce tu visión nocturna).",
  },
  {
    category: "💡 Curiosidades",
    question: "¿Un objeto suelto en el coche (como un bolso) puede causar un accidente?",
    answer:
      "<strong>Sí.</strong> Si se cae y tratas de alcanzarlo, realizas un movimiento instintivo que desvía tu atención y el volante en un momento crítico.",
  },
  {
    category: "🧠 Atención",
    question: "¿Qué es el 'efecto túnel' provocado por la falta de concentración?",
    answer:
      "Es cuando tu campo visual se estrecha. Aunque mires al frente, dejas de percibir lo que ocurre en los laterales, como peatones o ciclistas.",
  },
  {
    category: "🚦 Semáforos",
    question: "¿Es seguro mirar el móvil mientras esperas en un semáforo en rojo?",
    answer:
      "<strong>Nunca.</strong> Pierdes la conciencia del entorno. Al arrancar, no habrás detectado si un peatón o ciclista se ha situado en tu ángulo muerto.",
  },
  {
    category: "🎵 Música",
    question: "¿Cómo afecta tu música favorita a la seguridad vial?",
    answer:
      "Si es muy movida o está muy alta, puede aumentar tu agresividad y euforia, haciendo que aceleres y ganes una confianza excesiva y peligrosa.",
  },
  {
    category: "🧸 Ocupantes",
    question: "¿Cuál es la distracción más común cuando viajas con amigos?",
    answer:
      "<strong>Interactuar con ellos.</strong> Girar la cabeza para hablar o mirar por el retrovisor para seguir la charla nos roba segundos vitales de reacción.",
  },
  {
    category: "🛌 Fatiga",
    question: "¿Qué pasa si juntas cansancio con una pequeña distracción?",
    answer:
      "<strong>El riesgo se multiplica.</strong> La fatiga ralentiza tus reflejos, por lo que una distracción que normalmente sería leve se vuelve mortal.",
  },
  {
    category: "🌩️ Clima",
    question: "¿Por qué debemos estar más atentos cuando llueve?",
    answer:
      "Porque la lluvia reduce la visibilidad y la adherencia. Cualquier distracción aquí es fatal, ya que la distancia de frenado es mucho mayor.",
  },
  {
    category: "🔍 Percepción",
    question: "¿Por qué a veces no vemos a una moto aunque estemos mirando hacia ella?",
    answer:
      "Se llama 'fracaso en la detección'. Tu cerebro busca coches y camiones, y a veces 'descarta' objetos más pequeños como motos o bicis por falta de foco.",
  },
  {
    category: "🔥 Pregunta Trampa",
    question: "¿Qué es peor: mirar una foto que te enseña un amigo o que te la describa?",
    answer:
      "<strong>Ambas son peligrosas.</strong> Mirar te quita la vista; escuchar la descripción obliga a tu cerebro a 'dibujarla' mentalmente, abandonando la carretera.",
  },
  {
    category: "📉 Tendencias",
    question: "¿La siniestralidad por distracción está bajando gracias a la tecnología?",
    answer:
      "<strong>Al revés.</strong> A pesar de las ayudas en los coches, el uso adictivo del smartphone ha hecho que la tendencia sea creciente desde 2020.",
  },
  {
    category: "🛡️ Prevención",
    question: "¿Cuál es el mejor consejo del RACC para evitar distracciones?",
    answer:
      "<strong>'Modo Coche' activado.</strong> Silencia notificaciones y prepara el GPS antes de salir. Tu única misión es llegar sano y salvo.",
  },
  {
    category: "🏁 Repaso Final",
    question: "A 120 km/h... ¿cuántos metros recorres 'a ciegas' en 5 segundos?",
    answer:
      "<strong>167 metros.</strong> Grávate este número: son casi dos estadios de fútbol sin mirar. ¿Seguro que ese mensaje no puede esperar?",
  },
];

let currentIndex = 0;
let isAnimating = false;

// Elementos
const card = document.getElementById("card");
const categoryFront = document.getElementById("category-front");
const categoryBack = document.getElementById("category-back");
const questionText = document.getElementById("question-text");
const back = document.getElementById("back");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const percent = ((currentIndex + 1) / flashcards.length) * 100;
  progressBar.style.width = `${percent}%`;
  progress.textContent = `Tarjeta ${currentIndex + 1} de ${flashcards.length}`;
}

function showCard() {
  const data = flashcards[currentIndex];
  
  // Llenar datos
  categoryFront.textContent = data.category;
  categoryBack.textContent = data.category;
  questionText.innerHTML = data.question;
  back.innerHTML = data.answer;
  
  updateProgress();
  card.classList.remove("flipped");
}

card.addEventListener("click", () => {
  if (!isAnimating) {
    card.classList.toggle("flipped");
  }
});

function changeCardWithAnimation(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const wasFlipped = card.classList.contains("flipped");
  card.classList.remove("flipped");

  const flipDelay = wasFlipped ? 300 : 0;

  setTimeout(() => {
    const exitX = direction === 1 ? "-50px" : "50px";
    const entryX = direction === 1 ? "50px" : "-50px";

    card.style.transition = "transform 0.25s ease-in, opacity 0.25s ease-in";
    card.style.transform = `translateX(${exitX})`;
    card.style.opacity = "0";

    setTimeout(() => {
      currentIndex += direction;
      showCard();

      card.style.transition = "none";
      card.style.transform = `translateX(${entryX})`;

      void card.offsetWidth;

      card.style.transition =
        "transform 0.25s ease-out, opacity 0.25s ease-out";
      card.style.transform = "translateX(0px)";
      card.style.opacity = "1";

      setTimeout(() => {
        card.style.transition = "";
        card.style.transform = "";
        isAnimating = false;
      }, 250);
    }, 250);
  }, flipDelay);
}

function nextCard() {
  if (isAnimating) return;
  if (currentIndex < flashcards.length - 1) {
    changeCardWithAnimation(1);
  }
}

function prevCard() {
  if (isAnimating) return;
  if (currentIndex > 0) {
    changeCardWithAnimation(-1);
  }
}

showCard();
