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
exports.generateItemsTable = generateItemsTable;
const hr_1 = require("./hr");
const i18next_1 = require("i18next");
function generateTableRow(doc, y, item, description, quantity) {
    doc
        .fontSize(6)
        .text(item, 25, y)
        .text(description, 80, y)
        .text(quantity, 90, y, { align: "right", width: 100 });
}
function generateItemsTable(doc, y, order, items) {
    let i;
    const invoiceTableTop = y + 25;
    let totalQuantity = 0;
    doc.font("Bold");
    generateTableRow(doc, invoiceTableTop, (0, i18next_1.t)("packing-slip-table-header-item", "Item"), (0, i18next_1.t)("packing-slip-table-header-description", "Description"), (0, i18next_1.t)("packing-slip-table-header-quantity", "Quantity"));
    (0, hr_1.generateHrInA7)(doc, invoiceTableTop + 10);
    doc.font("Regular");
    for (i = 0; i < items.length; i++) {
        const item = items[i];
        totalQuantity += item.quantity;
        const position = invoiceTableTop + (i + 1) * 20;
        generateTableRow(doc, position, item.title, item.subtitle, item.quantity);
        (0, hr_1.generateHrInA7)(doc, position + 10);
    }
    const totalQuantityPosition = invoiceTableTop + (i + 1) * 20;
    doc.font("Bold");
    generateTableRow(doc, totalQuantityPosition, "", (0, i18next_1.t)("packing-slip-table-header-total", "Total"), totalQuantity);
    doc.font("Regular");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaXRlbXMtc21hbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL3BhY2tpbmctc2xpcHMvYmFzaWMvcGFydHMvdGFibGUtaXRlbXMtc21hbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBb0JILGdEQTBDQztBQTNERCw2QkFBc0M7QUFDdEMscUNBQTRCO0FBRTVCLFNBQVMsZ0JBQWdCLENBQ3ZCLEdBQUcsRUFDSCxDQUFDLEVBQ0QsSUFBSSxFQUNKLFdBQVcsRUFDWCxRQUFRO0lBRVIsR0FBRztTQUNBLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDWCxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBZSxFQUFFLEtBQXlCO0lBQ25GLElBQUksQ0FBQyxDQUFDO0lBQ04sTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUUvQixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7SUFFdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQixnQkFBZ0IsQ0FDZCxHQUFHLEVBQ0gsZUFBZSxFQUNmLElBQUEsV0FBQyxFQUFDLGdDQUFnQyxFQUFFLE1BQU0sQ0FBQyxFQUMzQyxJQUFBLFdBQUMsRUFBQyx1Q0FBdUMsRUFBRSxhQUFhLENBQUMsRUFDekQsSUFBQSxXQUFDLEVBQUMsb0NBQW9DLEVBQUUsVUFBVSxDQUFDLENBQ3BELENBQUM7SUFDRixJQUFBLG1CQUFjLEVBQUMsR0FBRyxFQUFFLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hELGdCQUFnQixDQUNkLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUEsbUJBQWMsRUFBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNLHFCQUFxQixHQUFHLGVBQWUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0QsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQixnQkFBZ0IsQ0FDZCxHQUFHLEVBQ0gscUJBQXFCLEVBQ3JCLEVBQUUsRUFDRixJQUFBLFdBQUMsRUFBQyxpQ0FBaUMsRUFBRSxPQUFPLENBQUMsRUFDN0MsYUFBYSxDQUNkLENBQUM7SUFDRixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==