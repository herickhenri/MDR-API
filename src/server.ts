import Fastify from "fastify";
import cors from '@fastify/cors';
import { createManyMDR } from "./controllers/create-many-MDR.js";
import { getManyMDR } from "./controllers/get-many-MDR.js";
import { getFiltersMDR } from "./controllers/get-filters-MDR.js";
import { createSectorMDR } from "./controllers/create-sector-MDR.js";
import { getMDR } from "./controllers/get-MDR.js";
import { env } from "./env/index.js";
import { postLogError } from "./controllers/post-log-error.js";

const app = Fastify()

await app.register(cors, {origin: "*"})

const megabyte = 1024 * 1024

app.post('/MDR/create', {bodyLimit: 5*megabyte}, createManyMDR)
app.post('/sector/create', createSectorMDR)
app.get('/MDR/all', getManyMDR)
app.get('/MDR/:id', getMDR)
app.get('/MDR/filters', getFiltersMDR)
app.post('/log-client-error', postLogError)

app.setErrorHandler((error, _, reply) => {
  console.log(error);

  reply.status(500).send({ message: "Internal server error." });
});


async function start() {
  try {
    await app.listen({port: env.PORT, host: "::"})
    console.log("HTTP Server Running!")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()