# Angular v8 with Lit element

This is an example app of how to use Lit element with Angular v8 (including IE11 support).

## Development

### Setup

1. Clone the repo: ``git clone https://github.com/nathan-andosen/ng-v8-lit-element.git``
1. ``cd ng-v8-lit-element``
1. ``npm install``

### Commands:

``npm run start`` - Start the dev server for development.

``npm run start -- --configuration es5`` - Start the dev server with es5 code, used for development in IE11.

## Steps required to add Lit element to an Angular app

___NOTE__: All these steps have already been done in this repository. These steps are provided in case anyone needs to update their current Angular app._

1. Install the dependencies (found below)
1. Update the browserslist file to include support for IE11
1. Add the custom-webpack.config.js file (root level of this project)
1. Add the tsconfig.es5.json file (root level of this project)
1. Update the angular.json file. Basically you have to add in the configuration for the custom webpack, add in the configuration to serve an es5 version and add in the scripts for the webcomponent polyfills.

__In the architect build section:__

* Update the _builder_ property to use custom-webpack
* Add in the _customWebpackConfig_ to the options section
* Add in the webcomponent polyfills to the _scripts_ array
* In the _configurations_ object, add in the new es5 config

```json
"architect": {
  "build": {
    "builder": "@angular-builders/custom-webpack:browser",
    "options": {
      "customWebpackConfig": {
        "path": "custom-webpack.config.js",
        "mergeStrategies": { "externals": "replace" }
      },
      "scripts": [
        "node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js",
        "node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js"
      ]
    },
    "configurations": {
      "es5": {
        "tsConfig": "./tsconfig.es5.json"
      }
    }
  }
}
```

__In the architect serve section:__

* Update the _builder_ property to point to the custom webpack
* Update the _configurations_ object to add in the new es5 config. __IMPORTANT:__ You will have to swap out the _ng-v8-lit-element_ name with the actually name of your project

```json
"architect": {
  "serve": {
    "builder": "@angular-builders/custom-webpack:dev-server",
    "configurations": {
      "es5": {
        "browserTarget": "ng-v8-lit-element:build:es5"
      }
    }
  }
}
```

6. Add the CUSTOM_ELEMENTS_SCHEMA to your app module. Refer to the _/src/app/app.module.ts_ for an example.
1. Now your Angular application is ready for use with Lit element
1. Create your Lit element web component. Refer to _/src/app/my-wc-component.ts_ for an example.
1. Now import your webcomponent. I choose to import it in the main.ts file: ``import "./app/my-wc-component";``
1. Now, in your app.component.html page, add in your web component ``<my-wc-component message="My first component"></my-wc-component>``


## Dependencies

* __Web component polyfills__ - ``npm install @webcomponents/webcomponentsjs --save``
* __Lit element__ - ``npm install lit-element --save``
* __Angular custom webpack__ - ``npm install @angular-builders/custom-webpack --save-dev``
* __Babel__ - ``npm install --save-dev @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/runtime babel-loader``