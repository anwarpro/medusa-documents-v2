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
    columns: string[]
) {
    doc.fontSize(8); // Slightly smaller font to fit more columns

    // Product title with text wrapping enabled
    const titleHeight = doc.heightOfString(columns[0], { width: TITLE_COLUMN_WIDTH });
    const rowHeight = Math.max(20, titleHeight + 5);

    // Render each column separately WITHOUT chaining to prevent PDFKit auto page breaks
    // CRITICAL: continueOnNewPage: false prevents automatic page insertion mid-row
    doc.text(columns[0], 50, y, { width: TITLE_COLUMN_WIDTH, lineBreak: true, continued: false }); // Product Title
    doc.text(columns[1], 190, y, { width: 85, lineBreak: false, continued: false });  // SKU
    doc.text(columns[2], 285, y, { width: 85, lineBreak: false, continued: false });  // Barcode
    doc.text(columns[3], 380, y, { width: 30, align: "right", continued: false }); // Qty
    doc.text(columns[4], 420, y, { width: 60, align: "right", continued: false }); // U.Price
    doc.text(columns[5], 490, y, { width: 60, align: "right", continued: false }); // T.Price

    // Return the next Y position for the caller
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
    doc.fontSize(14).text("Musafir Products (Updated)", 50, y);
    currentY += 20;

    generateTableRow(
        doc,
        currentY,
        ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"]
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
            doc.fontSize(14).text("Musafir Products (Updated)", 50, currentY);
            currentY += 20;
            generateTableRow(
                doc,
                currentY,
                ["Product Title", "SKU", "Barcode", "Qty", "Unit Price", "Total Price"]
            );
            generateHr(doc, currentY + 15);
            doc.font("Regular");
            currentY += 20;
        }

        // Render the complete row atomically
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
            ]
        );

        // CHECKPOINT 2: AFTER row rendered - verify no overflow
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = TOP_MARGIN;
        }

        // Draw a light border after each row
        doc.strokeColor('#e5e5e5');
        generateHr(doc, currentY - 5);
        doc.strokeColor('#000000');
        
        // CHECKPOINT 3: AFTER hr line - verify no overflow
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = TOP_MARGIN;
        }
        
        currentY += 10;
    }

    currentY += 20;

    // CHECKPOINT: Check space for summary section
    if (currentY + 100 > pageHeight) { // Need ~100pts for summary
        doc.addPage();
        currentY = TOP_MARGIN;
    }

    // Summary Section
    doc.fontSize(10);

    // Safely handle summary values
    const itemTotal = Number((order as any).item_total) || 0;
    const shippingTotal = Number((order.shipping_total as BigNumber)?.numeric ?? 0) || 0;
    const taxTotal = Number((order.tax_total as BigNumber)?.numeric ?? 0) || 0;
    const orderTotal = Number((order.total as BigNumber)?.numeric ?? 0) || 0;

    const summaryX = 50;
    const summaryWidth = 500; // Alignment to match end of Total Price column (550)

    doc.text("Subtotal (excl. shipping and taxes)", summaryX, currentY)
        .text(amountToDisplayNormalized(itemTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });

    currentY += 15;
    doc.text("Shipping", summaryX, currentY)
        .text(amountToDisplayNormalized(shippingTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });

    currentY += 15;
    doc.text("Taxes", summaryX, currentY)
        .text(amountToDisplayNormalized(taxTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });

    currentY += 25;
    doc.strokeColor('#000000').lineWidth(1);
    generateHr(doc, currentY - 5);
    doc.font("Bold").fontSize(12);
    doc.text("Total", summaryX, currentY)
        .text(amountToDisplayNormalized(orderTotal, order.currency_code), summaryX, currentY, { width: summaryWidth, align: "right" });
}
