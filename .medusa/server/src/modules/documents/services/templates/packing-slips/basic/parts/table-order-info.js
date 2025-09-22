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
exports.generateOrderInfoTable = generateOrderInfoTable;
const hr_1 = require("./hr");
const i18next_1 = require("i18next");
function generateTableRow(doc, y, orderNumber, orderDate, shippingMethod) {
    doc
        .fontSize(10)
        .text(orderNumber, 50, y)
        .text(orderDate, 200, y)
        .text(shippingMethod, 0, y, { align: "right" });
}
function generateOrderInfoTable(doc, y, order, items) {
    let i;
    const invoiceTableTop = y + 35;
    doc.font("Bold");
    generateTableRow(doc, invoiceTableTop, (0, i18next_1.t)("packing-slip-table-header-order-number", "Order #"), (0, i18next_1.t)("packing-slip-table-header-order-date", "Order date"), (0, i18next_1.t)("packing-slip-table-header-shipping-method", "Shipping method"));
    (0, hr_1.generateHr)(doc, invoiceTableTop + 20);
    doc.font("Regular");
    const position = invoiceTableTop + 30;
    generateTableRow(doc, position, order.display_id, order.created_at.toLocaleString(), order.shipping_methods ? order.shipping_methods[0].name : 'N/A');
    (0, hr_1.generateHr)(doc, position + 20);
    return position + 20;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb3JkZXItaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9wYXJ0cy90YWJsZS1vcmRlci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQW9CSCx3REE0QkM7QUE3Q0QsNkJBQWtDO0FBQ2xDLHFDQUE0QjtBQUU1QixTQUFTLGdCQUFnQixDQUN2QixHQUFHLEVBQ0gsQ0FBQyxFQUNELFdBQVcsRUFDWCxTQUFTLEVBQ1QsY0FBYztJQUVkLEdBQUc7U0FDQSxRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ1osSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN2QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFlLEVBQUUsS0FBeUI7SUFDdkYsSUFBSSxDQUFDLENBQUM7SUFDTixNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRS9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsZ0JBQWdCLENBQ2QsR0FBRyxFQUNILGVBQWUsRUFDZixJQUFBLFdBQUMsRUFBQyx3Q0FBd0MsRUFBRSxTQUFTLENBQUMsRUFDdEQsSUFBQSxXQUFDLEVBQUMsc0NBQXNDLEVBQUUsWUFBWSxDQUFDLEVBQ3ZELElBQUEsV0FBQyxFQUFDLDJDQUEyQyxFQUFFLGlCQUFpQixDQUFDLENBQ2xFLENBQUM7SUFDRixJQUFBLGVBQVUsRUFBQyxHQUFHLEVBQUUsZUFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEIsTUFBTSxRQUFRLEdBQUcsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUV0QyxnQkFBZ0IsQ0FDZCxHQUFHLEVBQ0gsUUFBUSxFQUNSLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQ2pDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUNoRSxDQUFDO0lBRUYsSUFBQSxlQUFVLEVBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUUvQixPQUFPLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDdkIsQ0FBQyJ9