# Docker Compose - Vue.js - PHP Environment

# 1. Overview

This project provides a complete development environment using Docker Compose for a web application with a Vue.js frontend and a PHP backend.

* The environment is configured to facilitate a smooth development workflow with features like live compilation for Sass and hot-reloading for Vue.js. 
* The frontend and backend services run in separate Docker containers, allowing for clear separation of concerns.

## 1.1 Directory Structure
```
.
├── docker-compose.yml
│
├── .docker/
│   ├── Dockerfile.php
│   ├── Dockerfile.frontend
│   └── 000-default.conf
│
├── src/
│   ├── public/
│   │   ├── index.php
│   │   └── ... 
│   └── backend/
│       └── ... PHP files
│
├── frontend/
│   ├── node_modules/ ... Created by Dockerfile.frontend
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── components/ ...Vue Components
│       ├── styles/
│       └── main.scss
│
├── docs/
│
├── logs/
│
└── .gitignore
```

## 1.2 Getting Started

This section outlines the minimal steps required to get the development environment up and running.

## 1.2.1 Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

## 1.2.2 Installation

* **Clone Repository:** 
```bash
  git clone https://github.com/mnaatjes/docker-vue-php-template.git
  cd docker-vue-php-template
```

* **Build and Run Containers:**
```bash
  docker compose up --build -d
```
* **This command will:**
  * Build the frontend container using Dockerfile.frontend.
  * Build the php container using Dockerfile.php.
  * Start the npm run dev command in the frontend container.
  * Start the Apache server in the php container.

* **Access the application::**
  * Open your web browser and navigate to http://localhost:8085 to see the running application. 
  * The Vue.js application will be rendered inside the index.php file.


---


# 2.0 Vue.js

* **Overview and Concepts:**

## 2.1 Entry Point: Main.js

The `~/frontend/src/main.js` file is the entry point of your Vue.js application. 
* It's the first file that gets executed when the app loads. 
* Its primary job is to create the Vue app instance, import the main component (typically App.vue), and mount it to a specific HTML element in your index.php file.
* **Example `~/frontend/src/main.js` File:**

```js
  /**
   * @file ~/frontend/src/main.js
   * @description The main entry point for the Vue.js application. This file imports the root Vue component,
   * initializes the application instance, and mounts it to the DOM. It also imports the main SCSS file
   * for global styling.
   * @module Main
   */
  import { createApp } from 'vue' // Imports the function to create a Vue app
  import App from './App.vue'     // Imports the main component
  import './main.scss';           // Imports main sass file

  // Creates the Vue application instance
  const app = createApp(App);

  // Mounts the app to the HTML element with the ID 'app'
  app.mount('#app');
```

## 2.2 App.vue Root Component

The `~/frontend/src/App.vue` file is the root component of your application. 
* It acts as the container for all other components and defines the main layout and functionality of your app. 
* A Vue component file has three main sections: <template>, <script>, and <style>.
* **Example `~/frontend/src/App.vue` File:**

```vue
  <template>
    <div id="vue-app">
      <h1>Hello from Vue.js!</h1>
      <p>This is your main application component.</p>
      <button @click="incrementCount">Click me</button>
      <p>Button was clicked {{ count }} times.</p>
      
      <Table :data="tableData" />
      
    </div>
  </template>

  <script>
  import { ref } from 'vue';
  // Import the new Table component
  import Table from './components/Table.vue';

  export default {
    // Register the component
    components: {
      Table
    },
    setup() {
      const count = ref(0);
      
      // Sample data for the table
      const tableData = ref([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
      ]);
      
      const incrementCount = () => {
        count.value++;
      };

      return {
        count,
        incrementCount,
        tableData
      };
    }
  };
  </script>

  <style lang="scss">
  @use 'sass:color';

  #vue-app {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
    h1 {
      color: #42b983;
    }
    button {
      background-color: #42b983;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s;
      &:hover {
        background-color: color.adjust(#42b983, $lightness: -10%);
      }
    }
  }
  </style>
```

## 2.4 Index.php

For these files (`~/frontend/src/main.js` & `~/frontend/src/App.vue`) to work, you also need to ensure that your index.php (or index.html) file has an HTML element for the Vue app to mount to.

* The vite build process will automatically detect the entry point in main.js and inject the necessary script tags into this file when you build for production, or serve the content for development.
* **Example `~/src/public/index.php` File:**

```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Docker App</title>
  </head>
  <body>
      <div id="app"></div> <h1>Hello from PHP!</h1>
      
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      <script type="module" src="http://localhost:5173/src/main.js"></script>
  </body>
  </html>
```

---


# 3.0 Sass

* **Build Process Overview:**
The frontend container uses Vite, which is a modern frontend build tool. Vite is configured to handle both Vue.js components and Sass files automatically.

* When you run npm run dev in the frontend container, Vite starts a development server.
* This server watches your frontend/src directory for changes.
* Whenever you save a .scss or .vue file, Vite automatically compiles the Sass into CSS and hot-reloads your application in the browser.
* This means you can simply write your Sass code and save the file—the build tool handles the rest. This process is called "live compilation" or "hot-reloading," which is a key benefit of using a tool like Vite.

## 3.1 Creating Sass Files
* Create Sass document within `~/frontend/styles/...` Directory (See Below)
* Import the main Sass file into Vue.js application file `~/frontend/src/main.js`


### 3.1.1 SASS Project Structure and Organization
This contains overview of SASS project structure, best practices, variables, functions, and mixins

**7-1 Patterns:**
The most popular and effective way to structure a SASS project is the "7-1 Pattern": 
* 7 folders for your partial files
* 1 main.scss file to
  import them all.

**Separation of Concerns**
It's not just that you *can* add properties to the same tag in multiple files—it's that you **should**. Each file has a different purpose and level of specificity.


### 3.1.2 Directory Structure

```
/frontend/
├── src/
│   ├── main.js
│   ├── App.vue
│   └── styles/
│       ├── abstracts/
│       │   ├── _variables.scss #All Sass Variables
│       │   ├── _funcitons.scss
│       │   ├── _mixins.scss
│       │   └── _placeholders.scss # Placeholder Selectors
│       ├── base/
│       │   ├── _reset.scss # Reset / Normalize Styles 
│       │   ├── _typography.scss # Rules (h1, p, etc.)
│       │   └── _base.scss # Base style for common elements
│       ├── components/
│       │   ├── _button.scss
│       │   ├── _card.scss
│       │   └── _navigation.scss
│       ├── layout/
│       │   ├── _header.scss
│       │   ├── _footer.scss
│       │   └── _grid.scss # Grid System
│       ├── pages/
│       │   ├── _home.scss 
│       │   └── _contact.scss
│       ├── themes/
│       │   ├── _dark.scss
│       │   └── _light.scss
│       ├── vendors/
│       │   └── _bootstrap.scss # Third-party library
│       └── main.scss
```


## 3.2 Abstracts

**`abstracts/_placeholders.scss`:**
- *What are placeholders and what goes in the `./abstract/placeholders/` file?*

  * **Placeholder:** special type of selector in SASS that looks and acts like a class but begins with `%`

  * **A "Silent Class"** Rulesets that use placeholder selector will **not** be rendered into final CSS unless placeholder is explicitly `@extended`

  * The **`abstracts/_placeholders.scss`** file contains defined, reusable, non-outputting blocks of CSS properties.

  * **Cannot use namespaces:** When including `@use abstracts/placeholders` cannot declare a namespace like `as x`. 

  * **Examples:**
    * A base style for all message boxes:
    ```sass
      // ._placeholders.scss definitions
      %message-base {
        border: 1px solid;
        padding: 1rem;
        font-size: 0.75rem
      }

      // usage
      .some-class {@extend %message-base;}
    ```

**`abstracts/_variables.scss`**

  * **Purpose:** To define the **Static, Structural Constants** of the Design System. Values are the *fundamental* definitions of the site's layout 

  * **Syntax** `$var-name: value` and invoked where "v" is import namespace: `property: v.$var-name;`

  * Variables are the **bones** or *skeleton* of the entire site.

  * **Usage:** Use SASS variables for the static properties and **structural** styles at *compile-time*.

    * **Media Query Breakpoints:** use directly because this requires a static value; e.g. `@media(min-width: $breakpt-md)...`

    * **Grid System** logic for calcualting column widths, gutters, etc

    * **Sass Logic** when using loops `@if, @for, @each`

    * **Z-index Management** using a SASS map - which is a structural concern; e.g. `$z-indeces`

    * **Litmus Test:** *Does the SASS Compiler need this value to generate the CSS structure?*

  * **CSS Variables** used for *visual appearance* or "skin" of elements and styles. Anything that defines the *look and feel*

    * **Colors:** for `background-color, border-color, box-shadow`; Example:

    ```sass
      // sass variable definition
      // abstracts/_variables.scss
      $border-color: #999999;
      $border-color-dark: #f9f9f9

      // CSS variable reference
      // theme/_config.scss
      :root {
        --border-color: $border-color;
      }

      // theme/_dark.scss
      .dark-theme {
        --border-color: $border-color-dark;
      }

      // usage
      // components/_card.scss
      .card{
        border-color: var(--border-color);
      }


    ```


    * **Typography:** `font-family, font-size, font-weight`

    * **Borders and Surfaces:** `border-radius, border-color, box-shadow`

    * **Spacing:** `paddings, margin, gap`

    * **Sizes:** `max-width, height`

    * **Litmus:** *Might I ever want to change this value?*


## 3.3 Base
- *What is the `base/` directory for and what does the name mean?*

* **`base/` Directory** holds foundational styles for the project, defined the standard look or raw HTML elements

  - *What goes in the `_base.scss` file? What is meant by "common elements"?*

  * The file should contain styles for the **most fundamental elements of the HTML document itself**

  * **Avoid using `*`** when defining styles. Instead use `<html>`

  * **Tags:** `<html>, <body>`    

  * **Responsive Media:** like images, videos, and other embedded media responsive by default, e.g. `img, svg {max-width...}`

  * **Global Box-Sizing:** is a modern *best practice*

  * **Other Global Element Styles:** Elements that are non-component like the `<hr>`

  * **Examples:**

  ```sass
    html {
      font-size: 16px; // Property related to html tag
      box-sizing: border-box; // Global box sizing
    }

    *,
    *::before {
      box-sizing: inherit // Global properties of non-components
    }
  ```

* **_reset.scss** Normalize file - i.e. to strip away all default browser styling - for a consistent, baseline work

  * Styles should only contain properties to *remove styles* and values that set a *neutral* state

  - *What is resetting / normalization and what is it not?*

  * **Resetting / Remove Evering Approach:**
    * **What:** Remove *all* built in browser styling
    * **Goal:** Forcing all elements to look identical and completely unstyled
    * **Example:** https://meyerweb.com/eric/tools/css/reset/

  * **Normalization: Make Everything Consistent**
    * **What:** Doen't remove *all* styles. Makes default styles consistent and preserves useful defaults
    * **Goal:** Elements that behave predictable and look reasonably well styled by default and regardless of browser
    * **Example:** https://necolas.github.io/normalize.css/

    * **Refrain** from using `_variables.scss` in `_reset.scss`

* **_typocraphy.scss** Defines the default appearance of all text elements like `<h1>, <p>, <a>` etc. Can define `color`, `line-height`, `font-size`, and `font-family`

  - *What is considered a "typography rule"? What goes in the `_typography.scss` file and what doesn't?*

      * Elements the `_typography.scss` file **Should Contain** selectors for raw HTML text elements: headings `<h1>, <h2>, <h3>...`, paragraphs `<p>`, lists `<ul>, <ol>, <li>`, and inline text elements like `<blockquote>, <em>, <small>, <strong>`

      * Properties the file **Should Contain** are: `font-size`, `margin`, `margin-bottom`, `color`, `text-decoration`...

      * Specific components or utilities **do not** belong in `_typography.scss` **nor do** class based properties; e.g. `.error-text{}` 

      * Typography *inside* a component **does not** belong here; it belongs with the other components; e.g. `button {}` because these styles are completely dependent upon the component.

      * Layout properties **don't belong** like `float:left` or `width: 100px` 

      * `<body` Foundational Font Settings **don't** belong

  * Holds typographic definitions for child elements, NOT `<html> or <body>` elements

* **Follow the Reset --> Style Pattern**
  * Separation ensures you are always building upon a consistent foundation
  * **Example:** reset inconsistent margins then in `_typography.scss` add back exact properties desired

* **_base.scss** Catch-all for other base styles applied to `<html> or <body>` elements such as `box-sizing`, `border-box`, `background-colors`...

  * **Single Responsibility Principle:** `_base.scss` is responsible for the specific rules governing **all** typofraphic elements
  * Set global defaults on the parent - even for typography attributes - in `_base.scss` 
  * Developer expects to check `_base.scss` for default behaviors


## 3.4 Components
- Is there just one button document for the entire site? Where do styles for states of the button go (e.g. hover, active, etc...)?

  * **Button States:** The styles for states like :hover, :active, and :focus go in the same file. Sass's nesting feature is perfect for this, as it keeps state-related styles logically grouped with the base component styles.

  * **One File:** Goal is to have on efile to define the `<button>` element and classes like `.btn-primary, .btn-lrg` etc.


- What goes in `components/` directory?

  * **Reusable** components able to be dropped anywhere on a site.

  * **Self-Contained** component styles should not depend on or *leak* out and affect other elements.

  * **Examples:** `_buttons.scss, _cards.scss, _forms.scss, _navbar.scss, _accordion.scss, _tooltips.scss`

- What **does not** go in the `components/` directory?

  * **No *Boilerplate*** styles that belone in `_reset.scss or _base.scss`

  * **Layout Styles:** Styles for the *major structural elements* should **not** be in `components/` and instead belong in `layout`. Examples of this are: `_header.scss, _sidebar.scss, grid.scss (.container, .row, .col)`

  * **Pages** Styles for `_home.scss`, etc

## 3.5 Layout
- If you aren't using a "grid system" or you are using flex or another layout - what do you call the document?

  * Use a common descriptive name for the primary layout and structural styles. **Examples:** `_layout.scss`, `_flexbox.scss`, etc.

  * **Major Structural / Semantic Elements** belong in the `layouts/` directory. 
    * **Examples:** `_header.scss, _sidebar.scss`.
    * These major elements should contain **all** of the style properties for the element (not just layout related properties).
    * These layout elements are considered non-reusable, *macro-components* which appear in *one* context.
    * **Exception:** When styling the *theme* of the `_header.scss`, those pertient styles belong in the `themes/` directory


## 3.6 Pages
- What is considered a page? 

  * **Unique and Specific** to *one page only*

  * **Non-reusable** styles or for *overriding* default look of a `component/_layout.scss` block

  * **Structural / Semantic Elements *Specific* to a *Page*:** For instance, if the `<header>` element (set in `layout/_header.scss`) requires a change of background property for the "about" or "home" page.

## 3.7 Themes
- Is all that goes in just "light" and "dark" or is there more to the `_themes.scss` file?

  * **Defining Swappable *Skins*** Aside from "light" or "dark" themes; i.e. **User-Choice** themes.

  * **Branding** themes; e.g. the site hosts projects from different companies - a "Google" theme in `themes/_google.scss`

  * **Accesibiity:** for instance, a *High-Contrast* color palette.


* **Theme:** A collection of *global* variables and styles controlling the aesthetic of the site 

  * **Separates the Core Structure** and layouts of components from their visual finish

  * Fulfills the role of a **Dynamic Theming System** instead of a *Static Design System*

* **Examples:**

  * `themes/_config.scss` for defining the "light" theme:

  ```sass
    // Root defines the light theme variables by default
    :root{
      --bg-color: $bg-color
    }
  ```

  * `themes/_dark.scss` for defining "dark" theme:

  ```sass
    // Class defines dark theme
    .theme-dark {
      --bg-color: $bg-color-dark;
    }
  ```

  * **Implementation:** The component (semantic element, etc...) use the **CSS Variable Syntax** to define the colors to that a theme can be imposed:

  ```base
    // in components/_card.scss
    .card {
      background-color: var(--bg-color);
    }
  ```


## 3.8 Vendors
- What are common vendors to use with sass?

- How are vendors installed / pulled?

- How are vendors applied / @use and imported?


## 3.9 Main.scss
The `main.scss` file acts as the single entry point and imports all the partials in a **specific** order. This order also structures dependencies with the last import being the **most dependent** on the sass framework.

**Import Order**
* Abstracts (no CSS Output)
* Vendors
* Base
* Layout
* Components
* Pages
* Themes

## 3.10 Rules and Best Practices
Common Rules and Practices

* **Avoid Global Scope** with mixins, variables, and functions by using namespaces

* **Use Explicit Dependencies**

* **@import Depreciated:**
```sass
  @use 'abstracts/variables' as var;
```

- When to use a **mixin** vs a **placeholder**?

* **Use Mixin (@mixin / @include) when:**
  * You need to pass an argument
  ```sass
    @mixin flex-center($direction: row){
      flex-direction: $direction;
    }
  ```

  * Working within a `scoped` component i.e. Vue or React and all the component's styles should be self-contained.

  * Use for **dynamic** and **parameter-driven** styles. Generally safer and more versatile.

  * Does it need an argument: @mixin

  * Working in a module syste,: @mixin

* **Use Placeholders (% / @extend) when:**
  * You have a static set of styles
  * Selectos have a clear *Semantic Relationship* with the classes that utilize it:
  ```sass
    // placeholder
    %button-base {}
    // classes
    .button-primary {}
    .button-secondary {}
  ```

  * Use for sharing fixed set of styles among related elements to produce smallest possible CSS.

  * Working with shared styles for different states: use a placeholder

* **Keep Nesting Shallow:** Use the "Inception Rule", don't go more than 3 levels deep:
```sass
  .nav_list{} // <-- This
  .nav{ ul{ li{} }} <-- Not This
```

* **DRY: Do Not Repeat Yourself!**

- How to use a namespace with variables, mixins, etc...?


## 3.12 Mixins

* **A Mixin** is like a *function* in CSS used to define a *block of styles* that can be reused anywhere.

* **Use for repeating patterns of CSS:** 
  * Expecially those that take arguments (parameters).
  * Common use for media queries

* **Implemented:** Use the `@include` keyword:

  ```sass
    // definition
    // abstracts/_mixins.scss

    @mixin flex-center($direction row) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: $direction;
    }

    // implementation
    // components/_login.scss
    .login-container {
      @include flex-center(column);
    }
  ```

* **Usage:** Helpful for media-queries or any styles that require a parameter or when yo uneed to use the `@content` directive.

* **Default Values** Always provide defaults parameter values when using mixins

* Can **pass parameter values by name** instead of in-order:

  ```sass
    // definition
    @mixin someThing($direction row, $radius 2rem)

    // Usage
    @include someThing($radius: 1rem, $direction: column)
  ```

## 3.13 Functions

* **Functions:** are pieces of reusable code to perform *calcualtions* or *actions* and returns a *single* value

  * Where a `@mixin` returns a block of code, a `@function` returns a single value.

  * More like a spreadsheet formula than a javascript function

  * Can import using a **Namespace**, e.g. `@use 'abstracts/functions' as f` and then implemented `font-size: f.someFunc(value);`

* **Implementation:** Declare the function with the `@function <functionName>($argument default-value){...logic}`

* **Usage:** Use to place the value produced by the function directly into the CSS property: `property: functionName(parameter-value);`


## 3.14 SASS Built-in Methods

* **Common Functions:** 
  * **Color:** `lighten(), darken(), saturate(), mix()`
  * **Number:** `random(), ceil(), floor()`
  * **String:** `str-length(), to-upper-case()`
  * **Map | List:** `map-get(), nth(), append()`


### 3.14.1 Color Methods
Suite of SASS functions allowing adjustment of color properties like lightness, hue, saturation.

* **Importing:** `@use 'sass:color';` makes *all* of the color functions available.

* **Usage Example:** to lighten a color
  ```sass
    @use 'sass:color' as color;
    .btn-primary {
      background-color: $primary-color;
      &:hover {
        background-color: color.darken($primary-color, 10%);
      }
    }
  ```


### 3.14.2 Map and List Methods

* **Sass Lists:**
  * An ordered sequence of values
  ```sass
    $font-stack: 'Helvetica, Arial, sans-serif'; // comma separated
    $padding-values: '1px 3px 5px'; //space separated

  ```

  * **Delimiters:** Can be space or comma separated

  * **Usage:** Great for an ordered sequence of values; especially when iterating.

  ```sass
    // Iteration
    // List declaration
    $socials: 'twitter', 'facebook', 'youtube';

    // Function implementation
    @each $site in $socials {
      color: map.get($socials, $site)
    }

    // Get nth value
    $letters: 'a', 'b', 'c';
    $second: list.nth($letters, 2); // Returns 'b'

  ```

  * **Importing:** `@use sass:list`;

* **SASS Maps:**
  * Collection of **key-value pairs** similar to a PHP Associative Array or Javascript Object

  * **Syntax:**
  ```sass
    $breakpoints: (
      'sm': 576px,
      'md': 768px,
      'lg': 992px
    );
  ```

  * **Usage:**
  ```sass
    // Import
    @use 'sass:map';

    // Check if breakpoint name exists
    @if map.has-key($breakpoints, 'sm') {...}
  ```

## 3.15 Class Names with BEM: Block Element Modifier 
* `.block` A standalone component, e.g. `.card` or `.nav`
* `.block__element` A part of a block, e.g. `card__title`
* `.block--modifier` A different state or version, e.g. `.card--dark`, `.nav--sticky`



## 3.16 SASS Directive Tags

* **`@error`** Intentionally *stops* the entire SASS compilation process and prints an error message to the console.
  * Acts as a *guardrail* preventing invalid CSS
  * **Example:**
  ```sass
    @error "Unknown Value in #{$color-name}";
  ```

* **`@use`** Imports or loads module files

* **`@forward`** Partner to `@use`. It loads a SASS file and makes its members available to any other file that uses (implements `@use`) the current file.
  * **Usage:** Useful for creating a router-like file to collect and then forward constituent files.

  ```sass
    // components/_button.scss
    ...someCode

    // components/_cards.scss
    ...someCode

    // components/_components.scss
    @use './button';
    @use './cards';

    @forward './button';
    @forward './cards';

    // Main.scss
    @use 'components/components';
    // Includes both _cards.scss and button.scss

  ```
* **`@if | @else`**

* **`@each`**


* **`@debug`**

* **`@warn`**

---


# 4.0 PHP Backend

This project is configured to serve PHP files using the Apache web server within the php container.

* File Location: All PHP files should be placed inside the src/backend/ directory.
* Web Root: The Apache server's document root is set to /var/www/html/src/public via the 000-default.conf file. This means files in the src/public directory are directly accessible by the web server.
* PHP Configuration: The Dockerfile.php includes common PHP extensions like pdo_mysql, gd, mbstring, and zip, along with the Composer dependency manager.


---


# Appendix A: Configuration Files

## A.1 Docker-Compose.yml
```yml
version: '3.8'

services:
  php:
    build:
      context: .
      dockerfile: ./.docker/Dockerfile.php
    container_name: php
    ports:
      - "8085:80"
    volumes:
      - ./src/public:/var/www/html
    depends_on:
      - frontend

  frontend:
    build:
      context: .
      dockerfile: ./.docker/Dockerfile.frontend
    container_name: frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules # Prevents host files from overwriting the container's dependencies
    ports:
      - "5173:5173"
    command: npm run dev
    tty: true
```

## A.2 Dockerfiles and Configuration Files in .docker/

### A.2.1 Dockerfile.frontend
```bash
  FROM node:18-alpine

  WORKDIR /app

  # Copy all project files to the container
  COPY ./frontend .

  # Install project dependencies
  RUN npm install

  EXPOSE 5173

  CMD ["npm", "run", "dev"]


```

### A.2.3 Dockerfile.php
```bash
  FROM php:8.1-apache

  # Install system dependencies
  RUN apt-get update && apt-get install -y \
      git \
      libzip-dev \
      unzip \
      libpng-dev \
      libjpeg-dev \
      libonig-dev \
      libxml2-dev \
      && rm -rf /var/lib/apt/lists/*

  # Install PHP extensions
  RUN docker-php-ext-install pdo pdo_mysql gd mbstring zip

  # Install Composer
  COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

  WORKDIR /var/www/html

```

### A.2.3 000-default.conf
```bash
  <VirtualHost *:80>
      ServerAdmin webmaster@localhost
      DocumentRoot /var/www/html/src/public

      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined

      <Directory /var/www/html/src/public>
          Options Indexes FollowSymLinks
          AllowOverride All
          Require all granted
      </Directory>
  </VirtualHost>

```

## A.3 Vite Configuration

## A.3.1 Vite Config File

* **Location:** `~/src/vite.config.js`

```js
  import { fileURLToPath, URL } from 'node:url'
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'

  export default defineConfig({
    plugins: [
      vue(),
    ],
    build: {
      outDir: '../src/public', // This is important!
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true, // This allows the container to be accessed from the host machine
      origin: 'http://localhost:8085'
    }
  })

```

## A.3.2 Package.json with Vite

* **Location:** `~/src/package.json`

```json
  {
    "name": "my-frontend-app",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "devDependencies": {
      "@vitejs/plugin-vue": "^4.2.3",
      "sass": "^1.66.1",
      "vite": "^4.4.5",
      "vue": "^3.3.4"
    }
  }

```


---


# Appendix B: How-To's and Help

## B.1 Changing the Port Number
Changing the port to view the application requires modifying the docker-compose.yml file. You also need to check for port conflicts and select a valid port number.


### B.1.0 Overview and Common Tasks in Workflow:
This section contains commands and file locations common to all Service port changes.

* **View all running Docker Containers and their ports:**
```bash
  docker ps 
  docker compose ps
```

* **Choose a Port Number:**
  * An acceptable range of ports to use are unregistered, non-system ports, typically ranging from 1024 to 49151. 
  * A common practice for web development is to use ports in the 3000-9000 range, such as 3000, 8000, or 8080, as they are less likely to be in use.

* **Change Port in `~/docker-compose/yml`:**
  * To change the port for your application, you need to edit the ports mapping for the php service in your docker-compose.yml file. 
  * The format is HOST_PORT:CONTAINER_PORT
  * Find the port number in the associated service
  * **Modified file:**
  ```yaml
    version: '3.8'

  services:
    php:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.php
      container_name: php
      ports:
        - "8000:80"  # <--- Change this line
    ```

### B.1.1 PHP Service Port Change

Contains files and commands specific to altering the PHP Service Port Number

  * **Modify docker-compose.yml under PHP Service:**
  ```yaml
    version: '3.8'

  services:
    php:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.php
      container_name: php
      ports:
        - "8000:80"  # <--- Change this line
    ```

* **Update the Vite Configuration:**
  * Since your frontend service (Vite dev server) depends on the php service, you must also update the vite.config.js file to reflect the new host port for hot module reloading and correct asset serving.
  * **Modified `~/frontend/vite.config.js` File:**
  ```js
    server: {
      host: true,
      origin: 'http://localhost:8000' # <--- Change this line
    }
  ```

* **Rebuild and Run Containers:**

```bash
  docker compose up --build -d
```

Your PHP Service will now be accessible at http://localhost:8000.

### B.1.1 Frontend Service Port Change
Changing port mapping in docker-compose.yml and index.php

* To change the port, simply change the first number in the ports mapping. The container port 5173 must remain unchanged as it's the internal port used by Vite. Let's change the host port to 3000.
* **Modify docker-compose.yml:**
```yml
  services:
    frontend:
      build:
        context: .
        dockerfile: ./.docker/Dockerfile.frontend
      container_name: frontend
      volumes:
        - ./frontend:/app
        - /app/node_modules # Prevents host files from overwriting the container's dependencies
      ports:
        - "3000:5173" # <--- Change this line
      command: npm run dev
      tty: true
```

* **Modify the `~/src/public/index.php` file directly** 
  * The index file references the web service port to load the Vue.js application. 
  * You must update these references to use your new port.
  * **Modified Index.php File:**
  ```html
    <body>
      <div id="app"></div> <h1>Hello from PHP!</h1>

      <script type="module" src="http://localhost:3000/@vite/client"></script>
      <script type="module" src="http://localhost:3000/src/main.js"></script>
  </body>
  ```

* **Rebuild Application:**
```bash
  docker compose up --build -d
```

---


# Appendix C: Managing Docker Containers

## C.1 Basic Commands

* **Start Services in background:**
```bash
  docker compose up -d
```

* **Build Services in Background:**
```bash
  docker compose up --build -d
```

* **Stop Services:**
```bash
  docker compose down
```

* **View Logs:**
```bash
  docker compose logs -f
```

## C.2 Exec Commands

Runs a command in an existing, running container. The command shares the environment and filesystem of the running service.

* **Traverse Containers:**
Traverse container directories: To get an interactive shell to explore the container's filesystem, use a command like sh or bash.

```bash
  docker compose exec frontend sh
```

* **One Off List:**
This will open a shell in the frontend container, allowing you to cd and ls the directories.
  * Run a one-off command: You can execute any command inside the running service.

```bash
  docker compose exec php ls -l /var/www/html
```

* **Run as Different User:**
Run as a different user: Use the --user or -u flag to run the command as a specific user.

```bash
  docker compose exec --user root frontend npm install
```

* **Docker Compose Run:**
Starts a new, independent container for a one-time command. 
  * This is useful for tasks that are not part of the main service lifecycle, like database migrations or running tests. 
  * The new container is configured with the same volumes and network settings as the service in the docker-compose.yml file, but it doesn't expose the service's ports by default.

```bash
  # Example: run a migration script in a new container
  docker compose run --rm backend php artisan migrate  
```

## C.3 Other Useful Commands

* **List Containers and Services:**
Lists the containers and services managed by Docker Compose, showing their status, ports, and names.

```bash
  docker compose ps
  docker compose ps -a
```

* **Logs:**
Follows the log output of all services in real-time. You can also specify a service name to filter the logs.

```bash
  # View all logs
  docker compose logs -f

  # View logs for a specific service
  docker compose logs -f frontend
```

* **Build Specific Service Images:**
Builds or rebuilds the service images. This is necessary if you've made changes to a Dockerfile.

```bash
  # Build all services
  docker compose build

  # Build a specific service
  docker compose build frontend
```

* **Force Recreate:**
Forces Docker Compose to stop and recreate all containers, even if their configuration hasn't changed. This can be useful for troubleshooting.

```bash
  docker compose up --force-recreate
```