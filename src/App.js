import { useState } from "react";
import "./styles.css";

export default function ImmobilisaatioPeli() {
  const difficultyLevels = {
    helppo: [
      {
        q: "Mikä on immobilisaation ensisijainen tavoite?",
        img: "https://via.placeholder.com/300x150?text=Tavoite",
        options: [
          "Ehkäistä liiallista liikkumista ja turvata paraneminen",
          "Lisätä potilaan liikkumista",
          "Helpottaa nukkumista",
          "Vähentää ruokahalua"
        ],
        correct: 0
      },
      {
        q: "Mikä on yleinen immobilisaation haitta?",
        img: "https://via.placeholder.com/300x150?text=Haitta",
        options: [
          "Syvä laskimotukos (DVT)",
          "Luuston vahvistuminen",
          "Sydämen koon kasvu",
          "Ruokahalun lisääntyminen"
        ],
        correct: 0
      }
    ],
    keskivaikea: [
      {
        q: "Miten hoitaja ehkäisee painehaavoja?",
        img: "https://via.placeholder.com/300x150?text=Painehaavat",
        options: [
          "Säännöllinen asennonvaihto",
          "Nesteytyksen vähentäminen",
          "Vältetään liikkumista",
          "Kiristetään sidokset tiukalle"
        ],
        correct: 0
      }
    ],
    vaikea: [
      {
        q: "Mikä on immobilisaation aiheuttama neuro‑muskulaarinen muutos?",
        img: "https://via.placeholder.com/300x150?text=Lihasmuutokset",
        options: [
          "Lihasatrofia",
          "Lihasten hypertrofia",
          "Tasapainon paraneminen",
          "Refleksien voimistuminen"
        ],
        correct: 0
      }
    ]
  };

  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function startGame(level) {
    setDifficulty(level);
    setQuestions(difficultyLevels[level]);
    setIndex(0);
    setScore(0);
    setFinished(false);
  }

  function answer(i) {
    if (i === questions[index].correct) setScore(score + 1);
    if (index + 1 < questions.length) setIndex(index + 1);
    else setFinished(true);
  }

  return (
    <div className="App">
      <h1>Immobilisaatiohoitotyön peli</h1>

      {!difficulty && (
        <div>
          <h2>Valitse vaikeustaso</h2>
          <button onClick={() => startGame("helppo")}>Helppo</button>
          <button onClick={() => startGame("keskivaikea")}>Keskivaikea</button>
          <button onClick={() => startGame("vaikea")}>Vaikea</button>
        </div>
      )}

      {difficulty && !finished && (
        <div>
          <h2>{questions[index].q}</h2>
          <img
            src={questions[index].img}
            alt="kysymys"
            style={{ width: "100%", borderRadius: "8px" }}
          />

          {questions[index].options.map((opt, i) => (
            <button key={i} onClick={() => answer(i)}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {difficulty && finished && (
        <div>
          <h2>Peli valmis!</h2>
          <p>
            Tuloksesi: {score} / {questions.length}
          </p>
          <button onClick={() => setDifficulty(null)}>Palaa alkuun</button>
        </div>
      )}
    </div>
  );
}