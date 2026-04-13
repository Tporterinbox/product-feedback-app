// export default function AddFeedback() {
//     return (
//       <div id="root">
//         <div className="AddFeedback-page-wrapper">
//           <a href="/">Go Back</a>
  
//           <form>
//             <div id="plus">
//               <span>+</span>
//             </div>
  
//             <h1>Create New Feedback</h1>
  
//             <div className="input-wrapper">
//               <label htmlFor="title" id="label-title">
//                 Feedback Title
//               </label>
//               <span id="description-title">
//                 Add a short, descriptive headline
//               </span>
//               <input id="title" type="text" name="title" />
//             </div>
  
//             <div className="input-wrapper">
//               <label htmlFor="category" id="label-category">
//                 Category
//               </label>
//               <span id="description-category">
//                 Choose a category for your feedback
//               </span>
//               <select id="category" name="category">
//                 <option value="ui">UI</option>
//                 <option value="ux">UX</option>
//                 <option value="enhancement">Enhancement</option>
//                 <option value="bug">Bug</option>
//                 <option value="feature">Feature</option>
//               </select>
//             </div>
  
//             <div className="input-wrapper">
//               <label htmlFor="detail" id="label-detail">
//                 Feedback Detail
//               </label>
//               <span id="description-detail">
//                 Include any specific comments on what should be improved, added, etc.
//               </span>
//               <textarea id="detail" name="detail"></textarea>
//             </div>
  
//             <div className="buttons">
//               <button type="reset" className="cancel">Cancel</button>
//               <button type="submit" className="add-feedback">Add Feedback</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }


import { useState } from "react";

export default function AddFeedback() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("ui");
  const [detail, setDetail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFeedback = {
      feedback_title: title,
      category: category,
      feedback_detail: detail,
    };

    try {
      const res = await fetch(
        "http://localhost:3000/api/add-one-suggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        }
      );

      const data = await res.json();
      console.log("Saved:", data);

      // optional: reset form
      setTitle("");
      setCategory("ui");
      setDetail("");

      alert("Feedback submitted!");

    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="AddFeedback-page-wrapper">
      <a href="/">Go Back</a>

      <form onSubmit={handleSubmit}>
        <div id="plus">
          <span>+</span>
        </div>

        <h1>Create New Feedback</h1>

        {/* TITLE */}
        <div className="input-wrapper">
          <label htmlFor="title">Feedback Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="input-wrapper">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
          </select>
        </div>

        {/* DETAIL */}
        <div className="input-wrapper">
          <label htmlFor="detail">Feedback Detail</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>

        <div className="buttons">
          <button type="reset" className="cancel">
            Cancel
          </button>
          <button type="submit" className="add-feedback">
            Add Feedback
          </button>
        </div>
      </form>
    </div>
  );
}