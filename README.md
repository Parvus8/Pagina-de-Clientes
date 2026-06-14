# Página de Clientes

Aplicação fullstack para listagem, filtragem e visualização de clientes. O backend consome uma API externa, armazena os dados em memória e os expõe via REST. O frontend exibe os clientes em cards com filtro por estado, busca por nome e paginação.

---

## Requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Estrutura do projeto

```
Pagina-de-Clientes/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── data/
│       ├── routes/
│       ├── services/
│       ├── app.ts
│       └── server.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── types/
├── .env
└── README.md
```

---

## Configuração do ambiente

Na raiz do projeto deve existir um arquivo `.env` com as seguintes variáveis:

```env
URL=https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json
PORT=3000
```

Caso o arquivo não exista, crie-o manualmente com o conteúdo acima.

Para o frontend, crie um arquivo `.env` dentro da pasta `frontend/` com:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## Instalação

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Como rodar

### Backend

```bash
cd backend
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/cliente` | Lista clientes com paginação e filtros |
| GET | `/api/cliente/:id` | Retorna um cliente pelo ID |

### Parâmetros de query — `GET /api/cliente`

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | 1 | Página atual |
| `limit` | number | 9 | Itens por página (máx. 100) |
| `state` | string | — | Filtra por estado (ex: `são paulo`) |
| `name` | string | — | Busca por nome parcial |

### Exemplo de resposta

```json
{
  "total": 23,
  "page": 1,
  "limit": 9,
  "data": [
    {
      "id": "1",
      "name": { "first": "Ana", "last": "Silva" },
      "location": { "state": "são paulo", "city": "Campinas" },
      "picture": { "medium": "https://..." }
    }
  ]
}
```

---

## Tecnologias utilizadas

**Backend:** Node.js, Express, TypeScript, Axios, dotenv, cors

**Frontend:** React 19, TypeScript, Axios, Vite