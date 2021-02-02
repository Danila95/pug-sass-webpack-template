import Post from './Post'
import './styles/styles.css'
import json from './assets/json'
import WebpackLogo from './assets/webpack-logo.png'

const post = new Post('Webpack Post Title', WebpackLogo);

console.log('Post to String:', post.toString());

console.log('JSON:',json);