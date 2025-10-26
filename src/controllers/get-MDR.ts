import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma.js";

export async function getMDR(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = requestParamsSchema.parse(request.params)

  const mdr = await prisma.mdr.findUnique({
    where: {id},
    include: {
      perigos: {
        include: {
          riscos: true
        }
      },
    }
  })

  return reply.status(200).send({ mdr })
}