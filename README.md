# Página de Clientes

Aplicação fullstack para listagem, busca e visualização de clientes. O backend consome uma API externa, armazena os dados em memória e os expõe via REST. O frontend consome essa API e exibe os clientes em cards com filtro por estado, busca por nome com debounce e paginação.

---

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | Node.js, Express, TypeScript, Axios, dotenv, cors |
| Frontend | React 19, TypeScript, Vite, Axios |

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## Estrutura do projeto

```
Pagina-de-Clientes/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Recebe requisições e delega ao service
│   │   ├── data/            # Interfaces TypeScript (RawCliente, Cliente)
│   │   ├── routes/          # Definição dos endpoints
│   │   ├── services/        # Regras de negócio e filtragem
│   │   ├── app.ts           # Configuração do Express
│   │   └── server.ts        # Bootstrap da aplicação
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Página principal
│   │   ├── services/        # Configuração do Axios
│   │   └── types/           # Tipos compartilhados
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .env                     # Variáveis de ambiente (não commitado)
├── .env.example             # Modelo das variáveis de ambiente
└── README.md
```

---

## Configuração do ambiente

O projeto utiliza um único arquivo `.env` na raiz, compartilhado entre backend e frontend.

**1.** Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

**2.** O arquivo `.env` gerado já contém os valores padrão prontos para uso em desenvolvimento:

```env
# Backend
URL=https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json
PORT=3000

# Frontend
VITE_API_URL=http://localhost:3000/api
```

> Não é necessário alterar nenhum valor para rodar localmente.

---

## Instalação

Instale as dependências de cada parte separadamente.

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

---

## Como rodar

Rode o backend e o frontend em terminais separados.

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev
```

> API disponível em `http://localhost:3000`

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

> Aplicação disponível em `http://localhost:5173`

---

## Endpoints da API

### `GET /api/cliente`

Lista clientes com suporte a paginação e filtros.

**Parâmetros de query:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | number | `1` | Página atual |
| `limit` | number | `9` | Itens por página (máx. 100) |
| `state` | string | — | Filtra por estado (ex: `são paulo`) |
| `name` | string | — | Busca parcial por nome |

**Exemplo de resposta:**

```json
{
  "total": 23,
  "page": 1,
  "limit": 9,
  "data": [
    {
      "id": "1",
      "gender": "female",
      "name": { "title": "Ms", "first": "Ana", "last": "Silva" },
      "location": {
        "street": "Rua das Flores, 42",
        "city": "Campinas",
        "state": "são paulo",
        "postcode": 13010
      },
      "email": "ana.silva@example.com",
      "phone": "(19) 99999-0000",
      "picture": {
        "large": "https://...",
        "medium": "https://...",
        "thumbnail": "https://..."
      }
    }
  ]
}
```

---

### `GET /api/cliente/:id`

Retorna um cliente pelo ID.

---

## Funcionalidades

- Listagem de clientes em grid de cards
- Filtro por estado via dropdown
- Busca por nome com debounce de 400ms
- Paginação com controle de página
- Modal de detalhes ao clicar em um card
- Tratamento de erro de conexão com a API
