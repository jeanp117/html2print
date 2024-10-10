# Html2Print

Html2Print is a Node.js module designed for printing HTML directly to POS printers and other printers.

This library is particularly useful for generating beautiful receipts and other documents directly from your applications, including Electron apps.

> [!NOTE]
> This packages uses `wkhtmltopdf` to convert HTML to PDF, which is then sent to the printer. Ensure that `wkhtmltopdf` is installed on your system before using this package. See the [Prerequisites](#prerequisites) section for more information.

> [!WARNING]
> This package is only compatible with Windows operating systems at the moment. Support for other operating systems will be added in future releases.

## Installation

To install Html2Print, you can use npm:

```bash
npm install html2print
```

## Usage

```javascript
 import {printHTML} from html2print;
```

or default import

```javascript
 import myCustomName from html2print;
```

### Printing HTML string directly

You can use the `printHTML` function to print HTML content directly. Here's an example of how to print a simple message:

```javascript
import {printHTML} from html2print;
printHTML("<h1>Hello, world!</h1>", {
    printer: "POS-58",
    scale: "noscale",
}, {
    //see https://wkhtmltopdf.org/usage/wkhtmltopdf.txt for more options
    // Don't forget to add the units to the values (mm, cm, in, px)
    // Remove the -- from the option name!
    "margin-top": 0,
    "margin-right": 0,
    "margin-bottom": 0,
    "margin-left": 0,
})
    .then(() => {
        console.log("Impresión completada sin errores.");
    })
    .catch((error) => {
        console.error("Error en la impresión:", error);
    });
```

### Reading HTML from Disk

You can also read HTML content from a file on disk using Node.js's `fs` and `path` modules. Here’s an example:

```javascript
import {printHTML} from html2print;
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

printHTML(
    html,
    {
        printer: "POS-58",
        scale: "noscale",
    },
    {
        "margin-top": 0,
        "margin-right": 0,
        "margin-bottom": 0,
        "margin-left": 0,
    }
).then(() => {
    console.log("Impresión completada sin errores.");
});
```

### Example template.html

> [!NOTE]
> Define the width of the receipt in the CSS to match the paper size of your printer

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recibo</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 5mm;
                border: 1mm solid black;
                width: 57mm;
                box-sizing: border-box;
            }
            h1 {
                text-align: center;
                font-size: 14px;
            }
            .details {
                margin-bottom: 5mm;
            }
            .total {
                font-weight: bold;
                font-size: 14px;
                text-align: right;
            }
            .footer {
                text-align: center;
                margin-top: 10mm;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <h1>Recibo de Pago</h1>
        <div class="details">
            <p><strong>Fecha:</strong> 09 de octubre de 2024</p>
            <p><strong>Cliente:</strong>Jean Rodríguez</p>
            <p>
                <strong>Descripción:</strong>
                Remember to buy me a coffe at:
                <br />
                <small>buymeacoffee.com/jeanpr117</small>
            </p>
        </div>
        <div class="total">
            <p>Total: $50.00</p>
        </div>
        <div class="footer">
            <p>Gracias por su compra!</p>
        </div>
    </body>
</html>
```

## Prerequisites

Before using Html2Print, you need to have wkhtmltopdf installed on your system. Html2Print relies on this tool to convert HTML to PDF.

## Installing wkhtmltopdf

You can install wkhtmltopdf as follows:

**Windows:** Download the installer from the [wkhtmltopdf website](https://wkhtmltopdf.org/downloads.html "Download page") and run it.

## Verifying wkhtmltopdf Installation

To verify that wkhtmltopdf is correctly installed, open your terminal or command prompt and run the following command:

```bash
wkhtmltopdf --version
```

If wkhtmltopdf is installed, this command will display the version number. If you encounter an error, ensure that the installation was successful and that wkhtmltopdf is in your system's PATH.

### Configuration

Html2Print allows you to configure the paper size, which is ideal for thermal printers (like 58mm printers). You can adjust the margins and page width in the options you pass to the `printHTML` function, allowing you to create beautifully formatted receipts and other documents tailored to your needs.

### Features

-   **Print HTML content directly** : Easily print formatted HTML.
-   **Read from disk** : Load HTML from a file for dynamic content.
-   **Customizable page size** : Suitable for different printer sizes, including thermal printers.
-   **Beautiful receipt generation** : Create visually appealing documents.

## License

This project is licensed under the MIT License. See the [LICENSE]() file for more details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you have suggestions for improvements or new features.

[![](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/jeanpr117)
