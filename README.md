# 🚀 Typing Speed Test

![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.2.4-06B6D4?logo=tailwindcss)

Aplicação web de **teste de velocidade de digitação**. Digite o texto de referência e acompanhe suas métricas de WPM, acurácia e caracteres corretos/incorretos em tempo real.

---

## 🎮 Como jogar

1. Abra o projeto e clique em **"Start Typing Test"** (ou clique no texto de pré-visualização).
2. Digite o texto que aparece na área de digitação.
3. Acompanhe suas estatísticas no cabeçalho (WPM, Accuracy, Timer).
4. Ao terminar o texto (ou o tempo acabar), veja seus resultados!
5. Clique em **"Jogar Novamente"** para reiniciar.

### Modos de jogo

| Modo            | Descrição                                                                 |
| --------------- | ------------------------------------------------------------------------- |
| **Timed (60s)** | Contagem regressiva de 60 segundos. Tente digitar o máximo que conseguir! |
| **Passage**     | Sem limite de tempo. O cronômetro conta o tempo decorrido.                |

### Dificuldades

Easy, Medium e Hard (atualmente a dificuldade não altera o comportamento — o estado existe para implementação futura).

---

## 🏗️ Estrutura do Projeto

```
src/
├── App.jsx              → Componente principal / gerenciamento de estado global
├── main.jsx             → Ponto de entrada React
├── index.css            → Estilos globais (importa Tailwind)
├── assets/images/       → SVGs utilizados nos componentes
└── components/
    ├── HeaderStats.jsx  → Cabeçalho com stats + dropdowns de configuração
    ├── StartScreen.jsx  → Tela inicial com botão de start
    ├── TypingArea.jsx   → Área de digitação (lógica principal)
    ├── ResultScreen.jsx → Tela de resultados pós-teste
    └── Dropdown.jsx     → Componente reutilizável de select dropdown
```

---

## 📋 Componentes

### `App.jsx` — Orquestrador Global

- **10 estados** gerenciam o ciclo de vida do jogo:

| Estado           | Tipo   | Descrição                                 |
| ---------------- | ------ | ----------------------------------------- |
| `gamePhase`      | string | `'start'` → `'playing'` → `'finished'`    |
| `wpm`            | number | Words per minute em tempo real            |
| `accuracy`       | number | Porcentagem de acurácia (0–100)           |
| `timeLeft`       | number | Tempo restante (60s no modo Timed)        |
| `correctChars`   | number | Caracteres digitados corretamente         |
| `incorrectChars` | number | Caracteres digitados incorretamente       |
| `bestwpm`        | number | Melhor WPM (persistido em `localStorage`) |
| `recordType`     | string | `'none'` / `'baseline'` / `'smashed'`     |
| `difficulty`     | string | `'Easy'` / `'Medium'` / `'Hard'`          |
| `mode`           | string | `'Timed(60s)'` / `'Passage'`              |

- **2 useEffects:**
  - **Persistência de recorde**: salva melhor WPM no `localStorage` ao terminar o jogo.
  - **Timer**: conta regressiva (Timed) ou progressiva (Passage); transiciona para `finished` quando o tempo zera.

- **Renderização condicional**: alterna entre `StartScreen`, `TypingArea` e `ResultScreen` conforme `gamePhase`.

### `HeaderStats.jsx` — Painel Superior

Exibe logo, melhor WPM (troféu), e em tempo real: **WPM**, **Accuracy** e **Timer**. Contém dois dropdowns para selecionar dificuldade e modo.

### `StartScreen.jsx` — Tela Inicial

Texto de referência desfocado como preview + botão centralizado "Start Typing Test". Clicar em qualquer lugar inicia o jogo.

### `TypingArea.jsx` — Motor do Jogo ⭐

- **Texto fixo**: `"The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks."`
- **Input oculto** (`opacity-0`, `-z-10`) com foco automático — toda a digitação acontece nele.
- **Cálculo de WPM**: `(caracteres / 5) / minutos decorridos`
- **Cálculo de acurácia**: `(caracteres corretos / total digitado) × 100`
- **Renderização colorida**: caracteres corretos em 🟢 verde, incorretos em 🔴 vermelho sublinhado, não digitados em ⚪ cinza.
- Detecta fim do texto (`userInput.length === referenceText.length`) e chama `onComplete()`.

### `ResultScreen.jsx` — Tela de Resultados

Exibe 4 cards: **WPM**, **Accuracy** (verde ≥90% / vermelho <90%), **Characters** (verde/vermelho) e um botão **"Jogar Novamente"**.

| Recorde       | Título                       | Ícone        |
| ------------- | ---------------------------- | ------------ |
| Primeiro jogo | "Recorde base estabelecido!" | ✅ completed |
| Bateu recorde | "Recorde quebrado!"          | 🏆 new PB    |
| Não bateu     | "Teste Completo!"            | ✅ completed |

### `Dropdown.jsx` — Select Reutilizável

Componente genérico com estado `isOpen`, botão toggle e menu suspenso com indicador visual (bolinha azul) na opção selecionada.

---

## 🛠️ Tecnologias

| Tecnologia   | Versão  |
| ------------ | ------- |
| React        | ^19.2.5 |
| Vite         | ^8.0.10 |
| Tailwind CSS | ^4.2.4  |
| ESLint       | ^10.2.1 |

---

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

---

## 📝 Notas

- O texto de referência é **hardcoded** em `TypingArea.jsx` — não há múltiplos textos ou geração dinâmica.
- A **dificuldade** existe como estado mas não impacta o comportamento atual.
- O **modo Passage** não tem limite de tempo — o cronômetro conta indefinidamente.
- Apenas o **melhor WPM** é persistido em `localStorage` (chave: `bestWpm`).
- Todos os ícones estão em `src/assets/images/` como SVGs.
