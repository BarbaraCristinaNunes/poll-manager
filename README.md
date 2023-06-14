# Poll manager

Este projeto foi iniciado em 15/08/2022 e finalizado em 24/08/2022

*Observação: Esse projeto foi testado em um computador que contém o sistema operacional Windows 10*
## **Dependências**

* npm: v 8.14.0
* node v 16.14.2
* MariaDB v 10.4.21

*Observação: As informações de instalação do MariaDB encontram-se no site [MariaDB Foundation](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.9.2&os=windows&cpu=x86_64&pkg=msi&m=serverion). O MariaDB também pode ser intalado via [XAMPP](https://www.apachefriends.org/download.html)*

----

## **Instalação do projeto**

### Passos para iniciar o back-end

* Após clonar este repositório, vá para a pasta server (`cd server`) e rode `npm install` para instalar as dependências.

* Altere as informações de configuração relacionadas ao banco de dados com os seus dados na chave `development` localizada no arquivo `config/config.json`.

* Crie um banco de dados no seu servidor e coloque o nome do mesmo no arquivo `config/config.json`.

* Rode `npx sequelize-cli db:migrate` para criar as tabelas Polls e Options no banco de dados/

* Rode `node server` para iniciar o back-end

### Passos para iniciar o front-end
* Após clonar este repositório, vá para a pasta client (`cd client`) e rode `npm install` para instalar as dependências.

* Rode `npm start` para iniciar o front-end


----
## **Projeto do back-end**

O projeto do back-end encontra-se na pasta `server` e foi desenvolvido em Node.js. O ORM Sequelize foi utilizado para gerenciar o banco de dados.

### *Pasta models*

Na pasta models você encontra os arquivos options.js e polls.js. Esses arquivos representam as tabelas que foram criadas para esse projeto.

Na classe Polls existe o método `getPollStatus()` que verifica se o momento atual corresponde ou não ao intervalo em que a enquete estaria ativa. Esse método retorna um objeto contendo o status da enquete (string) e se ela está ou não ativa (dado boleano) sempre que a mesma é instanciada.  O objeto retornado por esse método é salvo na variável **status** da enquete. 

> A variável **status** é uma variável virtual dinâmica que exite apenas em polls.js. Não existe uma coluna na tabela polls para essa variável.

### *crud.js*

Os métodos responsáveis por *mostrar, criar, deletar e alterar* os dados das tabelas estão no arquivo crud. 

O método `updateOptionScore()` contabiliza os votos que cada opção de uma enquete recebe. Essa função incrementa o score da opção sempre que é chamada utilizando o  método `increment() `do sequelize. Você pode ler mais sobre a função incremente [aqui](https://sequelize.org/docs/v6/core-concepts/model-instances/)

> Embora os métodos `deletePoll()`, `updatePoll()` e `deleteOption()` estejam no crud.js e funcionando, não são métodos utilizados no fron-end. Portanto, não foram escritos endpoints para os mesmos. 

### *server.js*

No server estão todos os endpoints que ligam o front-end com as funções do crud.js.

------------
## **Projeto do front-end**

O projeto do front-end encontra-se na pasta `client`. O front-end foi desenvolvido em React.js e Material UI, pois são bibliotecas que facilitam o desenvolvimento de aplicações responsivas, que são ideais para uso mobile. 
### *Pasta src/components*

* NavBar.js => É o componente da barra de navegação

* Operations.js => É um arquivo onde estão alguns métodos que são utilizados nos componentes do projeto

* PollsPainel.js => O gerenciamento do que será mostrato para o usuário ocorre nete arquivo. O componente PollsPainel mostra o formulário de criação de nova enquete, uma enquete específica ou todas as enquetes, que são mostradas de acordo com a paginação.

* /polls => Nessa pasta encontram-se os componentes que estruturam as enquetes.

* /createPoll => Nessa pasta encontram-se os componentes que estruturam o formulário de criar nova enquete.

### *Pasta src/components/polls*

* AllPolls.js => Este componente mostra o título de todas as enquetes que existem no banco de dados e é onde o usuário seleciona qual enquete deseja ver.

### *src/components/polls/components/Poll.js* 

Este componente mostra as informações de uma enquete específica e utiliza o componente Option.js.

### *src/components/polls/components/Option.js* 

Este componente representa uma unica opção de uma enquete. Portanto um `.map()` é realizado em Poll para mostrar todas as opções de uma enquete. Aqui as opções são representadas em checkboxs que estão disponíveis para interação do usuário apenas se a enquete estiver ativa e se o usuário ainda não tiver votado.

O voto do usuário é salvo no `localStorage` sempre que o mesmo vota em uma enquete. O voto é salvo como um objeto que contem o id da opção selecionada e da enquete à qual a opção pertence. 

> Todo o projeto foi pensado para simular um sistema de votação cujo usuário pode votar apenas uma vez em cada enquete. O voto do mesmo é salvo no `localStorage` para que não seja necessário manter um cadastro de usuários no banco de dados. 

*Observação 1: Para tornar o projeto em um sistema de votação no qual o usuário pode votar quantas vezes quiser em qualquer enquete é necessário retirar ou comentar o código que salva o voto no `localstorage`,  limpar o mesmo usando o método `localStorage.clear()` e desativar o código checa se a enquete já foi ou não votada.*

*Observação 2: O usuário poderá votar em uma enquete mais de uma vez caso esteja usando uma sessão anônima, pois os dados gerados neste cenário não são salvos permanentemente no localStorage.*


O voto é checado pelo método `checkVote()` do Operations.js. A resposta desse método é utilizada nos componentes:

* AllPolls.js => Para informar ao usuário que ele já votou na enquete.

* Poll.js => Para verificar se o usuário votou em uma enquete específica e desabilitar a mesma caso o usuário tenha votado.

* Option.js => Para verificar qual opção foi votada e mantê-la como selecionada.

> Nesse componente também existe um `setInterval()` que utiliza a função `getOptionsByPollId()` para retorna todas as opções de uma enquete. O objetivo aqui é acessar os dados das opções a cada minuto e mostrar o score e o total de votos de uma enquete em tempo real.

### *src/components/creaatePoll/CreatePoll.js* 

Este componente é o formulário de criação de novas enquetes. Ele utiliza os componentes PollDate.js e SavePoll.js.

Create.Poll.js contém todas as informações necessárias para fazer uma enquete e as envia para o componente `SavePoll`. 
O componente `SavePoll` é um botão que chama os métodos `createPoll()` e `createOption()` do crud.js. Esse métodos são responsáveis por criar uma nova enquete e uma nova opção no banco de dados.

O botão de criar do componente SavePoll fica habilitado apenas quando não existem variáveis vazias em CreatePoll.js. Essa verificação é feita pela função `checkNewPollData()` do arquivo Operations.js. Dessa forma é garantido que nenhuma coluna das tabelas polls e options fique em branco/vazias.
