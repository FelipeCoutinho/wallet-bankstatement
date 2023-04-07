const Express = require("express");
const cors = require("cors");
const express = Express();
const ejs = require("ejs");
const axios = require("axios");
express.use(cors());

express.set("view engine", "ejs");

express.get("/create/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const bankstatemantResult = await axios.get(
      `http://localhost:3000/api/v1/bankstatemant/${Number(userID)}`
    );

    const data = {
      data: bankstatemantResult.data,
    };

    if (bankstatemantResult.data.length < 1) {
      return res.status(200).send("Nem um registro no banco de dados ");
    }

    ejs.renderFile("relatorio.ejs", data, (err, relatorioRenderized) => {
      if (err) console.log(err);
      console.log(relatorioRenderized);
      return res.send(relatorioRenderized);
    });
  } catch (error) {
    return error.message;
  }
});

express.listen(4000, () => console.log("server on"));
