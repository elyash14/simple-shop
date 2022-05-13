const express = require("express");
const cors = require("cors");
const users = require("./data/user.json");
const products = require("./data/products.json");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  setTimeout(() => {
    // check email and password exist in request
    if (!email || !password) {
      const validationErrors = {
        hasError: true,
        message: "Validation Error",
        errors: {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
        },
      };
      res.status(400).send(validationErrors);
    } else {
      // check user with this credentials exists in users.json
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!user) {
        res.status(404).send({
          hasError: true,
          message: "User by this email not found",
        });
      }
      if (user) {
        if (user.password === password) {
          const { password, ...rest } = user;
          res.status(200).send({
            hasError: false,
            message: "Successful",
            payload: rest,
          });
        } else {
          res.status(409).send({
            hasError: true,
            message: "Password is wrong",
          });
        }
      }
    }
  }, 500);
});

app.get("/products", (req, res) => {
  setTimeout(() => {
    res.status(200).send({
      hasError: false,
      payload: products,
    });
  }, 500);
});

app.listen(9000);
