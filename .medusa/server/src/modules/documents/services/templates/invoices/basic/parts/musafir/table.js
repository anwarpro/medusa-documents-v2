"use strict";
/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceTable = generateInvoiceTable;
const hr_1 = require("./hr");
const currency_1 = require("../../../../../../utils/currency");
const TOP_MARGIN = 50;
const BOTTOM_MARGIN = 80;
const TITLE_COLUMN_WIDTH = 130;
// A4 default height (842pt) minus margin - fallback if doc.page is wrong
const DEFAULT_PAGE_HEIGHT = 842 - BOTTOM_MARGIN;
// Max row height for overflow check - prevents one long row from forcing a page per row
const MAX_ROW_HEIGHT_FOR_CHECK = 220;
function amountToDisplayNormalized(amount, currencyCode) {
    // Handle NaN or invalid numbers
    if (isNaN(amount) || amount === null || amount === undefined) {
        return "R 0.00";
    }
    const decimalDigits = (0, currency_1.getDecimalDigits)(currencyCode);
    const formattedAmount = parseFloat(amount.toString()).toFixed(decimalDigits);
    // Always use 'R' as currency symbol
    return `R ${formattedAmount}`;
}
function generateTableRow(doc, y, columns, pageHeight) {
    doc.fontSize(8);
    // Manual word wrapping for title column
    function wrapText(text, maxWidth) {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const width = doc.widthOfString(testLine);
            if (width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            }
            else {
                currentLine = testLine;
            }
        }
        if (currentLine) {
            lines.push(currentLine);
        }
        return lines;
    }
    // Get wrapped lines for title
    const titleLines = wrapText(columns[0] || '', TITLE_COLUMN_WIDTH);
    const rowHeight = Math.max(20, titleLines.length * 12 + 5);
    // Check if overflow
    if (y + rowHeight > pageHeight) {
        return -1;
    }
    // Render title with manual line breaks
    let lineY = y;
    for (const line of titleLines) {
        doc.text(line, 50, lineY, { lineBreak: false, width: TITLE_COLUMN_WIDTH });
        lineY += 12;
    }
    // Render other columns at base Y (all aligned to top)
    doc.text(columns[1] || '', 190, y, { lineBreak: false, width: 85 });
    doc.text(columns[2] || '', 285, y, { lineBreak: false, width: 85 });
    doc.text(columns[3] || '', 380, y, { lineBreak: false, width: 30, align: "right" });
    doc.text(columns[4] || '', 420, y, { lineBreak: false, width: 60, align: "right" });
    doc.text(columns[5] || '', 490, y, { lineBreak: false, width: 60, align: "right" });
    return y + rowHeight;
}
function generateInvoiceTable(doc, y, order, items) {
    let currentY = y + 10;
    const rawPageHeight = doc.page?.height ? doc.page.height - BOTTOM_MARGIN : DEFAULT_PAGE_HEIGHT;
    const pageHeight = Math.max(DEFAULT_PAGE_HEIGHT, rawPageHeight);
    doc.font("Bold");
    doc.fontSize(14).text("Musafir Products", 50, y);
    currentY += 20;
    generateTableRow(doc, currentY, ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"], pageHeight);
    (0, hr_1.generateHr)(doc, currentY + 15);
    doc.font("Regular");
    currentY += 20;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // Safely handle price values
        const unitPriceValue = item.raw_unit_price?.value ?? item.unit_price ?? 0;
        const unitPrice = Number(unitPriceValue) || 0;
        const totalPrice = unitPrice * (item.quantity || 0);
        // Calculate row height up-front to avoid splitting a row across pages
        const titleHeight = doc.heightOfString(item.product_title || "", { width: TITLE_COLUMN_WIDTH });
        const rowHeight = Math.max(20, titleHeight + 5);
        const rowHeightForCheck = Math.min(MAX_ROW_HEIGHT_FOR_CHECK, rowHeight);
        // CHECKPOINT 1: BEFORE row starts - check if enough space for complete row
        if (currentY + rowHeightForCheck > pageHeight) {
            doc.addPage();
            currentY = TOP_MARGIN;
            // Re-draw table header on new page
            doc.font("Bold");
            doc.fontSize(14).text("Musafir Products", 50, currentY);
            currentY += 20;
            generateTableRow(doc, currentY, ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"], pageHeight);
            (0, hr_1.generateHr)(doc, currentY + 15);
            doc.font("Regular");
            currentY += 20;
        }
        // Render the complete row atomically
        const newY = generateTableRow(doc, currentY, [
            item.product_title || "",
            item.variant_sku || "",
            item.variant_barcode || "",
            `${item.quantity}x`,
            amountToDisplayNormalized(unitPrice, order.currency_code),
            amountToDisplayNormalized(totalPrice, order.currency_code)
        ], pageHeight);
        // If generateTableRow returned -1, it means we need a page break
        if (newY === -1) {
            doc.addPage();
            currentY = TOP_MARGIN;
            // Re-draw table header on new page
            doc.font("Bold");
            doc.fontSize(14).text("Musafir Products", 50, currentY);
            currentY += 20;
            generateTableRow(doc, currentY, ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"], pageHeight);
            (0, hr_1.generateHr)(doc, currentY + 15);
            doc.font("Regular");
            currentY += 20;
            // Now render the row again on the new page
            currentY = generateTableRow(doc, currentY, [
                item.product_title || "",
                item.variant_sku || "",
                item.variant_barcode || "",
                `${item.quantity}x`,
                amountToDisplayNormalized(unitPrice, order.currency_code),
                amountToDisplayNormalized(totalPrice, order.currency_code)
            ], pageHeight);
        }
        else {
            currentY = newY;
        }
        // Draw a light border after each row
        doc.strokeColor('#e5e5e5');
        (0, hr_1.generateHr)(doc, currentY - 5);
        doc.strokeColor('#000000');
        currentY += 10;
    }
    currentY += 20;
    // CHECKPOINT: Check space for summary section
    if (currentY + 100 > pageHeight) { // Need ~100pts for summary
        doc.addPage();
        currentY = TOP_MARGIN;
    }
    // Summary Section - NO CHAINING to prevent auto page breaks
    doc.fontSize(10);
    // Safely handle summary values
    const itemTotal = Number(order.item_total) || 0;
    const shippingTotal = Number(order.shipping_total?.numeric ?? 0) || 0;
    const taxTotal = Number(order.tax_total?.numeric ?? 0) || 0;
    const orderTotal = Number(order.total?.numeric ?? 0) || 0;
    const summaryX = 50;
    const summaryWidth = 500; // Alignment to match end of Total Price column (550)
    // Subtotal - separate calls, NO chaining
    doc.text("Subtotal (excl. shipping and taxes)", summaryX, currentY);
    doc.text(amountToDisplayNormalized(itemTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
    currentY += 15;
    // Shipping - separate calls, NO chaining
    doc.text("Shipping", summaryX, currentY);
    doc.text(amountToDisplayNormalized(shippingTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
    currentY += 15;
    // Taxes - separate calls, NO chaining
    doc.text("Taxes", summaryX, currentY);
    doc.text(amountToDisplayNormalized(taxTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
    currentY += 25;
    doc.strokeColor('#000000').lineWidth(1);
    (0, hr_1.generateHr)(doc, currentY - 5);
    doc.font("Bold").fontSize(12);
    // Total - separate calls, NO chaining
    doc.text("Total", summaryX, currentY);
    doc.text(amountToDisplayNormalized(orderTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL3BhcnRzL211c2FmaXIvdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBMkZILG9EQTZKQztBQXRQRCw2QkFBa0M7QUFHbEMsK0RBQW9FO0FBR3BFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUM7QUFDL0IseUVBQXlFO0FBQ3pFLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxHQUFHLGFBQWEsQ0FBQztBQUNoRCx3RkFBd0Y7QUFDeEYsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFFckMsU0FBUyx5QkFBeUIsQ0FDOUIsTUFBYyxFQUNkLFlBQW9CO0lBRXBCLGdDQUFnQztJQUNoQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUMzRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBQSwyQkFBZ0IsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNyRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdFLG9DQUFvQztJQUNwQyxPQUFPLEtBQUssZUFBZSxFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQ3JCLEdBQUcsRUFDSCxDQUFDLEVBQ0QsT0FBaUIsRUFDakIsVUFBa0I7SUFFbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxD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