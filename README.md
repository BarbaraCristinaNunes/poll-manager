# test-003-2022

Este projeto foi iniciado em 15/08/2022 e finalizado em 24/08/2022


### *Tecnologias usas*
Gerais: 
* Windows 10
* Git v 2.33.0.windows.2
* Visual Studio Code
* XAMPP v 8.0.11
* npm: v 8.14.0
* node v 16.14.2

Back-end:
* cors v 2.8.5
* express v 4.18.1
* mariadb v 3.0.1
* sequelize v 6.21.3

Front-end:
* react v 18.2.0
* Material UI v 5.10.1
* axios v 0.27.2

----
## Pasta server

Nesta pasta encontra-se o projeto do back-end, que foi desenvolvido em Node.js.

----
### **Passos para iniciar o back-end**

* Após clonar este repositório, vá para a pasta server (`cd server`) e rode `npm install` para instalar as dependências.

* Crie o banco de dados node no seu servidor

* No arquivo config/config.json altere as informações de configuração relacionadas ao banco de dados com os seus dados na chave development.

* Rode npx sequelize-cli db:migrate para criar as tabelas Polls e Options no banco de dados

* Rode `node server` para iniciar o back-end
 ---
### *Pasta models*

Na pasta models você encontra os arquivos options.js e polls.js que são classes que representam as tabelas que foram criadas para esse projeto.

    Em polls.js existe uma variável virtual chamada status. Não existe uma coluna na tabela polls para essa variável porque ela existe apenas nesse arquivo e a mesma é a adicionada a resposta que é enviada para o front-end.

* A variável status é uma variável dinâmica, pois toda vez que determinada enquete ou todas as enquetes são chamadas a função get() verifica se o momento atual corresponde ou não ao intervalo em que as enquetes estariam ativas, retornando um objeto que contém uma chave para a string que representa o status da enquete e uma chave cujo valor é boleano e representa se a enquete está ou não habilitada para ser votada.

-----
### *crud.js*

No crud.js você encontra todas as funções de mostrar, criar, alterar e deletar dados das tabelas. Além disso, decidi tratar todas as operações relacionadas à votação no back-end. 

Para contabilizar os votos que cada opção de uma enquete recebe existe a função updateOptionScore(), que incrementa 1 ao score da opção cada vez que é chamada no fron-end. Para mostrar a soma de todos os votos que uma enquete recebeu escrevi a função getTotalVotes().

---------

### *server.js*

No server estão todos os endpoints que ligam o front-end com as funções do crud.js.

----------------------

## Pasta client

Nesta pasta encontra-se o projeto do front-end, que foi desenvolvido em React.js e Material UI. A minha escolha por essas bibliotecas se deu pois tenho maior familiaridade com essas tecnologias e elas facilitam o desenvolvimento de aplicações responsivas, que são ideais para uso mobile, e o desenvolvimento de templates amigáveis e atraentes em um curto prazo. 

------------
### **Passos para iniciar o front-end**
Após clonar este repositório, vá para a pasta client (`cd client`) e rode `npm install` para instalar as dependências.

Rode `npm start` para iniciar o front-end

-------------
### *Pasta src/components*

* NavBar.js => É o componente da barra de navegação

* Operations.js => É um arquivo onde estão funções que são utilizadas nos componentes do projetoç

* PollsPainel => É um componente onde gerencio o que será mostrato para o usuário. Neste caso esse componente mostra o formulário de criação de nova enquete, uma enquete específica ou todas as enquetes que são mostradas de acordo com a paginação.

* /polls => Nessa pasta encontram-se os componentes que estruturam as enquetes.

* /createPoll => Nessa pasta encontram-se os componentes que estruturam o formulário de criar nova enquete.

------------

### *Pasta src/components/polls*

* AllPolls.js => Este componente mostra o título de todas as enquetes que existem no banco de dados e é onde o usuário seleciona qual enquete deseja ver.

---
### *src/components/polls/components/Poll.js* 

Este componente mostra as informações de uma enquete específica e chama o componente Option.js. Também mostro o total de votos em tempo real e gerencio o status da enquete utilizando um setInteval() que chama as funções getPollById() e getTotalVotes() a cada 0.5 segundos. 

Dessa forma garanto que o total mostrado está sempre atualizado e que o usuário não irá votar na enquete caso o momento em que ele está na mesma corresponda ao momento de término.

---
### *src/components/polls/components/Option.js* 

Este componente representa uma unica opção de uma enquete. Portanto para mostrar todas as opções eu realizo um .map() em Poll.js. Aqui os componentes são representados em checkbox que estão disponíveis para interação do usuário apenas se a enquete estiver ativa e se o usuário ainda não tiver votado.

O voto do usuário é salvo no localStorage todas as vezes que o mesmo vota em uma enquete. O voto é salvo como um objeto que contem o id da opção selecionada e da enquete à qual a opção pertence. 

    Fiz da forma descrita acima pois pensei em um sistema em que cada usuário pode votar apenas uma vez e sem a necessidade de registrar o usuário no banco de dados. Para reverter isso basta retirar ou comentar o código que salva o voto no local storage e limpar o mesmo.

O voto é checado pela função checkVote() do Operations.js e utilizada nos componentes:

* AllPolls.js => Para informar ao usuário que ele já votou na enquete.

* Poll.js => Para verificar se o usuário votou em uma enquete específica e desabilitar a mesma quaso o usuário tenha votado.

* Option.js => Para verificar qual opção foi votada e mantê-la como selecionada.

Nesse componente também existe um setInterval() que chama a função getOptionById() para que possamos saber o total de votos de cada opção em tempo real.

------------
### *src/components/creaatePoll/CreatePoll.js* 

Este componente é o formulário de criação de novas enquetes. Ele chama os componentes PollDate.js a SavePoll.js.

Create.Poll.js contém todas as informações necessárias para fazer uma enquete e as envia para o componente SavePoll.js. SavePoll.js é um botão de criar que fica abilitado apenas quando não existe variávels vazias em CreatePoll.js. Essa verificação é feita pela função checkNewPollData() do arquivo Operations.js. Dessa forma eu garanto que nenhuma coluna fique em branco nas tabelas polls e options.