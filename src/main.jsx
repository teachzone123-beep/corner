
import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { exercises, beginnerPlan } from "./data/exercises";
import "./style.css";

const STORAGE = {
  profile: "corner.web.profile",
  history: "corner.web.history"
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

const navigation = [
  ["home", "Home", "⌂"],
  ["train", "Train", "◈"],
  ["calendar", "Calendar", "▦"],
  ["progress", "Progress", "↗"],
  ["profile", "Profile", "◉"]
];

function App() {
  const [page, setPage] = useState("home");

  const [profile, setProfile] = useState(() =>
    readStorage(STORAGE.profile, { name: "Athlete" })
  );

  const [history, setHistory] = useState(() =>
    readStorage(STORAGE.history, [])
  );

  const [selected, setSelected] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const todayPlan = beginnerPlan[(new Date().getDay() + 6) % 7];

  const todayExercises = useMemo(
    () => todayPlan.ids
      .map(id => exercises.find(item => item.id === id))
      .filter(Boolean),
    [todayPlan]
  );

  const [session, setSession] = useState([]);
  const [sessionIndex, setSessionIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE.profile, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE.history, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (!running || finished) return;

    const timer = setInterval(() => {
      setRemaining(value => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [running, finished]);

  useEffect(() => {
    if (running && remaining === 0 && session.length > 0) {
      nextExercise();
    }
  }, [remaining, running]);

  function startWorkout(list) {
    if (!list.length) return;

    setSession(list);
    setSessionIndex(0);
    setSelected(list[0]);
    setRemaining(list[0].seconds);
    setFinished(false);
    setRunning(true);
    setPage("workout");
  }

  function nextExercise() {
    const next = sessionIndex + 1;

    if (next >= session.length) {
      completeWorkout();
      return;
    }

    setSessionIndex(next);
    setSelected(session[next]);
    setRemaining(session[next].seconds);
  }

  function completeWorkout() {
    setRunning(false);
    setFinished(true);

    setHistory(current => [
      ...current,
      {
        date: dateKey(),
        title: todayPlan.title,
        minutes: Math.max(
          1,
          Math.round(
            session.reduce((sum, item) => sum + item.seconds, 0) / 60
          )
        )
      }
    ]);
  }

  function openExercise(exercise) {
    startWorkout([exercise]);
  }

  const categories = [
    "All",
    ...new Set(exercises.map(item => item.category))
  ];

  const filteredExercises = exercises.filter(item => {
    const matchesCategory =
      category === "All" || item.category === category;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const earned = [
    ["First Step", 1],
    ["Getting Steady", 3],
    ["In the Groove", 7],
    ["Cornerstone", 14]
  ].filter(item => history.length >= item[1]);

  const completedToday = history.filter(
    item => item.date === dateKey()
  ).length;

  function Header() {
    return (
      <header className="header">
        <div>
          <div className="logo">CORNER<span>.</span></div>
          <div className="tag">TRAIN · PROGRESS · REPEAT</div>
        </div>
        <div className="header-status">
          <span className="status-dot" />
          YOUR TRAINING SPACE
        </div>
      </header>
    );
  }

  function Home() {
    return (
      <div className="page-content">
        <div className="welcome">
          <div className="eyebrow">WELCOME TO YOUR CORNER</div>
          <h1>Hey, {profile.name || "Athlete"}.</h1>
          <p>Move at your pace. Build consistency. Rest is progress too.</p>
        </div>

        <div className="dashboard-grid">
          <section className="glass-card today-card">
            <div className="eyebrow">TODAY'S SESSION</div>
            <div className="hero-title">{todayPlan.title}</div>
            <p>
              {todayExercises.length
                ? `${todayExercises.length} movements · Comfortable pace`
                : "A recovery day. Rest and reset."}
            </p>

            {todayExercises.length > 0 ? (
              <button className="start" onClick={() => startWorkout(todayExercises)}>
                START TRAINING →
              </button>
            ) : (
              <button className="start" onClick={() => setPage("train")}>
                EXPLORE MOVEMENT →
              </button>
            )}
          </section>

          <section className="glass-card stat-card">
            <div className="eyebrow">TOTAL SESSIONS</div>
            <div className="big-number">{history.length}</div>
            <p>Your consistency journey</p>
          </section>

          <section className="glass-card stat-card">
            <div className="eyebrow">TODAY</div>
            <div className="big-number">{completedToday}</div>
            <p>Sessions completed today</p>
          </section>
        </div>

        <section className="glass-card">
          <div className="section-heading">
            <h2>Your weekly plan</h2>
            <button className="text-button" onClick={() => setPage("calendar")}>
              VIEW CALENDAR →
            </button>
          </div>

          <div className="week-grid">
            {beginnerPlan.map((day, index) => {
              const today = (new Date().getDay() + 6) % 7 === index;
              return (
                <div className={`week-day ${today ? "active-day" : ""}`} key={day.day}>
                  <span>{day.day}</span>
                  <div className="week-dot">
                    {day.ids.length ? "●" : "·"}
                  </div>
                  <small>{today ? "TODAY" : day.ids.length ? "MOVE" : "REST"}</small>
                </div>
              );
            })}
          </div>
        </section>

        <section className="glass-card">
          <div className="section-heading">
            <h2>Your training spaces</h2>
          </div>

          <div className="shortcut-grid">
            {[
              ["◈", "Movement Lab", "train"],
              ["▦", "Training Calendar", "calendar"],
              ["↗", "Your Progress", "progress"]
            ].map(([icon, title, destination]) => (
              <button className="shortcut" key={title} onClick={() => setPage(destination)}>
                <span>{icon}</span>
                <strong>{title}</strong>
                <small>EXPLORE →</small>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  function Train() {
    return (
      <div className="page-content">
        <div className="welcome">
          <div className="eyebrow">MOVEMENT LAB</div>
          <h1>Choose your movement.</h1>
          <p>Explore your existing CORNER exercise library.</p>
        </div>

        <input
          className="search-input"
          placeholder="Search movements..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="category-list">
          {categories.map(item => (
            <button
              key={item}
              className={`category ${category === item ? "selected-category" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="exercise-grid">
          {filteredExercises.map(item => (
            <article className="glass-card exercise-card" key={item.id}>
              <div className="exercise-symbol">◈</div>
              <div className="eyebrow">{item.category}</div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="exercise-meta">
                {item.level} · {item.seconds}s
              </div>
              <button className="start" onClick={() => openExercise(item)}>
                START →
              </button>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function Calendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return (
      <div className="page-content">
        <div className="welcome">
          <div className="eyebrow">YOUR CONSISTENCY</div>
          <h1>Training calendar.</h1>
          <p>Completed sessions are saved on this device.</p>
        </div>

        <section className="glass-card">
          <h2>{now.toLocaleDateString("en", { month: "long", year: "numeric" })}</h2>

          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div className="calendar-label" key={i}>{day}</div>
            ))}

            {Array.from({ length: firstDay }, (_, i) => (
              <div key={`blank-${i}`} />
            ))}

            {Array.from({ length: totalDays }, (_, i) => {
              const day = i + 1;
              const key = dateKey(new Date(year, month, day));
              const completed = history.some(item => item.date === key);

              return (
                <div
                  key={day}
                  className={`calendar-day ${completed ? "calendar-complete" : ""} ${day === now.getDate() ? "calendar-today" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </section>

        <section className="glass-card">
          <h2>Training history</h2>
          {history.length === 0 ? (
            <p>No completed sessions yet. Your first session will appear here.</p>
          ) : (
            [...history].reverse().map((item, i) => (
              <div className="history-row" key={`${item.date}-${i}`}>
                <span className="history-check">✓</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.date} · {item.minutes} minutes</small>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    );
  }

  function Progress() {
    const minutes = history.reduce((sum, item) => sum + item.minutes, 0);
    const nextTarget = [1, 3, 7, 14, 21, 30].find(n => n > history.length) || 30;
    const percent = Math.min(100, history.length / nextTarget * 100);

    return (
      <div className="page-content">
        <div className="welcome">
          <div className="eyebrow">YOUR JOURNEY</div>
          <h1>Progress.</h1>
          <p>Every completed session counts.</p>
        </div>

        <div className="dashboard-grid">
          <section className="glass-card stat-card">
            <div className="big-number">{history.length}</div>
            <p>Sessions</p>
          </section>
          <section className="glass-card stat-card">
            <div className="big-number">{minutes}</div>
            <p>Minutes moving</p>
          </section>
        </div>

        <section className="glass-card">
          <h2>Next milestone</h2>
          <div className="big-number">{history.length} / {nextTarget}</div>
          <div className="progress">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <p>Keep a comfortable, sustainable rhythm.</p>
        </section>

        <section className="glass-card">
          <h2>Achievement collection</h2>
          {[
            ["First Step", 1],
            ["Getting Steady", 3],
            ["In the Groove", 7],
            ["Cornerstone", 14]
          ].map(([name, target]) => (
            <div className="history-row" key={name}>
              <span className="history-check">
                {history.length >= target ? "✓" : "◇"}
              </span>
              <div>
                <strong>{name}</strong>
                <small>{history.length >= target ? "Unlocked" : `${target} sessions required`}</small>
              </div>
            </div>
          ))}
          <p className="disclaimer">
            These are digital consistency rewards, not martial arts ranks or certifications.
          </p>
        </section>
      </div>
    );
  }

  function Profile() {
    return (
      <div className="page-content">
        <div className="welcome">
          <div className="eyebrow">YOUR SPACE</div>
          <h1>Profile.</h1>
          <p>Manage your CORNER identity.</p>
        </div>

        <section className="glass-card">
          <div className="avatar">
            {(profile.name || "A").charAt(0).toUpperCase()}
          </div>
          <h2>{profile.name}</h2>
          <label className="profile-label">Your display name</label>
          <input
            className="search-input"
            value={profile.name}
            maxLength={32}
            onChange={e => setProfile({ ...profile, name: e.target.value })}
          />
          <p>Your name is saved locally in this browser.</p>
        </section>

        <section className="glass-card">
          <h2>About CORNER</h2>
          <p>
            CORNER is a home-based movement and wellbeing companion.
            Move at a comfortable pace and take recovery days.
          </p>
        </section>
      </div>
    );
  }

  function Workout() {
    if (finished) {
      return (
        <div className="page-content">
          <section className="glass-card workout-finish">
            <div className="finish-symbol">✓</div>
            <div className="eyebrow">SESSION COMPLETED</div>
            <h1>Well done.</h1>
            <p>You showed up for yourself. Recovery is part of progress.</p>
            <button className="start" onClick={() => {
              setFinished(false);
              setPage("home");
            }}>
              BACK TO HOME →
            </button>
          </section>
        </div>
      );
    }

    if (!selected) return null;

    return (
      <div className="page-content">
        <button className="text-button" onClick={() => {
          setRunning(false);
          setPage("train");
        }}>
          ← LEAVE SESSION
        </button>

        <section className="glass-card workout-panel">
          <div className="eyebrow">
            MOVEMENT {sessionIndex + 1} OF {session.length}
          </div>
          <h1>{selected.name}</h1>
          <p>{selected.description}</p>

          <div className="timer-display">{formatTime(remaining)}</div>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${100 - remaining / selected.seconds * 100}%`
              }}
            />
          </div>

          <h3>Movement guidance</h3>
          {selected.steps.map((step, i) => (
            <p key={i}>{i + 1}. {step}</p>
          ))}

          <div className="modification">
            <strong>Gentler option</strong>
            <p>{selected.modification}</p>
          </div>

          <div className="modification">
            <strong>Safety note</strong>
            <p>{selected.safety}</p>
          </div>

          <div className="workout-actions">
            <button className="secondary" onClick={() => setRunning(v => !v)}>
              {running ? "PAUSE" : "RESUME"}
            </button>
            <button className="start" onClick={nextExercise}>
              SKIP →
            </button>
          </div>

          <button className="text-button" onClick={completeWorkout}>
            FINISH SESSION
          </button>
        </section>
      </div>
    );
  }

  const pages = {
    home: <Home />,
    train: <Train />,
    calendar: <Calendar />,
    progress: <Progress />,
    profile: <Profile />,
    workout: <Workout />
  };

  return (
    <main className="corner">
      <Header />

      {pages[page]}

      {page !== "workout" && (
        <nav className="bottom-nav">
          {navigation.map(([id, label, icon]) => (
            <button
              key={id}
              className={`nav-item ${page === id ? "nav-active" : ""}`}
              onClick={() => setPage(id)}
            >
              <span>{icon}</span>
              <small>{label}</small>
            </button>
          ))}
        </nav>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
