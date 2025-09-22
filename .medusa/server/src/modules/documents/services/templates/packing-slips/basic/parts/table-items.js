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
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 200, y)
        .text(quantity, 0, y, { align: "right" });
}
function generateItemsTable(doc, y, order, items) {
    let i;
    const invoiceTableTop = y + 35;
    let totalQuantity = 0;
    doc.font("Bold");
    generateTableRow(doc, invoiceTableTop, (0, i18next_1.t)("packing-slip-table-header-item", "Item"), (0, i18next_1.t)("packing-slip-table-header-description", "Description"), (0, i18next_1.t)("packing-slip-table-header-quantity", "Quantity"));
    (0, hr_1.generateHr)(doc, invoiceTableTop + 20);
    doc.font("Regular");
    for (i = 0; i < items.length; i++) {
        const item = items[i];
        totalQuantity += item.quantity;
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(doc, position, item.title, item.subtitle, item.quantity);
        (0, hr_1.generateHr)(doc, position + 20);
    }
    const totalQuantityPosition = invoiceTableTop + (i + 1) * 30;
    doc.font("Bold");
    generateTableRow(doc, totalQuantityPosition, "", (0, i18next_1.t)("packing-slip-table-header-total", "Total"), totalQuantity);
    doc.font("Regular");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaXRlbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL3BhY2tpbmctc2xpcHMvYmFzaWMvcGFydHMvdGFibGUtaXRlbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBcUJILGdEQTBDQztBQTNERCw2QkFBa0M7QUFDbEMscUNBQTRCO0FBRTVCLFNBQVMsZ0JBQWdCLENBQ3ZCLEdBQUcsRUFDSCxDQUFDLEVBQ0QsSUFBSSxFQUNKLFdBQVcsRUFDWCxRQUFRO0lBRVIsR0FBRztTQUNBLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQWUsRUFBRSxLQUF5QjtJQUNuRixJQUFJLENBQUMsQ0FBQztJQUNOLE1BQU0sZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFL0IsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsZ0JBQWdCLENBQ2QsR0FBRyxFQUNILGVBQWUsRUFDZixJQUFBLFdBQUMsRUFBQyxnQ0FBZ0MsRUFBRSxNQUFNLENBQUMsRUFDM0MsSUFBQSxXQUFDLEVBQUMsdUNBQXVDLEVBQUUsYUFBYSxDQUFDLEVBQ3pELElBQUEsV0FBQyxFQUFDLG9DQUFvQyxFQUFFLFVBQVUsQ0FBQyxDQUNwRCxDQUFDO0lBQ0YsSUFBQSxlQUFVLEVBQUMsR0FBRyxFQUFFLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hELGdCQUFnQixDQUNkLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUVGLElBQUEsZUFBVSxFQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0scUJBQXFCLEdBQUcsZUFBZSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM3RCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pCLGdCQUFnQixDQUNkLEdBQUcsRUFDSCxxQkFBcUIsRUFDckIsRUFBRSxFQUNGLElBQUEsV0FBQyxFQUFDLGlDQUFpQyxFQUFFLE9BQU8sQ0FBQyxFQUM3QyxhQUFhLENBQ2QsQ0FBQztJQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9