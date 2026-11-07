
import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #080808;
          color: #fff;
          font-family: Inter, Arial, sans-serif;
        }

        .corner {
          min-height: 100vh;
          padding: 30px;
          animation: fadeIn 0.8s ease;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #292929;
        }

        .logo {
          font-size: 27px;
          font-weight: 900;
          letter-spacing: 4px;
        }

        .tag {
          color: #999;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .hero {
          max-width: 850px;
          margin: 110px auto 0;
          text-align: center;
          animation: slideUp 0.8s ease;
        }

        .hero h1 {
          font-size: clamp(48px, 9vw, 90px);
          font-weight: 900;
          letter-spacing: -4px;
        }

        .hero h1 span {
          color: #a6ff4d;
        }

        .hero p {
          color: #999;
          margin: 20px auto;
          line-height: 1.8;
          max-width: 500px;
        }

        .start {
          margin-top: 25px;
          padding: 17px 35px;
          border: none;
          border-radius: 8px;
          background: #a6ff4d;
          color: #080808;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .start:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px #a6ff4d30;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 600px) {
          .corner { padding: 20px; }
          .hero { margin-top: 100px; }
          .hero h1 { letter-spacing: -2px; }
        }
      `}</style>

      <main className="corner">
        <header className="header">
          <div className="logo">CORNER.</div>
          <div className="tag">TRAIN • PROGRESS • REPEAT</div>
        </header>

        <section className="hero">
          <h1>
            BUILT BY <span>DISCIPLINE.</span>
          </h1>

          <p>
            Your training journey starts here.
            Build consistency, track your progress
            and reach your next level.
          </p>

          <button
            className="start"
            onClick={() => alert("Training dashboard coming soon.")}
          >
            START TRAINING →
          </button>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
