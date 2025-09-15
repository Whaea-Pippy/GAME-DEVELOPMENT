<!DOCTYPE html>
<html>
<head>
<base target="_top">
<meta charset="UTF-8">
<title>Ngā Kupu Hanga Rerenga Tools</title>

<style>
body { font-family: Arial, sans-serif; padding: 20px; }

/* ================= DROPDOWN ================= */
#category-selector {
  margin-bottom: 20px;
}
#category-selector select {
  font-size: 16px;
  padding: 5px;
}

/* ================= FLASHCARDS ================= */
#flashcards-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
#flashcards-section .card {
  width: 160px;
  height: 100px;
  padding: 10px;
  margin: 5px;
  border: 4px solid #333;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  word-wrap: break-word;
  transition: transform 0.6s, background-color 0.6s;
  background-color: lightyellow;
}
#flashcards-section .card.flipped {
  background-color: lightblue;
}

/* ================= QUIZ ================= */
#quiz-section .quiz-question {
  margin: 10px 0;
}
#quiz-section .quiz-question button {
  font-size: 16px;
  padding: 4px 8px;
  margin: 2px;
}

/* ================= MATCHING ================= */
.matching-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}
.matching-box {
  flex: 1;
  min-height: 200px;
  border: 2px dashed #ccc;
  padding: 10px;
  border-radius: 10px;
  background-color: #fafafa;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
#matching-section .drag-item {
  flex: 1 1 45%;
  height: 50px;
  border: 2px solid #666;
  background: #eee;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  box-sizing: border-box;
}
.matched-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
}
.pair {
  padding: 5px 8px;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  gap: 4px;
  align-items: center;
}
.pair .sep { font-weight: bold; }
</style>
</head>

<body>
<h2>Ngā Kupu Hanga Rerenga Tools</h2>

<div id="category-selector">
  <label for="category">Select Category: </label>
  <select id="category" onchange="updateContent()">
    <option value="tense">⏳ Tense – Ngā Wā</option>
    <option value="place">📍 Place – Ngā Wāhi</option>
    <option value="pronouns">🙋 Pronouns – Ngā Kīanga Tangata</option>
    <option value="joiners">🔗 Joiners – Ngā Kōhono</option>
  </select>
</div>

<h3>Flashcards</h3>
<div id="flashcards-section"></div>

<h3>Quiz</h3>
<div id="quiz-section"></div>

<h3>Matching - CLICK - CLICK</h3>
<div id="matching-section"></div>

<script>
// Vocabulary data organized by categories
const data = {
  tense: [
    ["āianei", "now"],
    ["ināianei", "right now"],
    ["āpōpō", "tomorrow"],
    ["inapō", "last night"],
    ["inanahi", "yesterday"],
    ["inā tata", "soon"],
    ["ā muri ake nei", "later on"],
    ["i mua", "before"],
    ["ināianei tonu", "just now"],
    ["ā tērā wiki", "next week"],
    ["i tērā wiki", "last week"]
  ],

  place: [
    ["kei konei", "here (near me)"],
    ["kei reira", "there (near you)"],
    ["kei korā", "there (further away)"],
    ["kei konā", "there (by you)"],
    ["kei kō", "over there"],
    ["kei waho", "outside"],
    ["kei roto", "inside"],
    ["kei runga", "on top"],
    ["kei raro", "underneath"],
    ["kei te kāinga", "at home"],
    ["kei te kura", "at school"]
  ],

  pronouns: [
    ["au / ahau", "I, me"],
    ["koe", "you (1 person)"],
    ["ia", "he / she"],
    ["tāua", "we two (you & I)"],
    ["māua", "we two (not you)"],
    ["koutou", "you (3+)"],
    ["tātou", "we all (including you)"],
    ["mātou", "we all (excluding you)"],
    ["rātou", "they (3+)"],
    ["tōku", "my (singular)"],
    ["ōku", "my (plural)"],
    ["tāu", "your (1)"],
    ["ōu", "your (many)"]
  ],

  joiners: [
    ["me", "and (joining nouns/verbs)"],
    ["ā", "and then / and (time sequence)"],
    ["engari", "but / however"],
    ["nō reira", "therefore / so"],
    ["nō te mea", "because"],
    ["kia", "so that / let it be"],
    ["ahakoa", "although / even though"],
    ["mehemea", "if"],
    ["mēnā", "if"],
    ["otirā", "but rather / however"]
  ]
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* ========== FLASHCARDS ========== */
function showFlashcards(category) {
  const container = document.getElementById('flashcards-section');
  container.innerHTML = '';
  const categoryData = data[category] || [];
  if (categoryData.length === 0) return container.textContent = 'No data found';

  const seen = new Set();
  const uniqueCards = [];
  const shuffled = shuffleArray([...categoryData]);
  for (let row of shuffled) {
    if (!seen.has(row[0])) {
      uniqueCards.push(row);
      seen.add(row[0]);
    }
    if (uniqueCards.length >= 12) break;
  }

  uniqueCards.forEach(row => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = row[0];
    card.onclick = () => {
      if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.textContent = row[1];
      } else {
        card.classList.remove('flipped');
        card.textContent = row[0];
      }
    };
    container.appendChild(card);
  });
}

/* ========== QUIZ ========== */
function showQuiz(category) {
  const container = document.getElementById('quiz-section');
  container.innerHTML = '';
  const categoryData = data[category] || [];
  if (categoryData.length === 0) return container.textContent = 'No data found';

  const shuffled = shuffleArray([...categoryData]);
  const questions = shuffled.slice(0, Math.min(12, shuffled.length));

  questions.forEach((row, i) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    qDiv.innerHTML = `<b>Q${i+1}: ${row[0]}</b><br>`;
    const distractors = [];
    while (distractors.length < 3) {
      const r = categoryData[Math.floor(Math.random() * categoryData.length)][1];
      if (r !== row[1] && !distractors.includes(r)) distractors.push(r);
    }
    const options = shuffleArray([row[1], ...distractors]);
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.onclick = () => {
        if (btn.disabled) return;
        if (opt === row[1]) {
          btn.style.backgroundColor = 'lightgreen';
        } else {
          btn.style.backgroundColor = 'lightcoral';
        }
        [...qDiv.querySelectorAll('button')].forEach(b => b.disabled = true);
      };
      qDiv.appendChild(btn);
    });
    container.appendChild(qDiv);
  });
}

/* ========== MATCHING (Click-Click) ========== */
function showMatching(category) {
  const container = document.getElementById('matching-section');
  container.innerHTML = '';
  const categoryData = data[category] || [];
  const shuffled = shuffleArray([...categoryData]);
  const pairs = shuffled.slice(0, 12).filter(row => row[0] && row[1]);
  if (pairs.length === 0) return container.textContent = 'No data found';

  const matchingContainer = document.createElement('div');
  matchingContainer.className = 'matching-container';
  container.appendChild(matchingContainer);

  const leftCol = document.createElement('div');
  leftCol.className = 'matching-box';
  const rightCol = document.createElement('div');
  rightCol.className = 'matching-box';
  matchingContainer.appendChild(leftCol);
  matchingContainer.appendChild(rightCol);

  const leftWords = pairs.map(p => p[0]);
  const rightWords = shuffleArray(pairs.map(p => p[1]));

  let firstSelection = null;
  const palette = ['#FFB3B3', '#FFD1A3', '#FFF3A3', '#C9F7B5', '#B7F0F6', '#C9C6FF', '#F7B3FF', '#DE85A6','#F0A326', '#E9FC6D', "#28992a", "#43a6e8" ];
  let colorIndex = 0;

  function createBox(word, side) {
    const div = document.createElement('div');
    div.className = 'drag-item';
    div.innerText = word;
    div.dataset.side = side;
    div.dataset.word = word;
    div.onclick = () => handleClick(div);
    return div;
  }

  function handleClick(box) {
    if (!firstSelection) {
      firstSelection = box;
      box.style.border = '2px solid blue';
    } else if (box.dataset.side !== firstSelection.dataset.side) {
      const leftWord = firstSelection.dataset.side === 'left' ? firstSelection.dataset.word : box.dataset.word;
      const rightWord = firstSelection.dataset.side === 'right' ? firstSelection.dataset.word : box.dataset.word;
      const correctRight = pairs.find(p => p[0] === leftWord)?.[1];
      if (rightWord === correctRight) {
        const color = palette[colorIndex % palette.length];
        colorIndex++;
        [firstSelection, box].forEach(el => {
          el.style.backgroundColor = color;
          el.onclick = null;
        });
        const pairChip = document.createElement('div');
        pairChip.className = 'pair';
        pairChip.style.backgroundColor = color;
        pairChip.innerHTML = `<span>${leftWord}</span><span class="sep">↔</span><span>${rightWord}</span>`;
        container.insertBefore(pairChip, matchingContainer);
      } else {
        [firstSelection, box].forEach(el => {
          el.style.backgroundColor = 'lightcoral';
          setTimeout(() => el.style.backgroundColor = '#eee', 500);
        });
      }
      firstSelection.style.border = '';
      firstSelection = null;
    }
  }

  leftWords.forEach(w => leftCol.appendChild(createBox(w, 'left')));
  rightWords.forEach(w => rightCol.appendChild(createBox(w, 'right')));
}

/* ========== UPDATE CONTENT BASED ON DROPDOWN ========== */
function updateContent() {
  const category = document.getElementById('category').value;
  showFlashcards(category);
  showQuiz(category);
  showMatching(category);
}

// Initialize with default category
updateContent();
</script>
</body>
</html>