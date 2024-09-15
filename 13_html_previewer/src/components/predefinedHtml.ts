export const predefinedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 1em 0;
            text-align: center;
        }
        header h1 {
            margin: 0;
            font-size: 2em;
            font-weight: bolder;
        }
        section {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

    section h2, h3, h4, h5, h6{
            font-weight: bolder;
    }

       section h2 {
            color: #333;
            font-size: 1.5em;
        }

        section h3{}
        p {
            line-height: 1.6;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 10px 0;
        }

        ul, ol {
            padding-left: 20px;
        }
        ul li, ol li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>

    <header>
        <h1>Welcome to HTML Previewer</h1>
    </header>

    <section>
        <h2>This is a Heading 2</h2>
        <p>This is a paragraph with some <a href="#">links</a>. You can also use <strong>bold</strong> text for emphasis, and <em>italic</em> text to highlight something important.</p>

        <h2>Here is an Image:</h2>
        <img src="https://via.placeholder.com/800x400" alt="Sample Image">

        <h2>Unordered List</h2>
        <ul style='list-style: disc'>
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
        </ul>

        <h2>Ordered List</h2>
        <ol style='list-style: decimal'>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
        </ol>

        <h2>Another Section</h2>
        <p>Here is another paragraph with more text. This text contains both <strong>strong</strong> and <em>italic</em> elements for styling.</p>

        <h2>Additional Headings</h2>
        <h3 style='font-size: 1.17em'>Heading 3</h3>
        <h4 style='font-size: 1em'>Heading 4</h4>
        <h5 style='font-size: .83em'>Heading 5</h5>
        <h6 style='font-size: .67em'>Heading 6</h6>
    </section>

</body>
</html>`;
