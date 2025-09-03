<template>
  <div>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>

    <p>This is a standard paragraph of text. It contains <em>emphasized text</em> and <strong>strong text</strong>. You might also find <small>small text</small>, <mark>marked text</mark>, <del>deleted text</del>, and <ins>inserted text</ins>.</p>
    <p>This paragraph includes a subscript <sub>sub</sub> and a superscript <sup>sup</sup>.</p>

    <blockquote>
      <p>This is a blockquote. It is used to quote content from another source.</p>
      <footer>— Someone Famous</footer>
    </blockquote>

    <pre><code>
      // This is a preformatted code block
      function greet(name) {
        console.log(`Hello, ${name}!`);
      }
      greet('World');
    </code></pre>

    <a href="#">This is an anchor link</a>

    <hr>

    <h2>Buttons</h2>
    <button>Default Button</button>
    <button type="submit">Submit Button</button>
    <button type="reset">Reset Button</button>
    <input type="button" value="Input Button">
    <input type="submit" value="Input Submit">
    <input type="reset" value="Input Reset">
    <a href="#" role="button">Anchor as Button</a>

    <hr>

    <h2>Form Elements</h2>
    <form>
      <fieldset>
        <legend>Personal Information</legend>
        <div>
          <label for="text-input">Text Input:</label>
          <input type="text" id="text-input" name="text-input" placeholder="Enter text">
        </div>
        <div>
          <label for="password-input">Password:</label>
          <input type="password" id="password-input" name="password-input" placeholder="Enter password">
        </div>
        <div>
          <label for="email-input">Email:</label>
          <input type="email" id="email-input" name="email-input" placeholder="Enter email">
        </div>
        <div>
          <label for="number-input">Number:</label>
          <input type="number" id="number-input" name="number-input" value="123">
        </div>
        <div>
          <label for="date-input">Date:</label>
          <input type="date" id="date-input" name="date-input">
        </div>
        <div>
          <label for="file-input">File:</label>
          <input type="file" id="file-input" name="file-input">
        </div>
        <div>
          <label for="textarea-input">Textarea:</label>
          <textarea id="textarea-input" name="textarea-input" rows="5" placeholder="Enter long text"></textarea>
        </div>
        <div>
          <label for="select-input">Select Option:</label>
          <select id="select-input" name="select-input">
            <option value="">--Please choose an option--</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div>
          <p>Radio Buttons:</p>
          <input type="radio" id="radio1" name="radio-group" value="radio1">
          <label for="radio1">Radio 1</label><br>
          <input type="radio" id="radio2" name="radio-group" value="radio2">
          <label for="radio2">Radio 2</label>
        </div>
        <div>
          <p>Checkboxes:</p>
          <input type="checkbox" id="checkbox1" name="checkbox-group" value="checkbox1">
          <label for="checkbox1">Checkbox 1</label><br>
          <input type="checkbox" id="checkbox2" name="checkbox-group" value="checkbox2">
          <label for="checkbox2">Checkbox 2</label>
        </div>
        <div>
          <button type="submit">Submit Form</button>
          <button type="reset">Reset Form</button>
        </div>
      </fieldset>
    </form>

    <hr>

    <h2>Lists</h2>
    <h3>Unordered List</h3>
    <ul>
      <li>List Item 1</li>
      <li>List Item 2
        <ul>
          <li>Nested List Item 2.1</li>
          <li>Nested List Item 2.2</li>
        </ul>
      </li>
      <li>List Item 3</li>
    </ul>

    <h3>Ordered List</h3>
    <ol>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ol>

    <h3>Description List</h3>
    <dl>
      <dt>Term 1</dt>
      <dd>Description for Term 1</dd>
      <dt>Term 2</dt>
      <dd>Description for Term 2</dd>
    </dl>

    <hr>

    <h2>Tables</h2>
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1.1</td>
          <td>Data 1.2</td>
          <td>Data 1.3</td>
        </tr>
        <tr>
          <td>Data 2.1</td>
          <td>Data 2.2</td>
          <td>Data 2.3</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Footer 1</td>
          <td>Footer 2</td>
          <td>Footer 3</td>
        </tr>
      </tfoot>
    </table>

    <hr>

    <h2>Semantic Layout Elements</h2>
    <header style="border: 1px solid blue; padding: 10px; margin-bottom: 10px;">
      <p>This is a header.</p>
      <nav style="border: 1px solid green; padding: 5px;">
        <p>This is a navigation area.</p>
        <ul>
          <li><a href="#">Nav Link 1</a></li>
          <li><a href="#">Nav Link 2</a></li>
        </ul>
      </nav>
    </header>

    <main style="border: 1px solid purple; padding: 10px; margin-bottom: 10px;">
      <p>This is the main content area.</p>
      <article style="border: 1px solid orange; padding: 10px; margin-bottom: 10px;">
        <h3>Article Title</h3>
        <p>This is an article.</p>
      </article>
      <section style="border: 1px solid brown; padding: 10px; margin-bottom: 10px;">
        <h3>Section Title</h3>
        <p>This is a section within the main content.</p>
      </section>
      <aside style="border: 1px solid teal; padding: 10px; margin-bottom: 10px;">
        <p>This is an aside, often for sidebar content.</p>
      </aside>
    </main>

    <footer style="border: 1px solid red; padding: 10px;">
      <p>This is a footer.</p>
    </footer>

    <hr>

    <h2>Media Elements</h2>
    <img src="https://via.placeholder.com/150" alt="Placeholder Image" style="margin-bottom: 10px;">
    <audio controls style="margin-bottom: 10px;">
      <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <video width="320" height="240" controls>
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>

  </div>
</template>

<script>
export default {
  name: 'Layout',
};
</script>

<style scoped>
</style>
