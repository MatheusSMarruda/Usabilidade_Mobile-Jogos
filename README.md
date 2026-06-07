# Script de Apresentação Pitch - Jogo da Memória ODS 15

Tempo sugerido: 10 a 12 minutos  
Formato: pitch com demonstração do projeto  
Projeto: Jogo da Memória - ODS 15: Vida Terrestre  
Comando para rodar: `npm run dev`

## 1. Abertura e Problema - Apresentador(a) 1

Boa [noite/tarde], professor(a) e colegas.

Hoje nós vamos apresentar o nosso projeto de Desenvolvimento Web Mobile: um jogo da memória interativo inspirado no ODS 15, Vida Terrestre.

O ponto de partida do nosso projeto foi uma pergunta simples: como transformar um tema importante, como preservação da biodiversidade e proteção dos ecossistemas terrestres, em uma experiência digital leve, acessível e envolvente?

O ODS 15 fala sobre proteger, recuperar e promover o uso sustentável dos ecossistemas terrestres, combater a desertificação, deter a degradação da terra e frear a perda de biodiversidade.

Mas, muitas vezes, esse tema chega até as pessoas de forma muito teórica. Então, nossa proposta foi criar uma experiência interativa que aproximasse o usuário desse assunto por meio de algo familiar: um jogo da memória.

Em vez de apenas apresentar informações em texto, o usuário joga, escolhe uma dificuldade, encontra pares de animais, acompanha sua pontuação e recebe curiosidades relacionadas às espécies e à vida terrestre.

## 2. Solução Proposta - Apresentador(a) 2

A solução que desenvolvemos é um jogo web feito com React, Bootstrap, CSS e NodeJS, executado localmente com o comando `npm run dev`.

O jogo começa com uma tela inicial em estilo pixel art, inspirada em uma ambientação natural, com referência direta ao tema Vida Terrestre.

Nessa tela, o usuário escolhe uma dificuldade:

- Fácil, com 6 pares.
- Médio, com 8 pares.
- Difícil, com 10 pares.

Essa escolha muda o tamanho do desafio e também altera a penalidade de pontuação quando o usuário erra um par.

A mecânica principal é simples: o usuário vira duas cartas, tenta encontrar pares iguais e precisa completar o tabuleiro mantendo a melhor pontuação possível.

O diferencial é que o jogo não fica só na memorização. Ele usa animais relacionados à biodiversidade e traz informações sobre espécies, status de conservação e biomas. Assim, o jogo funciona como uma porta de entrada para a conscientização ambiental.

## 3. Demonstração do Jogo - Apresentador(a) 3

Agora vamos demonstrar rapidamente o funcionamento.

Primeiro, rodamos o projeto com:

```bash
npm run dev
```

Na tela inicial, temos o título "Jogo da Memória" e a identificação do tema: ODS 15 - Vida Terrestre.

O usuário escolhe um animal guia, que também representa a dificuldade. Depois, ele clica em "Iniciar Jornada".

Durante a partida, o sistema mostra informações importantes em tempo real:

- Progresso de pares encontrados.
- Pontuação atual.
- Tempo de jogo.
- Quantidade de movimentos.
- Nível escolhido.
- Combo, quando o usuário acerta pares em sequência.

Se o usuário acerta rapidamente, ganha bônus. Se erra, perde pontos de acordo com a dificuldade. Isso cria um desafio maior do que apenas terminar o jogo: o objetivo é jogar bem, memorizar melhor e manter uma boa pontuação.

Quando a partida termina, aparece um modal com o resultado final, incluindo pontuação, tempo, movimentos, dificuldade e uma mensagem de desempenho.

Também foi implementada uma requisição HTTP usando Axios para buscar uma curiosidade sobre um animal na API da Wikipedia. Caso a conexão falhe, o sistema usa dados locais, como o status da espécie e o bioma.

## 4. Usabilidade e Heurísticas de Nielsen - Apresentador(a) 4

Um dos principais requisitos do projeto era aplicar pelo menos cinco heurísticas de Nielsen. Nós aplicamos várias delas diretamente na experiência do jogo.

A primeira é a visibilidade do status do sistema. O usuário sempre sabe o que está acontecendo porque o jogo mostra pontuação, tempo, movimentos e progresso dos pares encontrados.

A segunda é controle e liberdade do usuário. Durante a partida, o jogador pode voltar ao menu ou reiniciar o jogo. E, se já tiver feito movimentos, aparece uma confirmação antes de perder o progresso.

A terceira é prevenção de erros. O jogo bloqueia novas ações enquanto duas cartas estão sendo comparadas, evitando cliques acidentais ou estados confusos.

A quarta é reconhecimento em vez de memorização. As cartas encontradas permanecem visíveis e marcadas, facilitando o entendimento do progresso.

A quinta é estética e design minimalista. Mesmo usando uma identidade visual pixel art, a interface mantém foco no jogo: cartas, status e ações principais. Não há excesso de informações competindo com a tarefa do usuário.

Além disso, o jogo também oferece feedback construtivo no final da partida, com mensagem de vitória ou derrota, estrelas e estatísticas.

## 5. Desenvolvimento Técnico - Apresentador(a) 5

Na parte técnica, o projeto foi desenvolvido com React e Vite.

A aplicação foi organizada em componentes, como:

- `HomeScreen`, responsável pela tela inicial.
- `GameBoard`, responsável pela lógica principal do tabuleiro.
- `WinModal`, responsável pelo resultado da partida.
- Componentes de cartas, placar, sprites e cenas visuais.

Usamos `useState` para controlar estados como fase do jogo, dificuldade, cartas viradas, pares encontrados, pontuação, tempo e recordes.

Também usamos `useEffect` para carregar recordes do `localStorage`, controlar o cronômetro, verificar vitória ou derrota e buscar informações externas sobre os animais.

As listas são usadas para renderizar cartas, recordes e informações repetitivas. As props conectam os componentes, por exemplo passando a dificuldade escolhida da tela inicial para o tabuleiro.

O projeto também usa Bootstrap para apoiar elementos visuais e responsividade, Axios para a requisição HTTP e `localStorage` para salvar os melhores resultados.

## 6. Impacto e Valor do Projeto - Apresentador(a) 1 ou 2

O valor do nosso projeto está em unir entretenimento, usabilidade e educação ambiental.

O usuário não recebe apenas uma mensagem dizendo que a biodiversidade é importante. Ele interage com esse tema. Ele joga com animais, percebe espécies e biomas, recebe curiosidades e associa o aprendizado a uma experiência prática.

Esse tipo de solução pode ser usado em contextos educacionais, especialmente com crianças e jovens, como uma atividade introdutória sobre o ODS 15.

Também é um projeto que pode evoluir. Futuramente, seria possível adicionar mais espécies brasileiras, separar cartas por bioma, criar fases temáticas, incluir sons, ranking online ou perguntas educativas após cada partida.

## 7. Fechamento - Todos ou Último Apresentador

Para concluir, nosso projeto atende à proposta da disciplina porque entrega uma aplicação web interativa, feita com React, organizada em componentes, com eventos, estados, listas, requisição HTTP, ambiente NodeJS e foco em usabilidade.

Ao mesmo tempo, ele conversa diretamente com o ODS 15, Vida Terrestre, usando o jogo da memória como uma forma simples e acessível de chamar atenção para biodiversidade, conservação e preservação dos ecossistemas.

Nosso objetivo foi mostrar que tecnologia e sustentabilidade podem caminhar juntas. Um jogo simples pode ser mais do que entretenimento: pode ser uma ferramenta de conscientização.

Obrigado(a). Agora ficamos à disposição para perguntas.

## Roteiro Rápido para Demonstração

1. Abrir o terminal na pasta do projeto.
2. Rodar `npm run dev`.
3. Abrir o endereço exibido pelo Vite no navegador.
4. Mostrar a tela inicial e o tema ODS 15.
5. Escolher uma dificuldade.
6. Iniciar a partida.
7. Virar algumas cartas e mostrar:
   - progresso;
   - pontuação;
   - tempo;
   - movimentos;
   - penalidade por erro;
   - bônus por acerto e combo.
8. Mostrar o botão de reiniciar e a confirmação.
9. Finalizar ou explicar o modal final.
10. Destacar a curiosidade buscada via Wikipedia ou os dados locais de fallback.

## Divisão Sugerida para o Grupo

Se o grupo tiver 4 pessoas:

- Pessoa 1: abertura, problema e ODS 15.
- Pessoa 2: solução e funcionalidades.
- Pessoa 3: demonstração prática.
- Pessoa 4: heurísticas, tecnologia e fechamento.

Se o grupo tiver 5 pessoas:

- Pessoa 1: abertura e problema.
- Pessoa 2: solução.
- Pessoa 3: demonstração.
- Pessoa 4: heurísticas de Nielsen.
- Pessoa 5: desenvolvimento técnico, impacto e fechamento.

Se o grupo tiver 6 ou 7 pessoas:

- Dividir a demonstração em duas partes: tela inicial/configurações e partida/resultado.
- Dividir a parte técnica em componentes React e recursos como HTTP, localStorage e pontuação.
