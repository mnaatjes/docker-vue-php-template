
# SASS Template Repository

This Template Repository contains the directory structure, variable, function, mixin, and placeholder definitions to scaffold any SASS project.

## 1.0 Build Process

## 1.1 Directory Structure

```markdown
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

---

## 2.0 Template Repository, Patterns, and Best Practices

### 2.1 Template Repositories

***What is a Template Repository?***

- A template repository is a specialized type of GitHub repository designed to be a starting point for new projects. 
- When you create a new repository from a template, GitHub creates a fresh repository with the same file structure, branches, and files as the template. 
- The key distinction is that the new repository does not retain the commit history of the template

### 2.2 Best Practices

#### 2.2.1 Overview

**7-1 Patterns:**
The most popular and effective way to structure a SASS project is the "7-1 Pattern":

- 7 folders for your partial files
- 1 main.scss file to import them all.

**Separation of Concerns**
It's not just that you *can* add properties to the same tag in multiple files—it's that you **should**. Each file has a different purpose and level of specificity.

#### 2.2.2 General Practices

- **Avoid Global Scope** with mixins, variables, and functions by using namespaces
- **Use Explicit Dependencies**
- **@import Depreciated:**

  ```sass
    @use 'abstracts/variables' as var;
  ```

- **DRY: Do Not Repeat Yourself!**
- **Keep Nesting Shallow:** Use the "Inception Rule", don't go more than 3 levels deep:

```sass
  .nav_list{} // <-- This
  .nav{ ul{ li{} }} <-- Not This
```

- **Utilize Class Names with BEM: Block Element Modifiers**
  - `.block` A standalone component, e.g. `.card` or `.nav`
  - `.block__element` A part of a block, e.g. `card__title`
  - `.block--modifier` A different state or version, e.g. `.card--dark`, `.nav--sticky`

---

## 3.0 Directories, Files, and Namespaces

### 3.1 Overview

See Directory Structure section for entire mapping.

### 3.2 Abstracts Directory

#### 3.2.1 `abstracts/_placeholders.scss`

*What are placeholders and what goes in the `./abstract/placeholders/` file?*

- **Placeholder:** special type of selector in SASS that looks and acts like a class but begins with `%`
- **A "Silent Class"** Rulesets that use placeholder selector will **not** be rendered into final CSS unless placeholder is explicitly `@extended`
- The **`abstracts/_placeholders.scss`** file contains defined, reusable, non-outputting blocks of CSS properties.
- **Cannot use namespaces:** When including `@use abstracts/placeholders` cannot declare a namespace like `as x`. 
- **Examples:**
  - A base style for all message boxes:

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

#### 3.2.2 `abstracts/_variables.scss`

*What are SASS Variables?*

- **Purpose:** To define the **Static, Structural Constants** of the Design System. Values are the *fundamental* definitions of the site's layout 
- **Syntax** `$var-name: value` and invoked where "v" is import namespace: `property: v.$var-name;`
- Variables are the **bones** or *skeleton* of the entire site.

- **Usage:** Use SASS variables for the static properties and **structural** styles at *compile-time*.
  - **Media Query Breakpoints:** use directly because this requires a static value; e.g. `@media(min-width: $breakpt-md)...`
  - **Grid System** logic for calcualting column widths, gutters, etc
  - **Sass Logic** when using loops `@if, @for, @each`
  - **Z-index Management** using a SASS map - which is a structural concern; e.g. `$z-indeces`
  - **Litmus Test:** *Does the SASS Compiler need this value to generate the CSS structure?*

*How do CSS Variables Differ from SASS Variables?*

- **CSS Variables** used for *visual appearance* or "skin" of elements and styles. Anything that defines the *look and feel*
  - **Colors:** for `background-color, border-color, box-shadow`; Example:

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

- **Typography:** `font-family, font-size, font-weight`
- **Borders and Surfaces:** `border-radius, border-color, box-shadow`
- **Spacing:** `paddings, margin, gap`
- **Sizes:** `max-width, height`
- **Litmus:** *Might I ever want to change this value?*

#### 3.2.3 `abstracts/_mixins.scss`

**A Mixin** is like a *function* in CSS used to define a *block of styles* that can be reused anywhere.

*When to use a **mixin** vs a **placeholder**?*

- **Use Mixin (@mixin / @include) when:**

  - You need to pass an argument
  
  ```sass
    @mixin flex-center($direction: row){
      flex-direction: $direction;
    }
  ```

  - Working within a `scoped` component i.e. Vue or React and all the component's styles should be self-contained.
  - Use for **dynamic** and **parameter-driven** styles. Generally safer and more versatile.
  - Does it need an argument: @mixin
  - Working in a module system: @mixin

- **Use Placeholders (% / @extend) when:**
  - You have a static set of styles
  - Selectos have a clear *Semantic Relationship* with the classes that utilize it:
  
  ```sass
    // placeholder
    %button-base {}
    // classes
    .button-primary {}
    .button-secondary {}
  ```

  - Use for sharing fixed set of styles among related elements to produce smallest possible CSS.
  - Working with shared styles for different states: use a placeholder
  - **Use for repeating patterns of CSS:** Expecially those that take arguments (parameters). Common use for media queries

*How are `@mixin`s implemented?*

- Use the `@include` keyword:

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

*How are `@mixin`s used?*

- **Usage:** Helpful for media-queries or any styles that require a parameter or when yo uneed to use the `@content` directive.
- **Default Values** Always provide defaults parameter values when using mixins
- Can **pass parameter values by name** instead of in-order:

  ```sass
    // definition
    @mixin someThing($direction row, $radius 2rem)

    // Usage
    @include someThing($radius: 1rem, $direction: column)
  ```

#### 3.2.4 `abstracts/_functions.scss`

**Functions:** are pieces of reusable code to perform *calcualtions* or *actions* and returns a *single* value

- Where a `@mixin` returns a block of code, a `@function` returns a single value.
- More like a spreadsheet formula than a javascript function
- Can import using a **Namespace**, e.g. `@use 'abstracts/functions' as f` and then implemented `font-size: f.someFunc(value);`

**Implementation:** Declare the function with the `@function <functionName>($argument default-value){...logic}`

- **Usage:** Use to place the value produced by the function directly into the CSS property: `property: functionName(parameter-value);`

### 3.3 Base Directory

*What is the `base/` directory for and what does the name mean?*

- Holds foundational styles for the project, defined the standard look or raw HTML elements

#### 3.3.1 `base/_base.scss`

*What goes in the `_base.scss` file? What is meant by "common elements"?*

- The file should contain styles for the **most fundamental elements of the HTML document itself**
- **Avoid using `*`** when defining styles. Instead use `<html>`
- **Tags:** `<html>, <body>`
- **Responsive Media:** like images, videos, and other embedded media responsive by default, e.g. `img, svg {max-width...}`
- **Global Box-Sizing:** is a modern *best practice*
- **Other Global Element Styles:** Elements that are non-component like the `<hr>`
- **Examples:**

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

#### 3.3.2 `base/_reset.scss`

*What is the `_reset.scss` file for?*

- **_reset.scss** Normalizes file - i.e. to strip away all default browser styling - for a consistent, baseline work
- Styles should only contain properties to *remove styles* and values that set a *neutral* state

*What is resetting?*

- **What:** Remove *all* built in browser styling. Referred to as the 'Remove Everything' approach.
- **Goal:** Forcing all elements to look identical and completely unstyled
- **Example:** <https://meyerweb.com/eric/tools/css/reset/>

*What is Normalization?*

- **What:** Doen't remove *all* styles. Makes default styles consistent and preserves useful defaults
- **Goal:** Elements that behave predictable and look reasonably well styled by default and regardless of browser
- **Example:** <https://necolas.github.io/normalize.css/>
- **Refrain** from using `_variables.scss` in `_reset.scss`

#### 3.3.3 `base/_typography.scss`

The **_typocraphy.scss** Defines the default appearance of all text elements like `<h1>, <p>, <a>` etc. Can define `color`, `line-height`, `font-size`, and `font-family`

*What is considered a "typography rule"? What goes in the `_typography.scss` file and what doesn't?*

- Elements the `_typography.scss` file **Should Contain** selectors for raw HTML text elements: headings `<h1>, <h2>, <h3>...`, paragraphs `<p>`, lists `<ul>, <ol>, <li>`, and inline text elements like `<blockquote>, <em>, <small>, <strong>`
- Properties the file **Should Contain** are: `font-size`, `margin`, `margin-bottom`, `color`, `text-decoration`...
- Specific components or utilities **do not** belong in `_typography.scss` **nor do** class based properties; e.g. `.error-text{}` 
- Typography *inside* a component **does not** belong here; it belongs with the other components; e.g. `button {}` because these styles are completely dependent upon the component.
- Layout properties **don't belong** like `float:left` or `width: 100px`
- `<body` Foundational Font Settings **don't** belong
- Holds typographic definitions for child elements, NOT `<html> or <body>` elements

- **Follow the Reset --> Style Pattern**
  - Separation ensures you are always building upon a consistent foundation
  - **Example:** reset inconsistent margins then in `_typography.scss` add back exact properties desired

- **_base.scss** Catch-all for other base styles applied to `<html> or <body>` elements such as `box-sizing`, `border-box`, `background-colors`...

  - **Single Responsibility Principle:** `_base.scss` is responsible for the specific rules governing **all** typofraphic elements
  - Set global defaults on the parent - even for typography attributes - in `_base.scss` 
  - Developer expects to check `_base.scss` for default behaviors

### 3.4 Components

*Is there just one button document for the entire site? Where do styles for states of the button go (e.g. hover, active, etc...)?*

- **Button States:** The styles for states like :hover, :active, and :focus go in the same file. Sass's nesting feature is perfect for this, as it keeps state-related styles logically grouped with the base component styles.

- **One File:** Goal is to have on efile to define the `<button>` element and classes like `.btn-primary, .btn-lrg` etc.

*What goes in `components/` directory?*

- **Reusable** components able to be dropped anywhere on a site.
- **Self-Contained** component styles should not depend on or *leak* out and affect other elements.
- **Examples:** `_buttons.scss, _cards.scss, _forms.scss, _navbar.scss, _accordion.scss, _tooltips.scss`

*What **does not** go in the `components/` directory?*

- **No *Boilerplate*** styles that belone in `_reset.scss or _base.scss`
- **Layout Styles:** Styles for the *major structural elements* should **not** be in `components/` and instead belong in `layout`. Examples of this are: `_header.scss, _sidebar.scss, grid.scss (.container, .row, .col)`
- **Pages** Styles for `_home.scss`, etc

## 3.5 Layout

*If you aren't using a "grid system" or you are using flex or another layout - what do you call the document?*

- Use a common descriptive name for the primary layout and structural styles. **Examples:** `_layout.scss`, `_flexbox.scss`, etc.

- **Major Structural / Semantic Elements** belong in the `layouts/` directory. 
  - **Examples:** `_header.scss, _sidebar.scss`.
    - These major elements should contain **all** of the style properties for the element (not just layout related properties).
    - These layout elements are considered non-reusable, *macro-components* which appear in *one* context.
  - **Exception:** When styling the *theme* of the `_header.scss`, those pertient styles belong in the `themes/` directory

### 3.6 Pages

*What is considered a page?*

- **Unique and Specific** to *one page only*
- **Non-reusable** styles or for *overriding* default look of a `component/_layout.scss` block
- **Structural / Semantic Elements *Specific* to a *Page*:** For instance, if the `<header>` element (set in `layout/_header.scss`) requires a change of background property for the "about" or "home" page.

### 3.7 Themes

**Theme:** A collection of *global* variables and styles controlling the aesthetic of the site 

- **Separates the Core Structure** and layouts of components from their visual finish
- Fulfills the role of a **Dynamic Theming System** instead of a *Static Design System*
- **Examples:**

  - `themes/_config.scss` for defining the "light" theme:

  ```sass
    // Root defines the light theme variables by default
    :root{
      --bg-color: $bg-color
    }
  ```

  - `themes/_dark.scss` for defining "dark" theme:

  ```sass
    // Class defines dark theme
    .theme-dark {
      --bg-color: $bg-color-dark;
    }
  ```

  - **Implementation:** The component (semantic element, etc...) use the **CSS Variable Syntax** to define the colors to that a theme can be imposed:

  ```base
    // in components/_card.scss
    .card {
      background-color: var(--bg-color);
    }
  ```

*Is all that goes in just "light" and "dark" or is there more to the `_themes.scss` file?*

- **Defining Swappable *Skins*** Aside from "light" or "dark" themes; i.e. **User-Choice** themes.
- **Branding** themes; e.g. the site hosts projects from different companies - a "Google" theme in `themes/_google.scss`
- **Accesibiity:** for instance, a *High-Contrast* color palette.

### 3.8 Vendors

### 3.9 Main.scss

The `main.scss` file acts as the single entry point and imports all the partials in a **specific** order. This order also structures dependencies with the last import being the **most dependent** on the sass framework.

**Import Order:**

- Abstracts (no CSS Output)
- Vendors
- Base
- Layout
- Components
- Pages
- Themes

## 4.0 SASS Build-Ins Used within Template

### 4.1 SASS Functions

**Common Functions:**

- **Color:** `lighten(), darken(), saturate(), mix()`
- **Number:** `random(), ceil(), floor()`
- **String:** `str-length(), to-upper-case()`
- **Map | List:** `map-get(), nth(), append()`

#### 4.1.1 Color Functions

Suite of SASS functions allowing adjustment of color properties like lightness, hue, saturation.

- **Importing:** `@use 'sass:color';` makes *all* of the color functions available.
- **Usage Example:** to lighten a color

  ```sass
    @use 'sass:color' as color;
    .btn-primary {
      background-color: $primary-color;
      &:hover {
        background-color: color.darken($primary-color, 10%);
      }
    }
  ```

#### 4.1.2 Map and List Methods

**Sass Lists:** An ordered sequence of values

```sass
  $font-stack: 'Helvetica, Arial, sans-serif'; // comma separated
  $padding-values: '1px 3px 5px'; //space separated
```

- **Delimiters:** Can be space or comma separated
- **Usage:** Great for an ordered sequence of values; especially when iterating.

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
  
- **Importing:** `@use sass:list`;

**SASS Maps:** A collection of **key-value pairs** similar to a PHP Associative Array or Javascript Object

- **Syntax:**

```sass
  $breakpoints: (
    'sm': 576px,
    'md': 768px,
    'lg': 992px
  );
```

- **Usage:**

```sass
  // Import
  @use 'sass:map';

  // Check if breakpoint name exists
  @if map.has-key($breakpoints, 'sm') {...}
```

### 4.2 SASS Directives and Tags Used within Template

**`@error`** Intentionally *stops* the entire SASS compilation process and prints an error message to the console.

- Acts as a *guardrail* preventing invalid CSS
- **Example:**

```sass
  @error "Unknown Value in #{$color-name}";
```

**`@use`** Imports or loads module files

**`@forward`** Partner to `@use`. It loads a SASS file and makes its members available to any other file that uses (implements `@use`) the current file.

- **Usage:** Useful for creating a router-like file to collect and then forward constituent files.

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

**`@if | @else`**

**`@each`**

**`@debug`**

**`@warn`**

---
