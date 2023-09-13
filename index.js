const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
// middleware

app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => res.json("My API is running :-)"));
// CREATE a plant

app.post("/products", async (req, res) => {
  try {
    const { description } = req.body;

    const newPlant = await pool.query(
      "INSERT INTO products (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newPlant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// GET all Plants
app.get("/products", async (req, res) => {
  try {
    const allPlants = await pool.query(
      "SELECT * FROM products ORDER BY product_id ASC"
    );
    res.json(allPlants.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//  GET plant by ID
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "SELECT * FROM products WHERE product_id = $1",
      [id]
    );
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// PUT (update) plant

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateProduct = await pool.query(
      "UPDATE products SET description = $1 WHERE product_id = $2",
      [description, id]
    );
    res.json("Product was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE plant

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlant = await pool.query(
      "DELETE FROM products WHERE product_id =$1",
      [id]
    );
    res.json("Product was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
