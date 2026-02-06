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

function amountToDisplayNormalized(
    amount: number,
    currencyCode: string
): string {
    const decimalDigits = getDecimalDigits(currencyCode);
    return `${parseFloat(amount.toString()).toFixed(
        decimalDigits
    )} ${currencyCode.toUpperCase()}`;
}

function generateTableRow(
    doc,
    y,
    columns: string[]
) {
    doc.fontSize(8); // Slightly smaller font to fit more columns

    doc
        .text(columns[0], 50, y, { width: 180 }) // Product Title
        .text(columns[1], 240, y, { width: 60 })  // SKU
        .text(columns[2], 310, y, { width: 60 })  // Barcode
        .text(columns[3], 380, y, { width: 30, align: "right" }) // Quantity
        .text(columns[4], 420, y, { width: 60, align: "right" }) // Unit Price
        .text(columns[5], 490, y, { width: 60, align: "right" }); // Total Price

    return y + 20;
}

export function generateInvoiceTable(
    doc,
    y,
    order: OrderDTO,
    items: OrderLineItemDTO[]
) {
    let currentY = y + 10;
    const pageHeight = doc.page.height - 50;

    doc.font("Bold");
    doc.fontSize(14).text("Products", 50, y);
    currentY += 20;

    generateTableRow(
        doc,
        currentY,
        ["Product Title", "SKU", "Barcode", "Quantity", "Unit Price", "Total Price"]
    );
    generateHr(doc, currentY + 15);
    doc.font("Regular");

    currentY += 20;
    for (let i = 0; i < items.length; i++) {
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }

        const item = items[i];
        const unitPrice = Number(item.raw_unit_price.value);
        const totalPrice = unitPrice * item.quantity;

        currentY = generateTableRow(
            doc,
            currentY,
            [
                item.product_title + " " + item.variant_title,
                item.variant_sku || "",
                item.variant_barcode || "",
                `${item.quantity}x`,
                amountToDisplayNormalized(unitPrice, order.currency_code),
                amountToDisplayNormalized(totalPrice, order.currency_code)
            ]
        );

        generateHr(doc, currentY - 5);
        currentY += 5;
    }

    currentY += 10;

    // Summary Section
    const summaryX = 350;
    doc.fontSize(10);

    doc.text("Subtotal (excl. shipping and taxes)", 50, currentY)
        .text(amountToDisplayNormalized((order as any).item_total, order.currency_code), 0, currentY, { align: "right" });

    currentY += 15;
    doc.text("Shipping", 50, currentY)
        .text(amountToDisplayNormalized((order.shipping_total as BigNumber).numeric, order.currency_code), 0, currentY, { align: "right" });

    currentY += 15;
    doc.text("Taxes", 50, currentY)
        .text(amountToDisplayNormalized((order.tax_total as BigNumber).numeric, order.currency_code), 0, currentY, { align: "right" });

    currentY += 25;
    generateHr(doc, currentY - 5);
    doc.font("Bold").fontSize(12);
    doc.text("Total", 50, currentY)
        .text(amountToDisplayNormalized((order.total as BigNumber).numeric, order.currency_code), 0, currentY, { align: "right" });
}
