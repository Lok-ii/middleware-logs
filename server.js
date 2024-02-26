const express = require("express");
const productList = require("./products.json");
const fs = require("node:fs");
const { log } = require("node:console");
const app = express();

const writeFile = (logString) => {
  fs.appendFile("access.log", logString + "\n", (err) => {
    if (err) {
      log("Error writing to file: ", err);
      return;
    }
  });
};

app.use((req, res, next) => {
  const time = new Date().getTime();
  log(
    `Request URL: ${req.url}, Time: ${new Date()}, IP: ${req.ip}, timeTaken: ${
      new Date().getTime() - time
    }ms, method: ${req.method}, MY_NAME: LOKESH KATRIA`
  );
  writeFile(
    `Request URL: ${req.url}, Time: ${new Date()}, IP: ${req.ip}, timeTaken: ${
      new Date().getTime() - time
    }ms, method: ${req.method}, MY_NAME: LOKESH KATRIA`
  );
  next(); //Allowed to go inside
});

app.get("/product-list/:id", (req, res) => {
  let id = req.params.id;
  const product = productList.filter((item) => item.id == id);
  const output = {
    success: true,
    product: product[0],
  };

  if (!product[0]) {
    return res.status(404).json({
      success: false,
      message: `Product with Id ${id} not found`,
    });
  }

  res.status(200).json(output);
});

app.get("/product-list", (req, res) => {
  let searchKey = "";
  if (req.query.searchKey) {
    searchKey = req.query.searchKey;
  }
  const filteredResults = productList.filter((item) =>
    item.title.toLowerCase().includes(searchKey.toLowerCase())
  );
  if (filteredResults.length === 0) {
    return res.status(204).json({});
  }

  const output = {
    success: true,
    total: filteredResults.length,
    results: filteredResults,
  };

  res.status(200).json(output);
});

app.post("/product-list", (req, res) => {
  const output = {
    success: true,
    result: [],
    message: "This is a dummy post api",
  };
  res.status(201).json(output);
});

app.get("/order-history", (req, res) => {
  const output = {
    success: true,
    results: [{ productId: 1, quantity: 3 }],
  };

  res.json(output);
});

app.use("*", (req, res) => {
  const output = {
    success: false,
    message: "Route not found",
  };
  res.status(404).json(output);
});

app.listen(4000, () => {
  console.log("Server is up and running on port 5000");
});
