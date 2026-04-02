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

import { generateHr } from "./hr";
import { t } from "i18next";
import { OrderDTO, OrderLineItemDTO } from "@medusajs/framework/types";
import { getDecimalDigits } from "../../../../../../utils/currency";
import { BigNumber } from "@medusajs/framework/utils";

const TOP_MARGIN = 50;
const BOTTOM_MARGIN = 80;
const TITLE_COLUMN_WIDTH = 130;
// A4 default height (842pt) minus margin - fallback if doc.page is wrong
const DEFAULT_PAGE_HEIGHT = 842 - BOTTOM_MARGIN;
// Max row height for overflow check - prevents one long row from forcing a page per row
const MAX_ROW_HEIGHT_FOR_CHECK = 220;

function amountToDisplayNormalized(
    amount: number,
    currencyCode: string
): string {
    // Handle NaN or invalid numbers
    if (isNaN(amount) || amount === null || amount === undefined) {
        return "R 0.00";
    }

    const decimalDigits = getDecimalDigits(currencyCode);
    const formattedAmount = parseFloat(amount.toString()).toFixed(decimalDigits);

    // Always use 'R' as currency symbol
    return `R ${formattedAmount}`;
}

function generateTableRow(
    doc,
    y,
    columns: string[],
    pageHeight: number
) {
    doc.fontSize(8);

    // Manual word wrapping for title column
    function wrapText(text: string, maxWidth: number): string[] {
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';
        
        for (const word of words) {
            const testLine = currentLine ? currentLine + ' ' + word : word;
            const width = doc.widthOfString(testLine);
            
            if (width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
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

export function generateInvoiceTable(
    doc,
    y,
    order: OrderDTO,
    items: OrderLineItemDTO[]
) {
    let currentY = y + 10;
    const rawPageHeight = doc.page?.height ? doc.page.height - BOTTOM_MARGIN : DEFAULT_PAGE_HEIGHT;
    const pageHeight = Math.max(DEFAULT_PAGE_HEIGHT, rawPageHeight);

    doc.font("Bold");
    doc.fontSize(14).text("Musafir Products", 50, y);
    currentY += 20;

    generateTableRow(
        doc,
        currentY,
        ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"],
        pageHeight
    );
    generateHr(doc, currentY + 15);
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
            generateTableRow(
                doc,
                currentY,
                ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"],
                pageHeight
            );
            generateHr(doc, currentY + 15);
            doc.font("Regular");
            currentY += 20;
        }

        // Render the complete row atomically
        const newY = generateTableRow(
            doc,
            currentY,
            [
                item.product_title || "",
                item.variant_sku || "",
                item.variant_barcode || "",
                `${item.quantity}x`,
                amountToDisplayNormalized(unitPrice, order.currency_code),
                amountToDisplayNormalized(totalPrice, order.currency_code)
            ],
            pageHeight
        );
        
        // If generateTableRow returned -1, it means we need a page break
        if (newY === -1) {
            doc.addPage();
            currentY = TOP_MARGIN;
            
            // Re-draw table header on new page
            doc.font("Bold");
            doc.fontSize(14).text("Musafir Products", 50, currentY);
            currentY += 20;
            generateTableRow(
                doc,
                currentY,
                ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"],
                pageHeight
            );
            generateHr(doc, currentY + 15);
            doc.font("Regular");
            currentY += 20;
            
            // Now render the row again on the new page
            currentY = generateTableRow(
                doc,
                currentY,
                [
                    item.product_title || "",
                    item.variant_sku || "",
                    item.variant_barcode || "",
                    `${item.quantity}x`,
                    amountToDisplayNormalized(unitPrice, order.currency_code),
                    amountToDisplayNormalized(totalPrice, order.currency_code)
                ],
                pageHeight
            );
        } else {
            currentY = newY;
        }

        // Draw a light border after each row
        doc.strokeColor('#e5e5e5');
        generateHr(doc, currentY - 5);
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
    const itemTotal = Number((order as any).item_total) || 0;
    const shippingTotal = Number((order.shipping_total as BigNumber)?.numeric ?? 0) || 0;
    const taxTotal = Number((order.tax_total as BigNumber)?.numeric ?? 0) || 0;
    const orderTotal = Number((order.total as BigNumber)?.numeric ?? 0) || 0;

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
    generateHr(doc, currentY - 5);
    doc.font("Bold").fontSize(12);
    // Total - separate calls, NO chaining
    doc.text("Total", summaryX, currentY);
    doc.text(amountToDisplayNormalized(orderTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
}
