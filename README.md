# NLW-Next-Level-Week #2 - Server

<details>
 <summary>GitHub Pages</summary>

1. [Web](https://shyoutarou.github.io/NLW2_Web/)
2. [Mobile](https://shyoutarou.github.io/NLW2_Mobile/)

</details>

<h1 align="center">
    <img alt="NextLevelWeek" title="#NextLevelWeek" style="object-fit: cover; width:250px; height:250px;" src=".github/nlw.gif"  />
</h1>

<h2 align="center">
  <img src="https://img.shields.io/badge/Next%20Level%20Week-%232-blue?style=for-the-badge" alt="Nome e edição do evento" />
  <img src="https://img.shields.io/badge/web%3F-ok-blue?style=for-the-badge" alt="Server Ok" />
  <img src="https://img.shields.io/github/license/matheusfelipeog/proffy?color=blue&style=for-the-badge" alt="License" />
</h2>

## 📌 Index

- [NLW-Next-Level-Week #2 - Server](#nlw-next-level-week-2---server)
  - [📌 Index](#-index)
  - [❔ Sobre o projeto](#-sobre-o-projeto)
  - [🧐 Motivo](#-motivo)
  - [THE EXTRAMILE - Proffy 2.0](#the-extramile---proffy-20)
  - [📸 Screenshots](#-screenshots)
    - [Web Responsive Interface  para Desktop com ReactJS](#web-responsive-interface-para-desktop-com-reactjs)
    - [Mobile Interface com React Native](#mobile-interface-com-react-native)
    - [Utilitários](#utilitários)
    - [🛠 Days e Techs](#-days-e-techs)
    - [Desenvolvimento NLW2_Web wiki!](#desenvolvimento-nlw2_web-wiki)
  - [⚙ Instalação e Start](#-instalação-e-start)
    - [Comandos para instalar no MAC](#comandos-para-instalar-no-mac)
    - [Comandos para instalar no Windows PowerShell](#comandos-para-instalar-no-windows-powershell)
    - [Clonagem](#clonagem)
    - [Como executar o projeto](#como-executar-o-projeto)
    - [📦 Executar Server API REST](#-executar-server-api-rest)
    - [💻 Executar Projeto Web](#-executar-projeto-web)
    - [📱 Executar Projeto Mobile](#-executar-projeto-mobile)
  - [🐛 Issues](#-issues)
  - [🤝 Contribuições](#-contribuições)
  - [Agradecimentos](#agradecimentos)
  - [Referências](#referências)
  - [📜 License](#-license)

<p align="center">
  <a href="https://insomnia.rest/run/?label=Proffy&uri=https%3A%2F%2Fgithub.com%2Frafacdomin%2Fproffy%2Fblob%2Fmaster%2Fapi%2FInsomnia_proffy.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## ❔ Sobre o projeto

Durante o evento Next Level Week #2, foi desenvolvido a projeto Proffy, que é uma plataforma de estudos online, conectando alunos com professores para aulas online, tendo um calendário para o professro com seus horários disponíveis para que os alunos possam entrar em contato, não engloba vídeo. Trazendo uma representação e homenagem para o dia nacional do profissional da educação, que é comemorado no dia 06 de agosto.

O projeto está sendo desenvolvido na [Next Level Week 2](https://nextlevelweek.com/episodios/omnistack/1/edicao/2). Uma plataforma de estudos online que visa conectar alunos e professores de forma rápida e fácil.

Este projeto é uma parte de uma trilogia: 
- [NLW2_Server](https://github.com/shyoutarou/NLW2_Server)
- [NLW2_Web](https://github.com/shyoutarou/NLW2_Web)
- [NLW2_Mobile](https://github.com/shyoutarou/NLW2_Mobile)

## 🧐 Motivo

Desenvolvimento apartir do projeto [Next Level Week 2](https://github.com/shyoutarou/NLW-Next-Level-Week-2), visa atender os Desafios lançados no final na semana NLW#2, desenvolvido pela [Rocketseat](https://rocketseat.com.br/).
  
## THE EXTRAMILE - Proffy 2.0

<h2 align="left"> 📥 Figma layout available for download at: </h2>

- [Instruções](https://www.notion.so/Vers-o-2-0-Proffy-eefca1b981694cd0a895613bc6235970)
- [Proffy-Web 2.0](https://www.figma.com/file/Agvethfp7FANyXDDU3LUfd/Proffy-Web-2.0)
- [Proffy-Mobile 2.0](https://www.figma.com/file/nZ7lMEBYZSMhRxfdvy6fKz/Proffy-Mobile-2.0)

- [x] Autenticação
  - [x] Login / Logout 
  - [x] Permanecer logado - Token
  - [x] Recuperar senha
- [x] Manutenção de Perfil do usuário
- [x] Adicionar e remover os Horários no cadastro das Aulas 
- [ ] Deploy

## 📸 Screenshots

### Web Responsive Interface  para Desktop com ReactJS
<p align="center">
  <img src=".github/appweb.gif" alt="Study Page in Mobile" width="100%" />
</p>

### Mobile Interface com React Native

<p align="center">
  <img src=".github/appmobile.gif" alt="Landing Page Proffy in Mobile" width="25%" />
</p>

### Utilitários

- Protótipo: **[Figma](https://www.figma.com/)** &rarr; **<kbd>[Protótipo (Proffy)](https://www.figma.com/file/GHGS126t7WYjnPZdRKChJF/Proffy-Web/duplicate)</kbd>**
- Editor: **[Visual Studio Code](https://code.visualstudio.com/)** &rarr; Extensions: **<kbd>[SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite)</kbd>**
- Markdown: **[StackEdit](https://stackedit.io)**, **<kbd>[Markdown Emoji][markdown_emoji]</kbd>**
- Commit Conventional: **[Commitlint](https://github.com/conventional-changelog/commitlint)**
- Teste de API: **[Insomnia](https://insomnia.rest/)**
- Ícones: **[Feather Icons](https://feathericons.com/)**, **[Font Awesome](https://fontawesome.com/)**
- Fontes: **[Archivo](https://fonts.google.com/specimen/Archivo)**, **[Poopins](https://fonts.google.com/specimen/Poppins)**

### 🛠 Days e Techs

| Dia | Descriçao | tecnologias |
|:---:|---------|:-----------:|
|  03/08  |Acelerando sua evolução| ![npm](https://img.shields.io/npm/v/react?color=black&label=React&logo=react)  ![npm](https://img.shields.io/npm/v/typescript?color=black&label=Typescript&logo=typescript&logoColor=blue) |
|  04/08  |Olhando as oportunidades| ![npm](https://img.shields.io/npm/v/express?color=black&label=Express&logo=node.js)   ![npm](https://img.shields.io/npm/v/knex?color=black&label=Knex&logo=wolfram&logoColor=orange)           |
|  **05/08**  |**A escolha da stack**|    ![npm](https://img.shields.io/npm/v/axios?color=black&label=Axios&logo=insomnia&logoColor=purple)   ![npm](https://img.shields.io/npm/v/sqlite3?color=black&label=Sqlite3&logo=sqlite&logoColor=Blue)       |
|  06/08  |Até 2 anos em 2 meses|   ![npm](https://img.shields.io/npm/v/react-native?color=black&label=React-Native&logo=react) ![npm](https://img.shields.io/npm/v/expo?color=black&label=Expo&logo=expo)            |
|  **07/08**  |**A milha extra**|             |

### Desenvolvimento NLW2_Web wiki!

Resumo dos dois dias da NLW da Rocketseat que conecta a API.

3. [Aula 3](https://github.com/shyoutarou/NLW2_Web/wiki/Aula-3-(05-08-2020):-Front-e-Back-End-Web)
5. [Aula 5](https://github.com/shyoutarou/NLW2_Web/wiki/Aula-5-(07-08-2020)---Finalizando-app-mobile)


## ⚙ Instalação e Start

### Comandos para instalar no MAC

| Tecnologia | Versão | Comando para instalar |
|:----------|------|---------------------|
|NodeJS| 12.18.2| ``` brew install node ``` |
|Yarn  |  1.17.3 | ```npm install -g yarn``` |
|Expo  |  3.23.1 |  ```yarn add global expo-cli```|

### Comandos para instalar no Windows PowerShell

| Tecnologia | Versão | Comando para instalar |
|:----------|------|---------------------|
|Chocolatey| 0.10.15| ```Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1')) ``` |
|NodeJS| 12.18.2| ``` choco install nodejs ``` |
|Yarn  |  1.17.3 | ```npm install -g yarn``` |
|Expo  |  3.23.1 |  ```yarn add global expo-cli```|

Certifique-se de que tenha o `Node.js` e um gerenciador de dependências em seu ambiente antes de seguir os passos abaixo.

Para instalar e startar a plataforma Proffy, use `npm` ou `yarn`:

### Clonagem

Primeiro, clone o repositório para seu ambiente:

```bash
> git clone https://github.com/shyoutarou/NLW2_Server.git 
```

Depois, entre no repositório clonado e no diretório correspondente ao que quer testar (web, server).
Logo após, insira os seguintes comandos no seu terminal para cada diretório respectivamente:

### Como executar o projeto

Podemos considerar este projeto como sendo divido em três partes:

Back End (pasta server) Front End (pasta web) Mobile (pasta mobile)

💡 Tanto o Front End quanto o Mobile precisam que o Back End esteja sendo executado para funcionar.

### 📦 Executar Server API REST

```bash
# Entra no diretório "server"
> cd ./server

# Instala todas as dependências
> yarn install or npm install

# Execute migrations
> yarn knex:migrate

# Start o servidor web para a plataforma Proffy
> yarn start  or npm run start

# Será startado em `http://localhost:3333`
```
### 💻 Executar Projeto Web

```bash
# Entra no diretório "web"
> cd ./web

# Instala todas as dependências
> yarn install or npm install

# Starta o servidor web para a plataforma Proffy
> yarn start  or npm run start

# Será startado em `http://localhost:3000`
```
### 📱 Executar Projeto Mobile

```bash
# Go into the repository
$ cd ./mobile

# Install dependencies
$ yarn install or npm install

# Run
$ yarn start or npm run start

# Expo will open, just scan the qrcode on terminal or expo page

# If some problem with fonts, execute:
$ expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/poppins
```

## 🐛 Issues

Sinta-se à vontade para registrar um novo problema com o respectivo título e descrição no repositório Proffy. Se você já encontrou uma solução para seu problema, adoraria revisar sua solicitação de pull!

## 🤝 Contribuições

Siga os passos abaixo para contribuir:

1. Faça o *fork* do projeto (<https://github.com/shyoutarou/NLW2_Server.git>)

2. Clone o seu *fork* para sua maquína (`git clone https://github.com/user_name/NLW2_Server.git`)

3. Crie uma *branch* para realizar sua modificação (`git checkout -b feature/name_new_feature`)

4. Adicione suas modificações e faça o *commit* (`git commit -m "Descreva sua modificação"`)

5. *Push* (`git push origin feature/name_new_feature`)

6. Crie um novo *Pull Request*

7. Pronto, agora só aguardar a análise 🚀 

## Agradecimentos

<div align=center>
  <table style="width:100%">
    <tr align=center>
      <th><strong>Rocketseat</strong></th>
      <th><strong>diego3g</strong></th>
    </tr>
    <tr align=center>
      <td>
        <a href="https://rocketseat.com.br/">
          <img width="200" height="180" src="https://user-images.githubusercontent.com/38081852/83981650-1e2e6680-a8f6-11ea-9f42-6df8fe809e4b.png">
        </a>
      </td>
      <td>
        <a href="https://github.com/diego3g">
          <img width="200" height="180" src="https://user-images.githubusercontent.com/38081852/83981712-b7f61380-a8f6-11ea-9099-bd3677e97e39.jpg">
        </a>
      </td>
    </tr>
  </table>
</div>

## Referências

- [Autenticação no React Native / ReactJS com Context API & Hooks](https://blog.rocketseat.com.br/autenticacao-no-react-native-reactjs-com-context-api-hooks/)
- [https://blog.rocketseat.com.br/reactjs-autenticacao/](https://blog.rocketseat.com.br/reactjs-autenticacao/)
- [Autenticação JWT no React Native com API REST em NodeJS](https://blog.rocketseat.com.br/autenticacao-react-native-nodejs/) 
- [Iniciando com React Native: Navegação e Autenticação com JWT](https://blog.rocketseat.com.br/react-native-autenticacao/)
- [Tipos de navegação no React Native](https://blog.rocketseat.com.br/navegacao-react-native/)
- [How I set up React and Node with JSON Web Token for Authentication](https://medium.com/@romanchvalbo/how-i-set-up-react-and-node-with-json-web-token-for-authentication-259ec1a90352)
- [React (without Redux) - JWT Authentication Tutorial & Example](https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example)
- [Scroll infinito no React Native](https://blog.rocketseat.com.br/scroll-infinito-no-react-native/)
- [Deploy NLW](https://www.notion.so/Deploy-NLW-56f2a980c20e41d6b1dd22a4d1348e6e)

## 📜 License

O projeto publicado em 2020 sobre a licença [MIT](./LICENSE) ❤️ 

Made with ❤️ by Shyoutarou

Gostou? Deixe uma estrelinha para ajudar o projeto ⭐

 


