// pages/Home.jsx
// view all of the suggestions on this page
import { useState, useEffect } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // // // for button, creates border when clicked
  // const [activeCategory, setActiveCategory] = useState(null);



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

    <div className="overlay"></div>
    <button className="burger-button"> </button>
    </header>

     </section>

  {/* Heading to the right side of page  */}
  <div className = "suggestions-heading">

    {/* Suggestion Counter */}
    <p>{filteredFeedback.length} suggestions</p>

        {/* <h2> suggestions</h2> */}
        <a href="/add-feedback" data-discover="true"> 
        <button className= "add-feedback"> + Add Feedback </button>
        </a>
       </div>

   
<search className="categories">
        {/* rendering the data -
       {/* CATEGORY BUTTONS  */}

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

     <div className="Suggestion">
  {filteredFeedback.map((item) => (
    <div className="suggestion-card" key={item.id || item._id}>
      <h3 className="title">{item.feedback_title}</h3>
      <p className="detail">{item.feedback_detail}</p>
      <button className="category" disabled>
  {item.category}
</button>
      
    </div>
  ))}
</div>
 {/* ------------ */}

         
       {/* <main className="Suggestions">
      
       </main> */}

       </div>
      </div>
    
    );
  }





