import express from "express";
import mongoose from "mongoose";
import { createDeck, drawCard, openDeck, shuffle } from "./deck";
import { CreateDeckReq, DrawDeckReq, OpenDeckReq, ShuffleDeckReq } from "./types/helpersTypes";
const app = express();
const port = 8080; // default port to listen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;
main().then(() => console.log('connected')).catch(err => console.log(err));
async function main() {
  await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME }`);
}

// define a route handler for the default home page
app.post( "/create", async (req: CreateDeckReq, res) => {
  const {type, shuffled} = req.body;
  res.send(await createDeck(type, shuffled));
} );

app.post("/open", async (req: OpenDeckReq , res) => {
  res.send(await openDeck(req.body.uuid));
} );

app.post("/shuffle", async (req: ShuffleDeckReq , res) => {
  res.send(await shuffle (req.body.uuid));
} );

app.post("/draw", async (req: DrawDeckReq , res) => {
  const {uuid, amount} = req.body;
  try {
    res.send(await drawCard(uuid, amount));
  }
  catch(e) {
    res.send(401);
  }
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
