import { Condominium } from '../types/condominium'
import { classifySize } from '../utils/classify'

const DATAUSA_URL =
  'https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population&include=Year:2023&limit=100,0'

interface DataUsaRecord {
  'State ID': string
  State: string
  Year: number
  Population: number
}

interface DataUsaResponse {
  data: DataUsaRecord[]
}

export async function fetchCondominiums(): Promise<Condominium[]> {
  const response = await fetch(DATAUSA_URL)

  if (!response.ok) {
    throw new Error(`DataUSA retornou status ${response.status}`)
  }

  const body = (await response.json()) as DataUsaResponse

  if (!Array.isArray(body.data)) {
    throw new Error('Resposta da DataUSA sem array data')
  }

  return body.data.map((record) => ({
    id: record['State ID'],
    name: record.State,
    residents: record.Population,
    size: classifySize(record.Population),
  }))
}
