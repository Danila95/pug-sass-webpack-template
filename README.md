# pug-sass-webpack-template

 - Это  шаблон для сборщика проектов webpack 4.41.5
 - It is template for projects webpack 4.41.5 (for getting start learn webpack)

<div>
	<a href="https://webpack.js.org"><img width="200" heigth="200" src="https://webpack.js.org/assets/icon-square-big.svg"></a>
	<a href="https://sass-lang.com/"><img src="https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" height="150"></a>
	<a href="https://pugjs.org/api/getting-started.html"><img src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="200"></a>
	<a href="https://babeljs.io/"><img src="https://cdn.worldvectorlogo.com/logos/babel-10.svg" height="200"></a>
</div>

Это моя улучшенная версия моего предыдущего сборщика проектов webpack. В данной версия добавил несколько новых фич, а также исправил некоторые баги, которые тянулись с предыдущей версии. 
Предыдущая версия: https://github.com/Danila95/pug-stylus-webpack-template

## Как пользоваться

после клонирования моего шаблона на ваш компьютер не забудьте в консоле прописать команду (в зависимости, каким пакетным менеджером вы пользуетесь):
 - npm: `npm install`
 - yarn: `yarn install`

 ## Getting Started
enter command `npm install` or `yarn install` (if you use yarn) to install dependencies.

## Commands

- `npm run dev` - for development.
- `npm run build` - build static files in `prod` directory.
- `npm run watch` - start webpack-dev-server.
- `npm run start` - start webpack.
- `npm run dash-watch` - start webpack-dev-server with awesome plagin-interface webpack-dashboard.
- `npm run prop` - show some details of the current computer.
- `npm run stats` - run plagin webpack-bundle-analyzer

## Источники которые я использовал при создании этого шаблона

 - https://www.youtube.com/watch?v=3aGSqasVPsI&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD
 - https://www.youtube.com/watch?v=eSaF8NXeNsA&t=1s&ab_channel=%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BB%D0%B5%D0%BD%D0%9C%D0%B8%D0%BD%D0%B8%D0%BD
 - https://habr.com/ru/post/524260/
 - https://medium.com/better-programming/webpack-dashboard-with-create-react-app-vue-cli-and-custom-configs-49166e1a69de

 
  npm-check-updates - это утилита, которая автоматически настраивает package.json, которая подтягивает последнии версии всех зависимостей
 - https://www.npmjs.org/package/npm-check-updates
 
 `npm install -g npm-check-updates` - install plagin npm-check-updates

 `ncu` - Show any new dependencies for the project in the current directory
 
 `ncu -u` - Run ncu -u to upgrade package.json
 
 `npm outdated` - show more information about latest versions


 ## БОНУС! плагин webpack-dashboard

 Этот плагин делает интерфейс вашей консоли в конфетку)

 <img src="https://camo.githubusercontent.com/168acfe4997e36655568a8ae6a6c08eb65f25073a58cf560aeeae1eb91d3fcc8/687474703a2f2f692e696d6775722e636f6d2f714c3664584a642e706e67"> 
