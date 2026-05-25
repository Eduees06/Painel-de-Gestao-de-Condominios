# Painel de Gestão de Condomínios — Especificação

Dados da API pública [DataUSA](https://datausa.io/), interpretados como condomínios.

**Stack:** React + TypeScript (frontend), Node.js + TypeScript (backend).

---

## Mapeamento de dados

| Campo API (DataUSA) | Campo interno   | Conceito          |
|---------------------|-----------------|-------------------|
| `State ID`          | `id`            | ID do condomínio  |
| `State`             | `name`          | Nome              |
| `Population`        | `residents`     | Número de moradores |

**URL externa:**

```
https://api.datausa.io/tesseract/data.jsonrecords?cube=acs_yg_total_population_5&drilldowns=State,Year&measures=Population&include=Year:2023&limit=100,0
```

---

## Modelo de domínio

```ts
type CondominiumSize = 'Pequeno' | 'Médio' | 'Grande'

interface Condominium {
  id: string
  name: string
  residents: number
  size: CondominiumSize
}
```

### Classificação por porte (`size`)

Calculada no backend ao mapear cada registro:

| Porte   | Moradores (`residents`)   |
|---------|---------------------------|
| Pequeno | até 2.000.000             |
| Médio   | de 2.000.001 a 5.000.000  |
| Grande  | acima de 5.000.000        |

---

## API interna

### `GET /api/condominiums`

**Sucesso (200):** array de `Condominium`.

```json
[
  {
    "id": "04000US01",
    "name": "Alabama",
    "residents": 5054253,
    "size": "Médio"
  }
]
```

**Falha na API externa (502):**

```json
{
  "error": "Falha ao consultar API externa"
}
```

O backend consome a DataUSA, transforma os registros e devolve a lista completa. Sem paginação, cache ou banco.

---

## Frontend

- Resumo: total de condomínios e total de moradores
- Listagem com nome, moradores e porte
- Busca por nome em tempo real
- Ordenação por nome ou moradores (crescente / decrescente)
- Estados de carregamento e erro
- Consumo de `/api/condominiums` via proxy do Vite em desenvolvimento

---

## Arquitetura

```
client/ (React + Vite, porta 5173)
  → fetch /api/condominiums
  → proxy Vite → server:3333

server/ (Express, porta 3333)
  → fetch api.datausa.io
  → mapeia + classifica porte
  → GET /api/condominiums
```

Pastas `client/` e `server/` independentes. Tipos duplicados em cada lado (sem pacote shared).

---

## Decisões técnicas

| Item            | Decisão                                      |
|-----------------|----------------------------------------------|
| Build frontend  | Vite, template `react-ts`                    |
| Build backend   | TypeScript + ts-node (dev), `tsc` (prod)     |
| CORS            | `cors` no Express; proxy Vite em dev           |
| Estilos         | CSS simples, sem biblioteca de UI            |
| Fora do escopo  | DB, auth, testes automatizados, paginação, deploy |

---

## Funcionalidades

| Critério                                              | Status |
|-------------------------------------------------------|--------|
| Backend consome API externa e expõe `/api/condominiums` | Sim    |
| Frontend lista condomínios com nome e moradores       | Sim    |
| Resumo exibe totais corretos                          | Sim    |
| Busca filtra por nome                                 | Sim    |
| Ordenação nos dois critérios                          | Sim    |
| Loading e erro exibidos                               | Sim    |
| Classificação por porte visível na listagem           | Sim    |

---

## Execução local

**Pré-requisitos:** Node.js, npm.

```bash
# Terminal 1 — backend
cd server
npm install
npm run dev

# Terminal 2 — frontend
cd client
npm install
npm run dev
```

- Backend: http://localhost:3333  
- Frontend: http://localhost:5173  
- Teste direto da API: http://localhost:3333/api/condominiums
