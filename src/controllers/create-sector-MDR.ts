import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma.js";

export async function createSectorMDR(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const sectorBodySchema = z.object({
        sectorUnidade: z.string().transform((unidade) => unidade.replace("/", "|")),
        sectorArea: z.string().transform((area) => area.replace("/", "|")),
        sectorProcesso: z.string().transform((processo) => processo.replace("/", "|")),
    })

    const sector = sectorBodySchema.parse(request.body)

    try {
      const sectorFind = await prisma.sector.findUnique({
        where: {
          unidade_area_processo: {
            unidade: sector.sectorUnidade,
            area: sector.sectorArea,
            processo: sector.sectorProcesso,
          }
        }
      })

      if(sectorFind) {
        return reply.status(200).send()
      }

      await prisma.sector.create({
        data: {
          area: sector.sectorArea,
          processo: sector.sectorProcesso,
          unidade: sector.sectorUnidade
        }
      })
      
      return reply.status(204).send()
    } catch (err) {
      throw err
    }
}