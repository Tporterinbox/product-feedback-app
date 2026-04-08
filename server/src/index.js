// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import pg from "pg";
import config from "./config.js";

const db = new pg.Pool({
  connectionString: config.databaseUrl + "&uselibpqcompat=true",
  ssl: true,
});

const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// ---------------------------------
// Helper Functions
// ---------------------------------


// getAllSuggestions Helper Function
async function getAllSuggestions() {
    //  gets all suggestions
      const result = await db.query("SELECT * FROM suggestions;");
      return result.rows;
    }


// getSuggestionsByCategory  Helper Function-- Dynamic 
// This Dynamic Helper Function serves all of the categories
// Get suggestions by category (dynamic)
async function getSuggestionsByCategory(category) {
    const result = await db.query(
      `SELECT * FROM suggestions
       WHERE LOWER(category) = LOWER($1);`,
      [category]
    );
    return result.rows;
  }

 // addOneSuggestion Helper Function 
// addOneSuggestion Helper Function 
async function addOneSuggestion(
    feedback_title,
    category,
    feedback_detail
  ) {
    const result = await db.query(
      `INSERT INTO suggestions (feedback_title, category, feedback_detail)
       VALUES ($1, $2, $3)
       RETURNING *;`,
      [
        feedback_title,
        category,
        feedback_detail
      ]
    );
  
    return result.rows[0];
  }
  //   Note: VALUES + RETURNING is only for INSERT when adding "info:
 //  Only need to add parameter when you are inserting info into a table 
 // use req.body  when inserting info.

// -------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------
// API Endpoints
// ----------------------------------------------------------------


// Endpoint for /get-all-suggestions
app.get("/api/get-all-suggestions", async (req, res) => {
    const suggestions = await getAllSuggestions();
    res.json(suggestions);
  });
  

//   ---------

//   Endpoint for /get-suggestions-by-category/:category

// GET suggestions by category
// This endpoint is dynamic and works for using multiple categories

app.get("/api/get-suggestions-by-category/:category", async (req, res) => {
    const { category } = req.params;
  
    try {
      const suggestions = await getSuggestionsByCategory(category);
      res.json(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  });
// ---when checking/testing endpoint call---- :
// /api/get-suggestions-by-category/UI
// /api/get-suggestions-by-category/UX
// /api/get-suggestions-by-category/Bug
// /api/get-suggestions-by-category/Feature
// /api/get-suggestions-by-category/Enhancement

// ----------


// //  Endpoint for /add-one-suggestion
//   app.post("/api/add-one-suggestion", async (req, res) => {
//     const {
//         feedback_title,
//         category,
//         feedback_detail
      
//     } = req.body;
  
//     const suggestion = await addOneSuggestion(
//         feedback_title,
//         category,
//         feedback_detail

//     );
  
//     // res.send(`Success! Suggestion has been added.`);
//      res.json(suggestion);
//   });
  
// Endpoint for /add-one-suggestion
app.post("/api/add-one-suggestion", async (req, res) => {
    const { feedback_title, category, feedback_detail } = req.body;
  
    // ✅ Validate input
    if (!feedback_title || !category || !feedback_detail) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }
  
    try {
      const suggestion = await addOneSuggestion(
        feedback_title,
        category,
        feedback_detail
      );
  
      res.status(201).json(suggestion);
  
    } catch (error) {
      console.error("Error adding suggestion:", error);
      res.status(500).json({
        error: "Failed to add suggestion",
      });
    }
  });