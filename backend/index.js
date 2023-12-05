const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const cors = require("cors");

const port = 3500;
const db = new sqlite3.Database("./stock.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.code + "\n" + err.message);
  }
  console.log("Connected to the stock database.");
});

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:8100",
  methods: ["GET", "POST", "PUT", "DELETE"],
  headers: ["Content-Type", "Authorization"],
};
// CORS middleware
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const getLoginQuery = "SELECT * FROM login WHERE username = ?";
const getStockQuery = "SELECT * FROM stock WHERE id = ?";
const getStocksQuery = "SELECT * FROM stock";
const deleteStockQuery = "DELETE FROM stock WHERE id = ?";
const insertStockQuery =
  "INSERT INTO stock (stockCode, stockName, stockDesc, stockQty)  VALUES (?,?,?,?);";
const updateStockQuery =
  "UPDATE stock SET stockCode = ?, stockName = ?, stockDesc = ?, stockQty = ? WHERE id = ?";

// GET login credentials by username
app.get("/login/", (req, res) => {
  db.get(getLoginQuery, [req.query.username], (err, row) => {
    if (err) {
      console.error(err.message);
      res.json({ ok: false });
    } else {
      if (row.password === req.query.password) {
        res.json({ ok: true });
      } else {
        res.json({ ok: false });
      }
    }
  });
});

// GET stock item by id
app.get("/stock/:id", (req, res) => {
  db.get(getStockQuery, [req.params.id], (err, row) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(row);
    }
  });
});

// GET all stock items
app.get("/stock/", (req, res) => {
  db.all(getStocksQuery, (err, rows) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(rows);
    }
  });
});

// POST stock item
app.post("/stock/", (req, res) => {
  db.run(
    insertStockQuery,
    [
      req.body.stockCode,
      req.body.stockName,
      req.body.stockDesc,
      req.body.stockQty,
    ],
    (err) => {
      if (err) {
        res.json({ ok: false });
      } else {
        res.status(200).json({ ok: true });
      }
    }
  );
});

// DELETE stock item
app.delete("/stock/:id", (req, res) => {
  db.run(deleteStockQuery, [req.params.id], (err) => {
    if (err) {
      res.json({ ok: false });
    } else {
      res.status(200).json({ ok: true });
    }
  });
});

// PUT stock item
app.put("/stock/:id", (req, res) => {
  db.run(
    updateStockQuery,
    [
      req.body.stockCode,
      req.body.stockName,
      req.body.stockDesc,
      req.body.stockQty,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.json({ ok: false });
      } else {
        res.status(200).json({ ok: true });
      }
    }
  );
});

//  @TEST RUN
// db.run(`INSERT INTO stock (stockCode, stockName, stockDesc, stockQty)  VALUES (?,?,?,?);`,
// [
//   "TEST",
//   "Test Stock",
//   "This is a test stock item.",
//   999
// ]
// , (err) => {
//   if (err) {
//     return console.error(err.code + "\n" + err.message);
//   }
//   console.log("Test run successful.");
// });
