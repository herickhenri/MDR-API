import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma.js";

export async function postLogError(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const logErrorBodySchema = z.object({
      error: z.string(),
      info: z.string(),
      userAgent: z.string(),
      url: z.url(),
    })

    const logError = logErrorBodySchema.parse(request.body)

    await prisma.logErrors.create({
      data: logError
    })
    
    return reply.status(204).send()
}