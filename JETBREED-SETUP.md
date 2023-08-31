
npm install axios

npm i -D react-router-dom@latest

Install Extension: "Tailwind CSS IntelliSense"


////////////////////////////////////////////////////////////////////////////////////////////////////////////

Instead of going to the TailwindCSS website documentation to follow the Framework Guide for Create React App,
follow the below steps: >>>>>

<!-- CODE STEPS #
We fetched the Tailwind CSS package and placed it in a variable.
We wrapped tailwind.js (our default base configuration) in our tailwindcss variable.
We fetched the autoprefixer package. -->



<!-- To set up our project, we’ll scaffold a new React app using create-react-app. If you have already done this, skip this process, otherwise, run the command below:
npx create-react-app react-tailwindcss && cd react-tailwindcss -->

<!-- USING NPM # -->
npm install tailwindcss postcss-cli autoprefixer@9.8.6 -D



<!-- Next, we install a few development dependencies. You can use any of the options that work for you. -->
<!-- USING YARN # -->
yarn add tailwindcss postcss-cli autoprefixer -D


<!-- We need to initialize Tailwind CSS by creating the default configurations. Type the command below in your terminal: -->
<!-- This command creates a tailwind.js in your project’s base directory; the file contains the configuration, such as our colors, themes, media queries, and so on. It’s a useful file that helps with predefined sets of properties which will aid the need to re-brand certain conventions or properties if the need arises. -->
npx tailwind init tailwind.js --full


<!-- How To Configure PostCSS? #
The PostCSS documentation states that:

“PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.”
WHY AUTOPREFIXER? #
It’s necessary to install Autoprefixer alongside Tailwind CSS because Autoprefixer usually tracks caniuse.com to see which CSS properties need to be prefixed. Hence, Tailwind CSS does not provide any vendor prefixing. If you’re curious as a cat in regards to PostCSS navigate to their documentation.

Create a PostCSS configuration file in your base directory manually or using the command: -->
touch postcss.config.js



<!-- Add the following lines of code to your PostCSS file: -->
<!-- Because PostCSS is necessary to lint our CSS, hence this configuration. -->
const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
};



<!-- How To Inject Tailwind’s Components, Utilities And Base Styles To Your App #
Inside your src folder create a folder, name it assets, this is where all your styles would be stored. In that folder, create a tailwind.css file and main.css file respectively. The tailwind.css file will be used by us to import Tailwind CSS styles, and for custom configurations and rules. The main.css will hold the styles that are generated as a result of what we have in the tailwind.css file. -->

<!-- Next, we need to import the base styles and configurations. We will do that in one of the CSS files we created above. Add the following to your tailwind.css file. -->
@tailwind base;

@tailwind components;

@tailwind utilities;


<!-- Tailwind CSS will swap these directives out at build time with all of its generated CSS. If you’re using postcss-import, use this instead: -->
@import "tailwindcss/base";

@import "tailwindcss/components";

@import "tailwindcss/utilities";



<!-- How To Configure Your App To Build Your CSS #
Next, we need to configure our project to build our CSS styles each time we run either the npm start or yarn start command.

Open your package.json file and use the snippet below in place of the script part of your package.json file: -->

"scripts": {
  "start": "npm run watch:css && react-scripts start",
  "build": "npm run watch:css && react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "watch:css": "postcss src/assets/tailwind.css -o src/assets/main.css"
}



<!-- Importing Our CSS #
We need to import our CSS file appropriately to ensure that it’s properly watched and built when we run yarn start or npm start.

Open your index.js file and make the following changes: -->

<!-- Import our main.css file and delete import './index.css';. -->
<!-- Your *index.js* should look like this after the changes:
import React from "react";
import ReactDOM from "react-dom";
import './assets/main.css';
import App from "./App";
ReactDOM.render(<App />, document.getElementById("root")); -->
import './assets/main.css'


<!-- Head over to App.js and delete import logo from './logo.svg'; leaving only import React from 'react';. Also delete everything inside the App component. (Don’t worry if our App.js looks barren now — we’ll add some code as we proceed in this post.) -->



To start your app, type this command npm start or yarn start.

<!-- You’d observe that our Tailwind CSS is building the necessary files needed in main.css. -->

////////////////////////////////////////////////////////////////////////////////////////////////////////////

<!-- Optimization For Production #
When building for production, it’s advisable to trim your build files, especically the css and js files. Both files currently have outrageous sizes. -->

<!-- You’ll agree with me that the CSS file size is scary for production, but the good news is that there’s a way out. To minify our CSS size, run in your terminal, -->
npm i @fullhuman/postcss-purgecss  


<!-- and then add the following code in postcss.config.js: -->
const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"),
    require("autoprefixer"),
    require("@fullhuman/postcss-purgecss")({
      content: ["./src/**/*.js", "./public/index.html"],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g)|| [],
    }),
  ],
};


<!-- CODE STEPS #
The first step we took was requiring the @fullhuman/postcss-purgecss, next we invoked it as a function and passed in some configuration.
The content property specifies paths to our templates files, and in this case, the templates files are our js and html file, and as such we specified the paths.
Next, we need to tell purgecss how to find unused css classes and remove them, we do this using the defaultExtractor key, and we pass a function that retrieves the contents of the file and returns classnames that it finds in that file using a regEx.
Using the regex, we check to see it the content found matches a pattern( classes with uppercase, lowercase, numbers, underscore, colons, and slashes) and if there isn’t a match we return an empty array.
Now, when we run the below in our terminal, -->
npm run build  

<!-- 
You can now see that our CSS size has been trimmed down from 186.67 KB to 1.02KB. That’s a lot if you ask me! Now, you can ship your app to production. -->


