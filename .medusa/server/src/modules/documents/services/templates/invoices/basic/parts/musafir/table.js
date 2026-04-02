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
    // CRITICAL: Save graphics state before rendering
    doc.save();
    // Render title with manual line breaks - FORCE lineBreak false
    let lineY = y;
    for (const line of titleLines) {
        // Use absolute positioning, no auto-flow
        doc.text(line, 50, lineY, { lineBreak: false, continued: false });
        lineY += 12;
    }
    // Render other columns at base Y - FORCE lineBreak false, no chaining
    doc.text(columns[1] || '', 190, y, { lineBreak: false, continued: false });
    doc.text(columns[2] || '', 285, y, { lineBreak: false, continued: false });
    doc.text(columns[3] || '', 380, y, { lineBreak: false, continued: false, align: "right" });
    doc.text(columns[4] || '', 420, y, { lineBreak: false, continued: false, align: "right" });
    doc.text(columns[5] || '', 490, y, { lineBreak: false, continued: false, align: "right" });
    // Restore graphics state
    doc.restore();
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
            doc.addPage(); // Default A4 size
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
            doc.addPage(); // Default A4 size
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
        doc.addPage(); // Default A4 size
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL3BhcnRzL211c2FmaXIvdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBa0dILG9EQTZKQztBQTdQRCw2QkFBa0M7QUFHbEMsK0RBQW9FO0FBR3BFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLENBQUM7QUFDL0IseUVBQXlFO0FBQ3pFLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxHQUFHLGFBQWEsQ0FBQztBQUNoRCx3RkFBd0Y7QUFDeEYsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFFckMsU0FBUyx5QkFBeUIsQ0FDOUIsTUFBYyxFQUNkLFlBQW9CO0lBRXBCLGdDQUFnQztJQUNoQyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUUsQ0FBQztRQUMzRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBQSwyQkFBZ0IsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNyRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdFLG9DQUFvQztJQUNwQyxPQUFPLEtBQUssZUFBZSxFQUFFLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQ3JCLEdBQUcsRUFDSCxDQUFDLEVBQ0QsT0FBaUIsRUFDakIsVUFBa0I7SUFFbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxD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