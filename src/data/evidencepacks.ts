// EXPORTS: IEvidencePack, MOCK_EVIDENCE_PACKS
export interface IEvidencePack {
  id: string
  brand: string
  productLine: string
  fullName: string
  evidenceCount: number
  status: 'active' | 'beta'
}

export const MOCK_EVIDENCE_PACKS: IEvidencePack[] = [
  {
    id: '1',
    brand: 'Dior',
    productLine: 'Le Sérum',
    fullName: 'Dior · Le Sérum',
    evidenceCount: 12,
    status: 'active',
  },
  {
    id: '2',
    brand: 'Estée Lauder',
    productLine: 'ANR',
    fullName: 'Estée Lauder · ANR',
    evidenceCount: 18,
    status: 'active',
  },
  {
    id: '3',
    brand: "L'Oréal Paris",
    productLine: 'RevitaLift',
    fullName: "L'Oréal Paris · RevitaLift",
    evidenceCount: 15,
    status: 'active',
  },
  {
    id: '4',
    brand: 'La Roche-Posay',
    productLine: 'Mela B3',
    fullName: 'La Roche-Posay · Mela B3',
    evidenceCount: 9,
    status: 'active',
  },
  {
    id: '5',
    brand: 'Shiseido',
    productLine: 'Benefiance',
    fullName: 'Shiseido · Benefiance',
    evidenceCount: 11,
    status: 'active',
  },
  {
    id: '6',
    brand: 'SkinCeuticals',
    productLine: 'C E Ferulic',
    fullName: 'SkinCeuticals · C E Ferulic',
    evidenceCount: 7,
    status: 'beta',
  },
]