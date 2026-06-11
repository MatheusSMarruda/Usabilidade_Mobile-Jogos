# 🌳 Jogo da Memória ODS 15 — Vida Terrestre

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Axios](https://img.shields.io/badge/Axios-1.15-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)

</div>

## 📌 Sobre o Projeto

Este projeto é um **jogo da memória educativo** com visual **pixel-art estilo RPG**, desenvolvido em **React** como trabalho acadêmico da disciplina de Desenvolvimento Web/Mobile (UC HUB), com foco em **usabilidade mobile** e nas **Heurísticas de Nielsen**.

O tema do jogo é a **ODS 15 (Objetivo de Desenvolvimento Sustentável — Vida Terrestre)** da ONU: todas as cartas representam **animais ameaçados de extinção ou relevantes para a biodiversidade**, como o Lobo-guará, a Onça-pintada, a Harpia e o Panda-gigante. Cada animal carrega informações reais de:

* **Status de conservação** (Vulnerável, Em Perigo, Quase Ameaçado...)
* **Bioma de origem** (Cerrado, Amazônia, Savana...)
* **Curiosidades reais** buscadas dinamicamente na **API da Wikipedia** ao final de cada partida

Assim, além de exercitar a memória, o jogador aprende sobre conservação ambiental enquanto joga. 🐆

## 🎮 Como o Jogo Funciona

O fluxo do jogo é dividido em três momentos:

1. **Menu Inicial (`HomeScreen`)**: O jogador escolhe um "animal guia" que define a dificuldade da partida:
   * 🐜 **Fácil** — tabuleiro 4×3 (6 pares), penalidade de erro: -5 pontos
   * 🦌 **Médio** — tabuleiro 4×4 (8 pares), penalidade de erro: -7 pontos
   * 🐆 **Difícil** — tabuleiro 5×4 (10 pares), penalidade de erro: -10 pontos
2. **Partida (`GameBoard`)**: As cartas são embaralhadas (algoritmo **Fisher-Yates**) e o jogador vira duas por vez buscando os pares. Um HUD em tempo real exibe **progresso, pontos, combo, tempo e movimentos**.
3. **Fim de Jogo (`WinModal`)**: Ao encontrar todos os pares (vitória) ou zerar a pontuação (derrota), um modal exibe o desempenho com **classificação por estrelas (1 a 3 ⭐)** e uma **curiosidade real** sobre um dos animais encontrados, consumida da API REST da Wikipedia via **Axios**.

### 🏆 Sistema de Pontuação

| Regra | Valor |
| --- | --- |
| Pontuação inicial | 100 pontos |
| Acerto rápido (menos de 3 tentativas desde o último par) | +25 pontos |
| Combo (acertos consecutivos) | +10 pontos por nível de combo |
| Erro | -5 a -10 pontos (conforme dificuldade) |
| Pontuação chegou a 0 | **Game Over** 💀 |

Os **recordes (Top 10)** ficam salvos no `localStorage` do navegador e são exibidos no menu inicial — nenhum cadastro ou servidor é necessário.

## 🧠 Usabilidade (Heurísticas de Nielsen)

O projeto foi desenhado aplicando explicitamente as heurísticas de usabilidade:

* **#1 Visibilidade do status do sistema**: timer, contador de movimentos, barra de progresso e pontuação sempre visíveis no HUD.
* **#3 Controle e liberdade do usuário**: é possível reiniciar a partida ou voltar ao menu a qualquer momento.
* **#5 Prevenção de erros**: diálogo de confirmação antes de reiniciar uma partida em andamento e bloqueio de cliques durante a animação de comparação.
* **#6 Reconhecimento em vez de memorização**: pares encontrados permanecem visíveis e marcados com ✓.
* **#8 Estética e design minimalista**: interface pixel-art limpa e focada no tabuleiro.
* **#9 Recuperação de erros**: feedback construtivo no fim da partida, incentivando uma nova tentativa.

O jogo também possui suporte a **acessibilidade**: as cartas são navegáveis por teclado (`Tab` + `Enter`) e possuem rótulos `aria-label` para leitores de tela.

## 🛠️ Tecnologias Utilizadas

* **Linguagem/Biblioteca:** JavaScript (ES Modules) + React 19 (Hooks: `useState`, `useEffect`, `useCallback`, `useRef`)
* **Build Tool:** Vite 8 (dev server com HMR e build de produção)
* **Estilização:** CSS customizado (pixel-art) + Bootstrap 5
* **Requisições HTTP:** Axios (consumo da API REST da Wikipedia)
* **Qualidade de Código:** ESLint 9

## 📂 Estrutura do Repositório

```text
├── public/                              # Arquivos estáticos (favicon, sprites SVG)
├── src/
│   ├── components/
│   │   ├── HomeScreen.jsx               # Tela inicial: dificuldade, instruções e recordes
│   │   ├── GameBoard.jsx                # Tabuleiro, HUD e toda a lógica da partida
│   │   ├── WinModal.jsx                 # Modal de vitória/derrota + fato da Wikipedia
│   │   ├── CardSprites.jsx              # Sprites pixel-art dos animais das cartas
│   │   ├── Sprites.jsx                  # Sprites decorativos (formiga, onça, placa...)
│   │   ├── Scenes.jsx                   # Cenário pixel-art da Amazônia (tela inicial)
│   │   ├── Card.jsx                     # Componente de carta (versão Bootstrap)
│   │   ├── GameMenu.jsx                 # Menu de dificuldade (versão Bootstrap)
│   │   └── ScoreBoard.jsx               # Placar da partida (versão Bootstrap)
│   ├── data/
│   │   └── animals.js                   # Dados dos animais, dificuldades e pontuação
│   ├── App.jsx                          # Componente raiz (controle de fases do jogo)
│   ├── pixel-art.css                    # Tema visual pixel-art RPG
│   └── main.jsx                         # Ponto de entrada do React
├── index.html                           # HTML base servido pelo Vite
├── package.json                         # Dependências e scripts do projeto
├── vite.config.js                       # Configuração do Vite
├── eslint.config.js                     # Regras de lint
├── script_apresentacao_pitch_ods15.md   # Roteiro do pitch de apresentação
└── README.md                            # Documentação do projeto
```

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* npm (já incluso no Node.js)

### Passo a Passo

**1. Clone o repositório**

```bash
git clone https://github.com/MatheusSMarruda/Usabilidade_Mobile-Jogos.git
cd Usabilidade_Mobile-Jogos
```

**2. Instale as dependências**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

**4. Acesse o jogo**

Abra o navegador no endereço exibido no terminal (por padrão `http://localhost:5173`). Escolha a dificuldade e clique em **▶ INICIAR JORNADA**.

## 📦 Build de Produção

Para gerar a versão otimizada do jogo (arquivos estáticos na pasta `dist/`):

```bash
npm run build
```

Para pré-visualizar o build localmente:

```bash
npm run preview
```

## 🧹 Outros Comandos Úteis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Executa o ESLint em todo o projeto |

---

<div align="center">

Projeto acadêmico — Engenharia de Software · UC HUB · Desenvolvimento Web/Mobile
🌱 *Jogue, memorize e aprenda sobre a vida terrestre!* 🌱

</div>
