// pages/Home.jsx
// view all of the suggestions on this page
import { useState, useEffect } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/api/get-all-suggestions")
      .then((res) => res.json())
      .then((data) => setFeedback(data))
      .catch((err) => console.log(err));
  }, []);
  
    //  Filter from API data
    const filteredFeedback =
    selectedCategory === "All"
      ? feedback
      : feedback.filter(
          (item) =>
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        );

    return (

    <div id="root">
      <div className = "Home-page-wrapper">

      <section className="header-container">

<header>
  <div>
    <h1>My Company</h1>
    <p>Feedback board</p>
    </div>

    <div class="overlay"></div>
    <button className="burger-button"> </button>
    </header>

     </section>

  {/* Heading to the right side of page  */}
  <div className = "suggestions-heading">
        <h2> suggestions</h2>
        <a href="/add-feedback" data-discover="true"> 
        <button className= "add-feedback"> + Add Feedback </button>
        </a>
       </div>

   
<search class="categories">
        {/* rendering the data --keep these buttons,    was                 <div className=categories></div> */}
       {/* CATEGORY BUTTONS  */}
       <button onClick={() => setSelectedCategory("All")}>All</button>
      <button onClick={() => setSelectedCategory("UI")}>UI</button>
      <button onClick={() => setSelectedCategory("UX")}>UX</button>
      <button onClick={() => setSelectedCategory("Bug")}>Bug</button>
      <button onClick={() => setSelectedCategory("Feature")}>Feature</button>
      <button onClick={() => setSelectedCategory("Enhancement")}>Enhancement</button> 
       </search>

       <div class="Suggestion">
      {/* FEEDBACK LIST, map over data  */}
      {filteredFeedback.map((item) => (
        <div key={item.id || item._id}>
          <h3>{item.feedback_title}</h3>
          <p>{item.category}</p>
          <p>{item.feedback_detail}</p>
        </div>
        ))}
    </div>
 {/* ------------ */}

         
       <main className="Suggestions">
      
       </main>

       </div>
      </div>
    
    );
  }