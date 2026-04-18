

// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------
import express from "express";
import pg from "pg";
import cors from "cors";

const { Pool } = pg;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------
// Database Connection (Render-safe)
// ---------------------------------
// const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

const db = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_qa4fxzQwXG0K@ep-fancy-snow-anyqogwr-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false },
});


// ✅ Test DB connection on startup
db.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ---------------------------------
// Helper Functions
// ---------------------------------

async function getAllSuggestions() {
  const result = await db.query("SELECT * FROM suggestions;");
  return result.rows;
}

async function getSuggestionsByCategory(category) {
  const result = await db.query(
    `SELECT * FROM suggestions WHERE LOWER(category) = LOWER($1);`,
    [category]
  );
  return result.rows;
}

async function addOneSuggestion(feedback_title, category, feedback_detail) {
  const result = await db.query(
    `INSERT INTO suggestions (feedback_title, category, feedback_detail)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [feedback_title, category, feedback_detail]
  );
  return result.rows[0];
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Get all suggestions
app.get("/api/get-all-suggestions", async (req, res) => {
  try {
    const suggestions = await getAllSuggestions();
    res.json(suggestions);
  } catch (error) {
    console.error("❌ Error fetching all suggestions:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// ✅ Get suggestions by category
app.get("/api/get-suggestions-by-category/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const suggestions = await getSuggestionsByCategory(category);
    res.json(suggestions);
  } catch (error) {
    console.error("❌ Error fetching suggestions by category:", error);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// ✅ Add one suggestion
app.post("/api/add-one-suggestion", async (req, res) => {
  const { feedback_title, category, feedback_detail } = req.body;

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
    console.error("❌ Error adding suggestion:", error);
    res.status(500).json({
      error: "Failed to add suggestion",
    });
  }
});

// ---------------------------------
// Start Server (MUST BE LAST)
// ---------------------------------
const port = process.env.PORT || 3000;

console.log("ABOUT TO START SERVER...");

app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});