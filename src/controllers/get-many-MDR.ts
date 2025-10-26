import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma.js";

export async function getManyMDR(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestQuerySchema = z.object({
    sectorUnidade: z.string(),
    sectorArea: z.string(),
    sectorProcesso: z.string(),
  })
  
  const { sectorUnidade, sectorArea, sectorProcesso } = requestQuerySchema.parse(request.query)

  const mdr = await prisma.mdr.findMany({
    where: {sectorUnidade, sectorArea, sectorProcesso}
  })

  return reply.status(200).send({ mdr })
}