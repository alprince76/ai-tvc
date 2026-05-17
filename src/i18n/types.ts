export type Locale = 'en' | 'id'

/** Bilingual narrative content in mock data */
export type TString = { en: string; id: string }

export function isTString(v: unknown): v is TString {
  return (
    typeof v === 'object' &&
    v !== null &&
    'en' in v &&
    'id' in v &&
    typeof (v as TString).en === 'string' &&
    typeof (v as TString).id === 'string'
  )
}
