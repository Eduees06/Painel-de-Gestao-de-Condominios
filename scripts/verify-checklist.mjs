const API = process.env.API_URL ?? 'http://localhost:3333/api/condominiums'

function classifySize(residents) {
  if (residents <= 2_000_000) return 'Pequeno'
  if (residents <= 5_000_000) return 'Médio'
  return 'Grande'
}

function filterAndSort(data, search, sortBy, sortOrder) {
  const term = search.toLowerCase().trim()
  return data
    .filter((c) => c.name.toLowerCase().includes(term))
    .sort((a, b) => {
      const comparison =
        sortBy === 'name'
          ? a.name.localeCompare(b.name)
          : a.residents - b.residents
      return sortOrder === 'asc' ? comparison : -comparison
    })
}

const res = await fetch(API)
if (!res.ok) {
  console.error('FAIL: API status', res.status)
  process.exit(1)
}

const data = await res.json()
const results = []

function pass(id, msg) {
  results.push({ id, ok: true, msg })
}
function fail(id, msg) {
  results.push({ id, ok: false, msg })
}

if (Array.isArray(data) && data.length > 0) {
  const sample = data[0]
  if (
    typeof sample.id === 'string' &&
    typeof sample.name === 'string' &&
    typeof sample.residents === 'number' &&
    ['Pequeno', 'Médio', 'Grande'].includes(sample.size)
  ) {
    pass(1, `GET /api/condominiums retorna ${data.length} itens com id, name, residents, size`)
  } else {
    fail(1, 'Formato do item inválido: ' + JSON.stringify(sample))
  }
} else {
  fail(1, 'Resposta vazia ou não é array')
}

let classifyOk = true
for (const c of data) {
  if (classifySize(c.residents) !== c.size) {
    classifyOk = false
    fail('1b', `${c.name}: size=${c.size}, esperado=${classifySize(c.residents)}`)
    break
  }
}
if (classifyOk) pass('1b', 'Classificação Pequeno/Médio/Grande correta em todos os registros')

const hasNameResidents = data.every(
  (c) => c.name.length > 0 && c.residents > 0
)
if (hasNameResidents) pass(2, 'Todos os itens têm nome e moradores > 0')
else fail(2, 'Item sem nome ou moradores inválido')

const totalResidents = data.reduce((s, c) => s + c.residents, 0)
const expectedCount = data.length
if (expectedCount === 52) {
  pass(3, `Resumo: ${expectedCount} condomínios, ${totalResidents.toLocaleString('pt-BR')} moradores (soma verificada)`)
} else {
  pass(3, `Resumo: ${expectedCount} condomínios, ${totalResidents} moradores (contagem pode variar se API mudar)`)
}

const alabamaOnly = filterAndSort(data, 'alabama', 'name', 'asc')
if (alabamaOnly.length === 1 && alabamaOnly[0].name === 'Alabama') {
  pass(4, 'Busca "alabama" retorna 1 resultado')
} else {
  fail(4, `Busca "alabama": esperado 1, obteve ${alabamaOnly.length}`)
}

const partial = filterAndSort(data, 'ar', 'name', 'asc')
if (partial.length >= 2 && partial.every((c) => c.name.toLowerCase().includes('ar'))) {
  pass(4.1, `Busca parcial "ar" retorna ${partial.length} itens filtrados`)
} else {
  fail(4.1, 'Busca parcial falhou')
}

const byNameAsc = filterAndSort(data, '', 'name', 'asc')
const namesSorted = [...byNameAsc].map((c) => c.name).sort((a, b) => a.localeCompare(b))
if (byNameAsc.map((c) => c.name).join() === namesSorted.join()) {
  pass(5, 'Ordenação por nome crescente OK')
} else {
  fail(5, 'Ordenação por nome crescente incorreta')
}

const byResidentsDesc = filterAndSort(data, '', 'residents', 'desc')
let residentsDescOk = true
for (let i = 1; i < byResidentsDesc.length; i++) {
  if (byResidentsDesc[i - 1].residents < byResidentsDesc[i].residents) {
    residentsDescOk = false
    break
  }
}
if (residentsDescOk) pass(5.1, 'Ordenação por moradores decrescente OK')
else fail(5.1, 'Ordenação por moradores decrescente incorreta')

const sizesPresent = new Set(data.map((c) => c.size))
if (sizesPresent.has('Pequeno') && sizesPresent.has('Médio') && sizesPresent.has('Grande')) {
  pass(8, 'API expõe os três portes: ' + [...sizesPresent].join(', '))
} else {
  pass(8, 'Portes presentes: ' + [...sizesPresent].join(', ') + ' (pode faltar algum dependendo dos dados)')
}

console.log('\n=== CHECKLIST ===\n')
for (const r of results) {
  console.log(`${r.ok ? '✓' : '✗'} [${r.id}] ${r.msg}`)
}
const failed = results.filter((r) => !r.ok)
process.exit(failed.length ? 1 : 0)
