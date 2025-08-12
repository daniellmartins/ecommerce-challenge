# 🎨 Frontend E-commerce

Interface moderna em Next.js 15 + React 19 com carrinho de compras interativo e UX otimizada.

## 🎯 Visão Geral

Frontend responsivo com tecnologias de ponta, estado global reativo e componentes reutilizáveis.

## 🏗️ Arquitetura

```
src/
├── app/             # App Router (Next.js 15)
├── components/      # Componentes reutilizáveis
├── services/        # API calls
├── store/           # Estado global (Zustand)
├── hooks/           # Custom hooks
├── utils/           # Utilitários
└── types/           # TypeScript types
```

**Padrões:**
- Component-driven development
- Custom hooks
- Global state management
- Server components

## 🛠️ Tecnologias

- **Next.js 15** + **React 19**: Framework com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Estilização moderna
- **Zustand**: Estado global leve
- **Jest**: Testes

## 🎨 Funcionalidades

### Páginas
- **Homepage (/)**: Catálogo completo de produtos
- **Produto (/produto/[id])**: Página detalhada
- **404**: Customizada para produtos não encontrados

### Carrinho
- **Sidebar deslizante** com animações
- **Adição inteligente** (combina quantidades)
- **Controles de quantidade** com validação
- **Remoção de items**
- **Cálculo automático** do total
- **Estado vazio** amigável

### UX Features
- Loading states
- Animações suaves
- Responsividade completa
- Feedback visual
- Persistência no localStorage

## 🚀 Como Executar

```bash
# Instalar
npm install

# Desenvolvimento
npm run dev        # http://localhost:3000

# Produção
npm run build
npm start

# Testes
npm test
npm run test:watch
```

### Variáveis de Ambiente
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 📱 Responsividade

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

**Adaptações:**
- Grid: 1 coluna → 3 colunas
- Carrinho: Modal → Sidebar
- Tipografia escalável

## 🧪 Testes

```
src/utils/
├── formatters.test.ts  # Formatação
└── user.test.ts        # User utils
```

**Cobertura:** Funções utilitárias 100%

## 🔄 Estado Global

```typescript
interface CartState {
  cart: Cart | null
  isLoading: boolean
  isCartOpen: boolean
  userId: string | null
  
  // Actions
  addToCart(id: string, qty: number): Promise<void>
  updateQuantity(id: string, qty: number): Promise<void>
  removeFromCart(id: string): Promise<void>
}
```

**Fluxo:**
1. App inicia → cria usuário → busca carrinho
2. Adiciona produto → API → atualiza store → abre carrinho
3. Atualiza quantidade → API → atualiza store

## 🎯 Decisões Técnicas

**Por que Next.js 15?**
- App Router moderno
- Server Components
- Turbopack (build rápido)
- SEO nativo

**Por que Zustand?**
- API simples
- Performance otimizada
- TypeScript nativo
- Bundle pequeno

**Por que Tailwind CSS 4?**
- Utility-first
- Design system integrado
- CSS otimizado
- Responsividade built-in

**Alternativas consideradas:**
- **Redux** vs Zustand vs Context (Zustand é mais simples e mais performativo)
- **Styled Components** vs Tailwind (Tailwind é mais produtivo)

## 🚀 Performance

**Otimizações:**
- Server Components
- Lazy loading
- Bundle splitting
- CSS purging
- Image optimization

**Core Web Vitals:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## 📊 Bundle Analysis

```
next: ~500kb
react: ~150kb
zustand: ~15kb
tailwindcss: ~50kb (purged)
uuid: ~25kb
```