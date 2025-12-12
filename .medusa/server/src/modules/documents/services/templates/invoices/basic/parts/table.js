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
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateInvoiceTable", {
    enumerable: true,
    get: function() {
        return generateInvoiceTable;
    }
});
const _hr = require("./hr");
const _i18next = require("i18next");
const _currency = require("../../../../../utils/currency");
function amountToDisplay(amount, currencyCode) {
    const decimalDigits = (0, _currency.getDecimalDigits)(currencyCode);
    return `${(amount / Math.pow(10, decimalDigits)).toFixed(decimalDigits)} ${currencyCode.toUpperCase()}`;
}
function amountToDisplayNormalized(amount, currencyCode) {
    const decimalDigits = (0, _currency.getDecimalDigits)(currencyCode);
    return `${parseFloat(amount.toString()).toFixed(decimalDigits)} ${currencyCode.toUpperCase()}`;
}
function generateTableRow(doc, y, item, description, unitCost, quantity, lineTotal) {
    doc.fontSize(10);
    const pageHeight = doc.page.height - 80;
    const descriptionHeight = doc.heightOfString(description, {
        width: 180
    });
    const itemHeight = doc.heightOfString(item, {
        width: 90
    });
    const maxHeight = Math.max(descriptionHeight, itemHeight);
    const height = Math.max(maxHeight, 30);
    let _y = y;
    let nextY = y + height;
    if (nextY > pageHeight) {
        doc.addPage();
        _y = 50;
        nextY = _y + height;
    }
    doc.text(item, 50, _y, {
        width: 90
    }).text(description, 150, _y, {
        width: 180
    }).text(unitCost, 280, _y, {
        width: 90,
        align: "right"
    }).text(quantity, 370, _y, {
        width: 90,
        align: "right"
    }).text(lineTotal, 0, _y, {
        align: "right"
    });
    return nextY;
}
function generateInvoiceTable(doc, y, order, items) {
    let i;
    const invoiceTableTop = y + 35;
    const pageHeight = doc.page.height - 50;
    doc.font("Bold");
    generateTableRow(doc, invoiceTableTop, (0, _i18next.t)("invoice-table-header-item", "Item"), (0, _i18next.t)("invoice-table-header-description", "Description"), (0, _i18next.t)("invoice-table-header-unit-cost", "Unit Cost"), (0, _i18next.t)("invoice-table-header-quantity", "Quantity"), (0, _i18next.t)("invoice-table-header-line-total", "Line Total"));
    (0, _hr.generateHr)(doc, invoiceTableTop + 20);
    doc.font("Regular");
    let currentY = invoiceTableTop + 30;
    for(i = 0; i < items.length; i++){
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }
        const item = items[i];
        currentY = generateTableRow(doc, currentY, item.title, item.subtitle, amountToDisplayNormalized(Number(item.raw_unit_price.value), order.currency_code), item.quantity, amountToDisplayNormalized(Number(item.raw_unit_price.value) * item.quantity, order.currency_code));
        currentY += 5;
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }
        (0, _hr.generateHr)(doc, currentY);
        currentY += 5;
        if (currentY > pageHeight) {
            doc.addPage();
            currentY = 50;
        }
    }
    currentY += 20;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    generateTableRow(doc, currentY, "", "", (0, _i18next.t)("invoice-table-shipping", "Shipping"), "", amountToDisplayNormalized(order.shipping_subtotal.numeric, order.currency_code));
    currentY += 30;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    generateTableRow(doc, currentY, "", "", (0, _i18next.t)("invoice-table-tax", "Tax"), "", amountToDisplayNormalized(order.tax_total.numeric, order.currency_code));
    currentY += 45;
    if (currentY > pageHeight) {
        doc.addPage();
        currentY = 50;
    }
    doc.font("Bold");
    generateTableRow(doc, currentY, "", "", (0, _i18next.t)("invoice-table-total", "Total"), "", amountToDisplayNormalized(order.total.numeric, order.currency_code));
    doc.font("Regular");
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvcGFydHMvdGFibGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDI0IFJTQy1MYWJzLCBodHRwczovL3Jzb2Z0Y29uLmNvbS9cbiAqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgZ2VuZXJhdGVIciB9IGZyb20gXCIuL2hyXCI7XG5pbXBvcnQgeyB0IH0gZnJvbSBcImkxOG5leHRcIjtcbmltcG9ydCB7IE9yZGVyRFRPLCBPcmRlckxpbmVJdGVtRFRPIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdHlwZXNcIjtcbmltcG9ydCB7IGdldERlY2ltYWxEaWdpdHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vdXRpbHMvY3VycmVuY3lcIjtcbmltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3V0aWxzXCI7XG5cbmZ1bmN0aW9uIGFtb3VudFRvRGlzcGxheShhbW91bnQ6IG51bWJlciwgY3VycmVuY3lDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBkZWNpbWFsRGlnaXRzID0gZ2V0RGVjaW1hbERpZ2l0cyhjdXJyZW5jeUNvZGUpO1xuICByZXR1cm4gYCR7KGFtb3VudCAvIE1hdGgucG93KDEwLCBkZWNpbWFsRGlnaXRzKSkudG9GaXhlZChcbiAgICBkZWNpbWFsRGlnaXRzXG4gICl9ICR7Y3VycmVuY3lDb2RlLnRvVXBwZXJDYXNlKCl9YDtcbn1cblxuZnVuY3Rpb24gYW1vdW50VG9EaXNwbGF5Tm9ybWFsaXplZChcbiAgYW1vdW50OiBudW1iZXIsXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nXG4pOiBzdHJpbmcge1xuICBjb25zdCBkZWNpbWFsRGlnaXRzID0gZ2V0RGVjaW1hbERpZ2l0cyhjdXJyZW5jeUNvZGUpO1xuICByZXR1cm4gYCR7cGFyc2VGbG9hdChhbW91bnQudG9TdHJpbmcoKSkudG9GaXhlZChcbiAgICBkZWNpbWFsRGlnaXRzXG4gICl9ICR7Y3VycmVuY3lDb2RlLnRvVXBwZXJDYXNlKCl9YDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVUYWJsZVJvdyhcbiAgZG9jLFxuICB5LFxuICBpdGVtLFxuICBkZXNjcmlwdGlvbixcbiAgdW5pdENvc3QsXG4gIHF1YW50aXR5LFxuICBsaW5lVG90YWxcbikge1xuICBkb2MuZm9udFNpemUoMTApO1xuXG4gIGNvbnN0IHBhZ2VIZWlnaHQgPSBkb2MucGFnZS5oZWlnaHQgLSA4MDtcbiAgY29uc3QgZGVzY3JpcHRpb25IZWlnaHQgPSBkb2MuaGVpZ2h0T2ZTdHJpbmcoZGVzY3JpcHRpb24sIHsgd2lkdGg6IDE4MCB9KTtcbiAgY29uc3QgaXRlbUhlaWdodCA9IGRvYy5oZWlnaHRPZlN0cmluZyhpdGVtLCB7IHdpZHRoOiA5MCB9KTtcbiAgY29uc3QgbWF4SGVpZ2h0ID0gTWF0aC5tYXgoZGVzY3JpcHRpb25IZWlnaHQsIGl0ZW1IZWlnaHQpO1xuICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIDMwKTtcbiAgbGV0IF95ID0geTtcbiAgbGV0IG5leHRZID0geSArIGhlaWdodDtcblxuICBpZiAobmV4dFkgPiBwYWdlSGVpZ2h0KSB7XG4gICAgZG9jLmFkZFBhZ2UoKTtcbiAgICBfeSA9IDUwO1xuICAgIG5leHRZID0gX3kgKyBoZWlnaHQ7XG4gIH1cblxuICBkb2NcbiAgICAudGV4dChpdGVtLCA1MCwgX3ksIHsgd2lkdGg6IDkwIH0pXG4gICAgLnRleHQoZGVzY3JpcHRpb24sIDE1MCwgX3ksIHsgd2lkdGg6IDE4MCB9KVxuICAgIC50ZXh0KHVuaXRDb3N0LCAyODAsIF95LCB7IHdpZHRoOiA5MCwgYWxpZ246IFwicmlnaHRcIiB9KVxuICAgIC50ZXh0KHF1YW50aXR5LCAzNzAsIF95LCB7IHdpZHRoOiA5MCwgYWxpZ246IFwicmlnaHRcIiB9KVxuICAgIC50ZXh0KGxpbmVUb3RhbCwgMCwgX3ksIHsgYWxpZ246IFwicmlnaHRcIiB9KTtcblxuICByZXR1cm4gbmV4dFk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUludm9pY2VUYWJsZShcbiAgZG9jLFxuICB5LFxuICBvcmRlcjogT3JkZXJEVE8sXG4gIGl0ZW1zOiBPcmRlckxpbmVJdGVtRFRPW11cbikge1xuICBsZXQgaTtcbiAgY29uc3QgaW52b2ljZVRhYmxlVG9wID0geSArIDM1O1xuICBjb25zdCBwYWdlSGVpZ2h0ID0gZG9jLnBhZ2UuaGVpZ2h0IC0gNTA7XG5cbiAgZG9jLmZvbnQoXCJCb2xkXCIpO1xuICBnZW5lcmF0ZVRhYmxlUm93KFxuICAgIGRvYyxcbiAgICBpbnZvaWNlVGFibGVUb3AsXG4gICAgdChcImludm9pY2UtdGFibGUtaGVhZGVyLWl0ZW1cIiwgXCJJdGVtXCIpLFxuICAgIHQoXCJpbnZvaWNlLXRhYmxlLWhlYWRlci1kZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpLFxuICAgIHQoXCJpbnZvaWNlLXRhYmxlLWhlYWRlci11bml0LWNvc3RcIiwgXCJVbml0IENvc3RcIiksXG4gICAgdChcImludm9pY2UtdGFibGUtaGVhZGVyLXF1YW50aXR5XCIsIFwiUXVhbnRpdHlcIiksXG4gICAgdChcImludm9pY2UtdGFibGUtaGVhZGVyLWxpbmUtdG90YWxcIiwgXCJMaW5lIFRvdGFsXCIpXG4gICk7XG4gIGdlbmVyYXRlSHIoZG9jLCBpbnZvaWNlVGFibGVUb3AgKyAyMCk7XG4gIGRvYy5mb250KFwiUmVndWxhclwiKTtcblxuICBsZXQgY3VycmVudFkgPSBpbnZvaWNlVGFibGVUb3AgKyAzMDtcbiAgZm9yIChpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCkge1xuICAgICAgZG9jLmFkZFBhZ2UoKTtcbiAgICAgIGN1cnJlbnRZID0gNTA7XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIGN1cnJlbnRZID0gZ2VuZXJhdGVUYWJsZVJvdyhcbiAgICAgIGRvYyxcbiAgICAgIGN1cnJlbnRZLFxuICAgICAgaXRlbS50aXRsZSxcbiAgICAgIGl0ZW0uc3VidGl0bGUsXG4gICAgICBhbW91bnRUb0Rpc3BsYXlOb3JtYWxpemVkKE51bWJlcihpdGVtLnJhd191bml0X3ByaWNlLnZhbHVlKSwgb3JkZXIuY3VycmVuY3lfY29kZSksXG4gICAgICBpdGVtLnF1YW50aXR5LFxuICAgICAgYW1vdW50VG9EaXNwbGF5Tm9ybWFsaXplZChOdW1iZXIoaXRlbS5yYXdfdW5pdF9wcmljZS52YWx1ZSkgKiAgaXRlbS5xdWFudGl0eSwgb3JkZXIuY3VycmVuY3lfY29kZSlcbiAgICApO1xuXG4gICAgY3VycmVudFkgKz0gNTtcblxuICAgIGlmIChjdXJyZW50WSA+IHBhZ2VIZWlnaHQpIHtcbiAgICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgICBjdXJyZW50WSA9IDUwO1xuICAgIH1cblxuICAgIGdlbmVyYXRlSHIoZG9jLCBjdXJyZW50WSk7XG4gICAgY3VycmVudFkgKz0gNTtcbiAgICBpZiAoY3VycmVudFkgPiBwYWdlSGVpZ2h0KSB7XG4gICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgY3VycmVudFkgPSA1MDtcbiAgICB9XG4gIH1cblxuICBjdXJyZW50WSArPSAyMDtcbiAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCkge1xuICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgY3VycmVudFkgPSA1MDtcbiAgfVxuICBnZW5lcmF0ZVRhYmxlUm93KFxuICAgIGRvYyxcbiAgICBjdXJyZW50WSxcbiAgICBcIlwiLFxuICAgIFwiXCIsXG4gICAgdChcImludm9pY2UtdGFibGUtc2hpcHBpbmdcIiwgXCJTaGlwcGluZ1wiKSxcbiAgICBcIlwiLFxuICAgIGFtb3VudFRvRGlzcGxheU5vcm1hbGl6ZWQoXG4gICAgICAob3JkZXIuc2hpcHBpbmdfc3VidG90YWwgYXMgQmlnTnVtYmVyKS5udW1lcmljLFxuICAgICAgb3JkZXIuY3VycmVuY3lfY29kZVxuICAgIClcbiAgKTtcblxuICBjdXJyZW50WSArPSAzMDtcbiAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCkge1xuICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgY3VycmVudFkgPSA1MDtcbiAgfVxuICBnZW5lcmF0ZVRhYmxlUm93KFxuICAgIGRvYyxcbiAgICBjdXJyZW50WSxcbiAgICBcIlwiLFxuICAgIFwiXCIsXG4gICAgdChcImludm9pY2UtdGFibGUtdGF4XCIsIFwiVGF4XCIpLFxuICAgIFwiXCIsXG4gICAgYW1vdW50VG9EaXNwbGF5Tm9ybWFsaXplZChcbiAgICAgIChvcmRlci50YXhfdG90YWwgYXMgQmlnTnVtYmVyKS5udW1lcmljLFxuICAgICAgb3JkZXIuY3VycmVuY3lfY29kZVxuICAgIClcbiAgKTtcblxuICBjdXJyZW50WSArPSA0NTtcbiAgaWYgKGN1cnJlbnRZID4gcGFnZUhlaWdodCkge1xuICAgIGRvYy5hZGRQYWdlKCk7XG4gICAgY3VycmVudFkgPSA1MDtcbiAgfVxuICBkb2MuZm9udChcIkJvbGRcIik7XG4gIGdlbmVyYXRlVGFibGVSb3coXG4gICAgZG9jLFxuICAgIGN1cnJlbnRZLFxuICAgIFwiXCIsXG4gICAgXCJcIixcbiAgICB0KFwiaW52b2ljZS10YWJsZS10b3RhbFwiLCBcIlRvdGFsXCIpLFxuICAgIFwiXCIsXG4gICAgYW1vdW50VG9EaXNwbGF5Tm9ybWFsaXplZChcbiAgICAgIChvcmRlci50b3RhbCBhcyBCaWdOdW1iZXIpLm51bWVyaWMsXG4gICAgICBvcmRlci5jdXJyZW5jeV9jb2RlXG4gICAgKVxuICApO1xuICBkb2MuZm9udChcIlJlZ3VsYXJcIik7XG59XG4iXSwibmFtZXMiOlsiZ2VuZXJhdGVJbnZvaWNlVGFibGUiLCJhbW91bnRUb0Rpc3BsYXkiLCJhbW91bnQiLCJjdXJyZW5jeUNvZGUiLCJkZWNpbWFsRGlnaXRzIiwiZ2V0RGVjaW1hbERpZ2l0cyIsIk1hdGgiLCJwb3ciLCJ0b0ZpeGVkIiwidG9VcHBlckNhc2UiLCJhbW91bnRUb0Rpc3BsYXlOb3JtYWxpemVkIiwicGFyc2VGbG9hdCIsInRvU3RyaW5nIiwiZ2VuZXJhdGVUYWJsZVJvdyIsImRvYyIsInkiLCJpdGVtIiwiZGVzY3JpcHRpb24iLCJ1bml0Q29zdCIsInF1YW50aXR5IiwibGluZVRvdGFsIiwiZm9udFNpemUiLCJwYWdlSGVpZ2h0IiwicGFnZSIsImhlaWdodCIsImRlc2NyaXB0aW9uSGVpZ2h0IiwiaGVpZ2h0T2ZTdHJpbmciLCJ3aWR0aCIsIml0ZW1IZWlnaHQiLCJtYXhIZWlnaHQiLCJtYXgiLCJfeSIsIm5leHRZIiwiYWRkUGFnZSIsInRleHQiLCJhbGlnbiIsIm9yZGVyIiwiaXRlbXMiLCJpIiwiaW52b2ljZVRhYmxlVG9wIiwiZm9udCIsInQiLCJnZW5lcmF0ZUhyIiwiY3VycmVudFkiLCJsZW5ndGgiLCJ0aXRsZSIsInN1YnRpdGxlIiwiTnVtYmVyIiwicmF3X3VuaXRfcHJpY2UiLCJ2YWx1ZSIsImN1cnJlbmN5X2NvZGUiLCJzaGlwcGluZ19zdWJ0b3RhbCIsIm51bWVyaWMiLCJ0YXhfdG90YWwiLCJ0b3RhbCJdLCJyYW5nZU1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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