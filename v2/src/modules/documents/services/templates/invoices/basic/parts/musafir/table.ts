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

import {generateHr} from "./hr";
import {t} from "i18next";
import {OrderDTO, OrderLineItemDTO} from "@medusajs/framework/types";
import {getDecimalDigits} from "../../../../../../utils/currency";
import {BigNumber} from "@medusajs/framework/utils";

function amountToDisplay(amount: number, currencyCode: string): string {
    const decimalDigits = getDecimalDigits(currencyCode);
    return `${(amount / Math.pow(10, decimalDigits)).toFixed(
        decimalDigits
    )} ${currencyCode.toUpperCase()}`;
}

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
    item,
    unitCost,
    quantity,
    lineTotal
) {
    doc.fontSize(10);

    const pageHeight = doc.page.height - 80;
    const itemHeight = doc.heightOfString(item, {width: 360});
    const maxHeight = Math.max(itemHeight, itemHeight);
    const height = Math.max(maxHeight, 10);
    let _y = y;
    let nextY = y + height;

    if (nextY > pageHeight) {
        doc.addPage();
        _y = 50;
        nextY = _y + height;
    }

    doc
        .text(item, 50, _y, {width: 360})
        .text(unitCost, 370, _y, {width: 60, align: "right"})
        .text(quantity, 430, _y, {width: 30, align: "right"})
        .text(lineTotal, 0, _y, {align: "right"});

    return nextY;
}

export function generateInvoiceTable(
    doc,
    y,
    order: OrderDTO,
    items: OrderLineItemDTO[]
) {
    let i;
    const invoiceTableTop = y + 5;
    const pageHeight = doc.page.height - 50;

    doc.font("Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        t("invoice-table-header-item", "Item"),
        t("invoice-table-header-unit-cost", "Unit Cost"),
        "Qty",
        t("invoice-table-header-line-total", "Line Total")
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Regular");

    let currentY = invoiceTableTop + 20;
    for (i = 0; i < items.length; i++) {
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }

        const item = items[i];
        currentY = generateTableRow(
            doc,
            currentY,
            item.product_title + " " + item.variant_title,
            amountToDisplayNormalized(Number(item.raw_unit_price.value), order.currency_code),
            item.quantity,
            amountToDisplayNormalized(Number(item.raw_unit_price.value) * item.quantity, order.currency_code)
        );

        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }

        generateHr(doc, currentY);
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }
    }

    currentY += 10;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    generateTableRow(
        doc,
        currentY,
        "",
        t("invoice-table-shipping", "Shipping"),
        "",
        amountToDisplayNormalized(
            (order.shipping_subtotal as BigNumber).numeric,
            order.currency_code
        )
    );

    currentY += 15;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    generateTableRow(
        doc,
        currentY,
        "",
        t("invoice-table-tax", "Tax"),
        "",
        amountToDisplayNormalized(
            (order.tax_total as BigNumber).numeric,
            order.currency_code
        )
    );

    currentY += 15;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    doc.font("Bold");
    generateTableRow(
        doc,
        currentY,
        "",
        t("invoice-table-total", "Total"),
        "",
        amountToDisplayNormalized(
            (order.total as BigNumber).numeric,
            order.currency_code
        )
    );
    doc.font("Regular");
}
