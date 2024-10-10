/**
 *  Print HTML content to a printer
 * @param htmlString HTML content to print
 * @param options printer can be undefined or your printer's name, scale can be "noscale", "shrink" or "fit"
 * @param pdfOptions See wkhtmltopdf options
 *
 */
export declare function printHTML(htmlString: string, options: {
    printer?: string;
    scale: "noscale" | "shrink" | "fit";
}, pdfOptions?: Record<string, any>): Promise<void>;
export default printHTML;
