const questions = [
  {
    q: "เราเจอกันครั้งแรกที่ไหน จำได้ไหม?",
    options: ["มหาลัย", "ห้องสมุด", "เชียงใหม่", "ตึกศิลปศาสตร์"],
    answer: 1
  },
  {
    q: "กูเกิดวันอะไร",
    options: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี"],
    answer: 0
  },
  {
    q: "เค้าตอนทำอะไรตอนว่าง?",
    options: ["นอน", "ดูหนัง", "อ่านหนังสือ", "เล่นเกมกับเธอ"],
    answer: 3
  },
  {
    q: "เค้าชอบอะไรมากที่สุด?",
    options: ["เธอ", "อ่านหนังสือ", "เล่นเกม", "ดูหนัง"],
    answer: 0
  },
  {
    q: "พ่อเค้าชื่ออะไร?",
    options: ["สมชาย", "สมศักดิ์", "สมพงษ์", "สมหวัง"],
    answer: 3
  },
  {
    q: "หนังเรื่องแรกที่เราไปดูด้วยกันคืออะไร?",
    options: ["ธี่หยด", "4kings", "immaculate", "a quiet place"],
    answer: 0
  },
  {
    q: "ฉันเกิดวันไหน?",
    options: ["25 กรกฏาคม", "26 กรกฏาคม", "27 กรกฏาคม", "25 สิงหาคม"],
    answer: 1
  },
  {
    q: "นิสัยของฉันที่เธอชอบที่สุดคือ?",
    options: ["ใจดี", "เรียนเก่ง", "ยิ้มเก่ง", "ถูกทุกข้อ!"],
    answer: 3
  },
  {
    q: "ตอนนี้เราคบกันมาแล้วกี่วัน?",
    options: ["782", "781", "780", "779"],
    answer: 1
  },
  {
    q: "เค้าเรียนโรงเรียนอะไรตอน ม.6?",
    options: ["กรุงเทพคริสเตียน", "เตรียมอุดม", "โรงเรียนเทศบาล ๑ (เอ็งเสียงสามัคคี)", "โรงเรียนเทศบาล ๒ (บ้านหาดใหญ่)"],
    answer: 3
  }
];

const rewards = {
  0: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ควาย! กอดๆ นะ 💖",
  1: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ตุอวน! กอดๆ นะ 💖",
  2: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ตุอวน! กอดๆ นะ 💖",
  3: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ตุอวน! กอดๆ นะ 💖",
  4: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ตุอวน! กอดๆ นะ 💖",
  5: "ไม่เป็นไรนะ ถึงจะได้คะแนนน้อย ไอ้ตุอวน! กอดๆ นะ 💖",
  6: "รางวัล: บัตร 'ยกเว้นการล้างจาน' 1 วันถ้วน! 🍽️",
  7: "รางวัล: เลี้ยงชานมไข่มุกเจ้าดัง 1 แก้ว (เลือกท็อปปิ้งได้เต็มที่!) 🧋",
  8: "รางวัล: ดอกไม้ 1 ดอก",
  9: "รางวัล: ดอกไม้ 1 ดอก,ตอก 1 ที,เลี้ยงชานมไข่มุกเจ้าดัง 1 แก้ว",
  10: "มึงโกงละ"
};

let currentIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const progressBar = document.getElementById("progress");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const music = document.getElementById("bgm");
const particlesContainer = document.getElementById("particles");

// Start music and particles on first interaction
document.body.addEventListener("click", () => {
  music.play().catch(() => { });
  startHeartRain();
}, { once: true });

function startHeartRain() {
  setInterval(() => {
    createHeart();
  }, 500);
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart-particle";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "100vh";
  heart.style.fontSize = (Math.random() * 20 + 10) + "px";
  heart.style.opacity = Math.random();
  particlesContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

function updateProgress() {
  const percent = ((currentIndex) / questions.length) * 100;
  progressBar.style.width = percent + "%";
}

function showQuestion() {
  const item = questions[currentIndex];
  updateProgress();

  // Update buttons
  prevBtn.disabled = currentIndex === 0;
  nextBtn.innerText = currentIndex === questions.length - 1 ? "ดูรางวัล 🎁" : "ถัดไป";

  let html = `
    <div class="fade-in">
      <p class="question-text">${currentIndex + 1}. ${item.q}</p>
      <div class="options-list">
  `;

  item.options.forEach((opt, i) => {
    const isSelected = userAnswers[currentIndex] === i;
    html += `
      <label class="option-item ${isSelected ? 'selected' : ''}">
        <input type="radio" name="q" value="${i}" ${isSelected ? 'checked' : ''}
               onchange="selectAnswer(${i})">
        <span>${String.fromCharCode(65 + i)}. ${opt}</span>
      </label>
    `;
  });

  html += `</div></div>`;
  quizDiv.innerHTML = html;
}

function selectAnswer(i) {
  userAnswers[currentIndex] = i;
  showQuestion(); // Refresh to show selected style
}

function nextQuestion() {
  if (userAnswers[currentIndex] === null) {
    alert("เลือกคำตอบก่อนนะคนดี 💖");
    return;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    submitQuiz();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    showQuestion();
  }
}

function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });

  progressBar.style.width = "100%";
  quizDiv.innerHTML = "";
  document.getElementById("buttonGroup").style.display = "none";
  document.getElementById("progressBarContainer").style.display = "none";
  document.getElementById("introDesc").style.display = "none";
  document.getElementById("mainTitle").innerText = "🎊 ยินดีด้วย 🎉";

  const reward = rewards[score];

  resultDiv.innerHTML = `
    <div class="fade-in">
      <h2 style="color: #ff4d6d; margin-bottom: 10px;">เธอทำได้ ${score}/${questions.length} คะแนน!</h2>
      <div class="reward-box">
        <p class="reward-title">🎁 รางวัลของเธอคือ...</p>
        <p class="reward-text">${reward}</p>
      </div>
      <button onclick="location.reload()" style="margin-top: 25px; background: #ff758f;">เล่นใหม่ 🔄</button>
    </div>
  `;

  // Celebration burst
  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 50);
  }
}

// Initial call
showQuestion();