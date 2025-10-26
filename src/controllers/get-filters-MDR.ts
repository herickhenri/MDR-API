import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

type Filter = {
  unidade: string,
  area: {
    name: string,
    processo: string[],
  }[]
}

export async function getFiltersMDR(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sectors = await prisma.sector.findMany()
  
  const filterMDR = sectors.reduce<Filter[]>((acc, value) => {
    const unidadeIndex = acc.findIndex(({unidade}) => unidade === value.unidade)
    if(unidadeIndex === -1) {
      acc.push({
        unidade: value.unidade,
        area: [{
          name: value.area,
          processo: [value.processo]
        }]
      })

      return acc
    }

    const unidade = acc[unidadeIndex]
    const areaIndex = unidade.area.findIndex((area) => area.name === value.area)

    if(areaIndex === -1) {
      unidade.area.push({
        name: value.area,
        processo: [value.processo]
      })

      return acc
    }

    const area = unidade.area[areaIndex]

    if(!area.processo.includes(value.processo)) {
      area.processo.push(value.processo)
    }

    return acc
  }, [])
  
  return reply.status(200).send({ filterMDR })

}