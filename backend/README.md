# 🚀 Backend E-commerce API

API REST em Node.js + TypeScript com arquitetura escalável e testes completos.

## 🎯 Visão Geral

Backend robusto para e-commerce com Clean Architecture, validações e documentação Swagger completa.

## 🏗️ Arquitetura

```
src/
├── controllers/     # HTTP handlers
├── services/        # Regras de negócio
├── repositories/    # Acesso a dados
├── interfaces/      # Contratos
├── middlewares/     # Validações
├── routes/          # Rotas da API
├── config/          # Swagger
└── container/       # Injeção de dependências
```

**Padrões:**
- Repository Pattern
- Dependency Injection
- Service Layer
- Middleware validation

## 🛠️ Tecnologias

- **Node.js + Express 5**: Framework web
- **TypeScript**: Tipagem estática
- **Swagger**: Documentação automática
- **Jest + Supertest**: Testes (100% cobertura)
- **UUID**: Identificadores únicos

## 📡 Endpoints

### Produtos
- `GET /api/products` - Lista todos
- `GET /api/products/:id` - Detalhes

### Carrinho
- `GET /api/cart` - Buscar carrinho
- `POST /api/cart/add` - Adicionar item
- `PUT /api/cart/update` - Atualizar quantidade
- `DELETE /api/cart/remove/:id` - Remover item

### Utilidades
- `GET /health` - Health check
- `GET /api-docs` - Documentação Swagger

## 🚀 Como Executar

```bash
# Instalar
npm install

# Desenvolvimento
npm run dev        # http://localhost:3001

# Produção
npm run build
npm start

# Testes
npm test           # Todos os testes
npm run test:coverage  # Com cobertura
```

## 🧪 Testes

**Estrutura:**
```
tests/
├── unit/        # Testes unitários
├── integration/ # Testes end-to-end
└── utils/       # Utilitários
```

**Cobertura:** 100% (statements, branches, functions, lines)

## 📚 Documentação

**Swagger UI:** http://localhost:3001/api-docs

**Exemplo de uso:**
```bash
# Listar produtos
curl http://localhost:3001/api/products

# Adicionar ao carrinho
curl -X POST http://localhost:3001/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"1","quantity":2,"userId":"user123"}'
```

## 🎯 Decisões Técnicas

**Por que Clean Architecture?**
- Testabilidade independente
- Manutenibilidade
- Escalabilidade

**Por que TypeScript?**
- Type safety
- Melhor IDE support
- Documentação viva

**Alternativas consideradas:**
- **Fastify** vs Express (Express tem maior ecossistema)
- **NestJS** vs manual (queria mostrar arquitetura customizada)
- **Database real** vs simulado (simplicidade para demo)

## 🔧 Customização

**Adicionar novo endpoint:**
1. Interface em `interfaces/`
2. Service em `services/`
3. Repository em `repositories/`
4. Controller em `controllers/`
5. Route em `routes/`

**Container DI:**
```typescript
container.register<IService>('IService', Service);
const service = container.get<IService>('IService');
```

## 📊 Qualidade

- ✅ **Testes**
- ✅ **TypeScript strict** mode
- ✅ **0 ESLint warnings**
- ✅ **CORS configurado**
- ✅ **Validação de inputs**