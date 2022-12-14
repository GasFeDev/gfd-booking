/* express: Marco de desarrollo minimalista para Node.js que permite estructurar una aplicación de una manera ágil, nos proporciona funcionalidades como el enrutamiento, opciones para gestionar sesiones y cookies, etc. */
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import path from "path";
const __dirname = path.resolve();
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(
  cors()
); /* Se aplica para prevenir que el dominio A evite acceder a recursos del dominio B usando solicitudes del tipo AJAX como cuando usamos fetch() o XMLHttpRequest.
Un ejemplo básico de este comportamiento es cuando creas un archivo html y tratas de hacer una llamada AJAX a cualquier sitio en internet o servidor en tu equipo o red local (Se obtiene un error).
Si tenemos dos dominios: posco.com y contaro.com en principio no pueden comunicarse. Si nosotros queremos que por ejemplo contaro.com pueda permitir a otros dominios acceder a sus recursos, podemos hacerlo a través del módulo de cors. */
app.use(
  cookieParser()
); /* Nos permite configurar cookies dentro de nuestro servidor. Las cookies nos permiten almacenar información en el navegador del usuario.*/
app.use(
  express.json()
); /* Es una función de middleware incorporada en Express. Analiza las requests entrantes con cargas útiles JSON y se basa en body-parser . */

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});

/* const express = require("express");
const app = express();
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./config/db");
const path = require("path");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");
const cookieParser = require("cookie-parser");
const cors = require("cors"); */
