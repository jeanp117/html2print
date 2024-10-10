"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHTML = printHTML;
const wkhtmltopdf = require("wkhtmltopdf");
const pdf_to_printer_1 = require("pdf-to-printer");
const fs = require("fs");
const tmp = require("tmp");
/**
 *  Print HTML content to a printer
 * @param htmlString HTML content to print
 * @param options printer can be undefined or your printer's name, scale can be "noscale", "shrink" or "fit"
 * @param pdfOptions See wkhtmltopdf options
 *
 */
function printHTML(htmlString, options, pdfOptions = {}) {
    return new Promise((resolve, reject) => {
        // Convertir HTML a PDF y obtener el resultado como un buffer
        wkhtmltopdf(htmlString, Object.assign({ "margin-top": 0, "margin-right": 0, "margin-bottom": 0, "margin-left": 0, output: null }, pdfOptions), function (err, stream) {
            if (err) {
                console.error(err);
                reject(err); // Rechazar la promesa en caso de error
                return;
            }
            // Obtener el buffer del stream
            const chunks = [];
            stream.on("data", (chunk) => {
                chunks.push(chunk);
            });
            stream.on("end", () => {
                const pdfBuffer = Buffer.concat(chunks);
                console.log("PDF creado exitosamente");
                // Guardar el buffer en un archivo temporal
                tmp.file({ postfix: ".pdf" }, (err, tmpFilePath) => {
                    if (err) {
                        console.error("Error creando archivo temporal:", err);
                        reject(err); // Rechazar la promesa en caso de error
                        return;
                    }
                    // Escribir el buffer en el archivo temporal
                    fs.writeFile(tmpFilePath, pdfBuffer, (err) => {
                        if (err) {
                            console.error("Error escribiendo el archivo temporal:", err);
                            reject(err); // Rechazar la promesa en caso de error
                            return;
                        }
                        (0, pdf_to_printer_1.print)(tmpFilePath, options)
                            .then((response) => {
                            console.log("PDF impreso exitosamente");
                            resolve(); // Resolver la promesa al imprimir correctamente
                        })
                            .catch((error) => {
                            console.error("Error imprimiendo el PDF:", error);
                            reject(error); // Rechazar la promesa en caso de error en la impresión
                        });
                    });
                });
            });
        });
    });
}
exports.default = printHTML;
