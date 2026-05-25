# Painel de Gestão de Condomínios

Painel para listagem e gestão de condomínios. Backend em Node.js + TypeScript; frontend em React + TypeScript.

Dados consumidos da API [DataUSA](https://datausa.io/), mapeados para o domínio de condomínios. Detalhes em [ESPECIFICACAO.md](./ESPECIFICACAO.md).

## Pré-requisitos

- Node.js (v18+)
- npm

## Instalação

```bash
cd server && npm install
cd ../client && npm install
```

## Executar

Dois terminais:

```bash
# Terminal 1 — backend (porta 3333)
cd server
npm run dev

# Terminal 2 — frontend (porta 5173)
cd client
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:3333/api/condominiums

## Estrutura

```
├── client/     React + Vite
├── server/     Express + TypeScript
└── ESPECIFICACAO.md
```
