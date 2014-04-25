# JSPrint
This module can be use to create printable report (instead of Word, OpenOffice, Latex, ...)
directly with HTML, CSS, JS.

# Recommendations
> We recommend you to print documents using Google Chrome (you can even save it to PDF).
> With Firefox you should play with the scale in the print preview mode (sometime you can
> let the "Shrink to fit" option, else choose 100%, 90%, 80%... and check if the page is
> correct), then print. On windows you can install CutePDF Writer to export document from
> firefox to PDF (but Chrome is better).

# Install
> You will need to have jQuery in order to make JSPrint works.

1. Download jsprint.css and jsprint.js to your directory
2. Create your .html file
3. Import the default JSPrint CSS style: jsprint.css between 'head' tags (<head>...</head>),
4. Import jQuery at the end of your html document, eg: after </body>
5. Include JSprint library after jQuery
```html
<!-- Between <head> tags -->
<link rel="stylesheet" type="text/css" href="jsprint.css" />
```

```html
<!-- After </body> tag -->
<script type="text/javascript" src="jquery-1.10.2.min.js"></script>
```

```html
<!-- After jquery importation -->
<script type="text/javascript" src="jsprint.js"></script>
```


# Functionalities
- Auto refresh the content
- Printable with all browsers
- CSS, JavaScript (+jQuery) only
- Easy to learn, use and adapt
- Header can be customize
- Auto-generating of the summary (from H1 to H4)
- Auto-generating pages number
- Auto-generating bibliography with reference number for links
- Adding legend to images
- Auto-generating bibliography with title and reference for image


# Classname glossary
| Classname       | Description              |
| --------------- | ------------------------ |
| yld-def-header  | Definition of the header |
| yld-summary     | Summary container        |
| yld-page        | Creates a new page       |
| yld-title       | Title of the section that is included in the summary |
| yld-bibligraphy | Bibliography container |
| yld-imageography | Bibliography container |


# Settings 
| Option     | Default       | Description              |
| -----------|-------------- | ------------------------ |
| title-nbr  | true          | Show the number aside the title and according to the summary |
| page-nbr   | true          | Show or hide page number |
| page-outof | true          | Show outof page number |
| page-outof-symbole  | "/"  | Symbole to show for outof page number |
| auto-refresh | false       | Auto refresh (beta) HTML page |
| auto-interval | 2000       | Auto refresh interval |


# Attribut glossary
| TAG             | Attribut | Description   |
| --------------- | ---------|-------------- |
| img             | title    | Create a nice legend for a specific image |
| img             | ref      | Reference of the image |
| a               | ref      | Reference of the link |


# Create a new page
You will need to add a container with the classname **yld-page**, eg:
```html
<!-- This is a normal page -->
<div class="yld-page">
  <h1 class="yld-title">Introduction</h1>
  <p>Check the source code of this example in order to learn how to use this module</p>
</div>
```

# Create a "summary"
In order to have a proper summary of your report, you just need to add the class name **yld-title** to the
title of a new section, eg:
```html
<h1 class="yld-title">Introduction</h1>
<h2 class="yld-title">Subsection</h2>
<h3 class="yld-title">Subsubsection</h3>
<h4 class="yld-title">Subsubsubsection</h4>
```

then you will need to add the container where the summary should start and add the proper class
to your page **yld-page-summary**. Here is a little example of how the structure should look like:
```html
<div class="yld-page yld-page-summary">
  <div class="yld-summary"></div>
</div>
```

# Adding a header
Create a container with the classname **yld-def-header**. This will define the header of the page.
This one will be added to every single pages of your report, so you need to define the content
of it only once. The content of the header can be valid HTML or normal text, eg:
```html
<div class="yld-def-header">
  <p>This is my header - <i>on every pages</i></p>
</div>
```

# Adding bibliography
Create a container with the classname **yld-bibliography**. This will define the container
that will contains the the bibliography. All the links that you define with '<a>' tags will
appear as: link, text of the link and a reference number.
```html
<a href='http://mylink.com'>This is a link</a>
```

then you will need to add the container where you want to show the biblography
```html
<div class="yld-bibliography"></div>
```

# Adding a legend to an image
In order to add a legend after the image, just use the **title** attribut from the image tag, eg:
```html
<img src='...' title='This is my legend'>
```

# Adding imageography
```html
<img src='...' title='This is my legend' ref='Author/Reference'>
```

then you will need to add the container where you want to show the imageography
```html
<div class="yld-imageography"></div>
```

# Configuration
## Refresh the content automatically
While you are editing your document, you can enable the option to automatically refresh it every X milliseconds.
You can modify the interval of refreshes in the settings by changing:
```javascript
"auto-refresh": true,
"auto-interval": 5000
```

## Adding number of the page
The number of the page is automatically added by default. You can show or hide it by modifying
the variable :
```javascript
"page-nbr": true,
```

## Adding number to titles
The number of the title is automatically added by default. You can show or hide it by modifying
the variable :
```javascript
"title-nbr": true,
```


# Style customization
Just edit the ***theme.css*** as you wish. It is not recommended to update
***jsprint.css*** if you don't understand everything in that file.

# FAQ
## I don't want my title to appear in the summary
When creating your title tag (H1, H2, H3, ...) don't add the class **yld-title**
to it. This will avoid the title to be added into the summary.
