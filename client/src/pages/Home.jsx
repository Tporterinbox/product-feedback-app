

// pages/Home.jsx
import { useState, useEffect } from "react";
// import emptyIllustration from "../assets/suggestions/illustration-empty.svg";

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("https://product-feedback-app-y2ly.onrender.com/api/get-all-suggestions")
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.log(err));
  }, []);

  // Filter feedback
  const filteredFeedback =
    selectedCategory === "All"
      ? feedback
      : feedback.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div id="root">
      <div className="Home-page-wrapper">

        {/* ----Header----*/}
        <section className="header-container">
          <header>
            <div>
              <h1>My Company</h1>
              <p>Feedback board</p>
            </div>

            <div className="overlay"></div>
            <button className="burger-button"></button>
          </header>
        </section>

        {/* ----Top Bar---- */}
        <div className="suggestions-heading">
          <p>{filteredFeedback.length} suggestions</p>

          <a href="/add-feedback">
            <button className="add-feedback">+ Add Feedback</button>
          </a>
        </div>

        {/* ----Category Filter---*/}
        <search className="categories">
          <button
            className={selectedCategory === "All" ? "active" : ""}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>

          <button
            className={selectedCategory === "UI" ? "active" : ""}
            onClick={() => setSelectedCategory("UI")}
          >
            UI
          </button>

          <button
            className={selectedCategory === "UX" ? "active" : ""}
            onClick={() => setSelectedCategory("UX")}
          >
            UX
          </button>

          <button
            className={selectedCategory === "Enhancement" ? "active" : ""}
            onClick={() => setSelectedCategory("Enhancement")}
          >
            Enhancement
          </button>

          <button
            className={selectedCategory === "Bug" ? "active" : ""}
            onClick={() => setSelectedCategory("Bug")}
          >
            Bug
          </button>

          <button
            className={selectedCategory === "Feature" ? "active" : ""}
            onClick={() => setSelectedCategory("Feature")}
          >
            Feature
          </button>
        </search>

        {/* Suggestions / Empty State - for no feedback yet */}
        <div className="Suggestion">
          {filteredFeedback.length === 0 ? (
            <div className="no-feedback">
              <div>
              {/* <img
          src={emptyIllustration}
          alt="No feedback illustration"
          /> */}

                <h3 className="title">There is no feedback yet</h3>
                <p>Got a suggestion? Found a bug that needs to be squashed? we love hearing about new ideas to improve our app.</p>
                <p>
                  {selectedCategory === "All"
                    ? "There is no feedback yet."
                    : `No ${selectedCategory} feedback yet.`}
                </p>

                <a href="/add-feedback">
                  <button className="add-feedback">
                    + Add Feedback
                  </button>
                </a>
              </div>
            </div>
          ) : (
            filteredFeedback.map((item) => (
              <div
                className="suggestion-card"
                key={item.id || item._id}
              >
                <h3 className="title">{item.feedback_title}</h3>
                <p className="detail">{item.feedback_detail}</p>

                <button className="category" disabled>
                  {item.category}
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}



