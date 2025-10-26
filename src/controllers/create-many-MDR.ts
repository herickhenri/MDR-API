import { FastifyReply, FastifyRequest } from "fastify";
import z, { optional } from "zod";
import { prisma } from "../lib/prisma.js";
import cuid from "cuid";
import { Danger, Mdr, Risk } from "@prisma/client";

export async function createManyMDR(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const MDRBodySchema = z.array(z.object({
    sectorUnidade: z.string().transform((unidade) => unidade.replace("/", "|")),
    sectorArea: z.string().transform((area) => area.replace("/", "|")),
    sectorProcesso: z.string().transform((processo) => processo.replace("/", "|")),
    titulo: z.string(),
    tarefa: z.string(),
    situacaoOp: z.string(),
    cargos: z.array(z.string()),
    GHE: z.string().nullable().default(null),
    crit44Exposicao: z.string(),
    perigos: z.array(z.object({
      tipo: z.string(),
      riscos: z.array(z.object({
        tipo: z.string(),
        crit1Lesao: z.array(z.string()),
        crit31NaturDoRisc: z.string(),
        crit41Prob: z.string(),
        crit42SitControl: z.string(),
        crit42Concentracao: z.string(),
        crit4Severidade: z.string(),
        controlOp: z.array(z.string()),
        calculo: z.number(),
        significanciaRisco: z.string(),  
      })),
    })),
    partesInteressadas: z.string().nullable().default(null),
    responsavel: z.string().nullable().default(null),
    editores: z.string().nullable().default(null),
    aprovadores: z.string().nullable().default(null),
    linkAprovacao: z.string().nullable().default(null),
  }))

  const data = MDRBodySchema.parse(request.body)

  const dangers: Danger[] = []
  const risks: Risk[] = []

  const mdr: Mdr[] = data.map(({ perigos, ...mdr }) => {
    const mdrId = cuid()
  
    const danger = perigos.map(({riscos, ...perigo}) => {
      const dangerId = cuid()

      const risk = riscos.map((risco) => {
        const riskId = cuid()

        return ({...risco, dangerId, id: riskId})
      })

      risks.push(...risk)

      return ({...perigo, mdrId, id: dangerId })
    })

    dangers.push(...danger)

    return {...mdr, id: mdrId,}
  })

  await Promise.all(
    mdr.map(({sectorUnidade, sectorArea, sectorProcesso,...data}) => (
      prisma.mdr.create({
        data: {
          ...data,
          sector: {
            connect: {
              unidade_area_processo: {
                unidade: sectorUnidade,
                area: sectorArea,
                processo: sectorProcesso,
              }
            }
          }
        },
      })
    ))
  )

  await prisma.danger.createMany({
    data: dangers,
  })

  await prisma.risk.createMany({
    data: risks,
  })

  reply.status(201).send({message: "created"})
}