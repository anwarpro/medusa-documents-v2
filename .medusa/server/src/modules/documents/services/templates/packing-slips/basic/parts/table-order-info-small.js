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
        .fontSize(6)
        .text(orderNumber, 25, y)
        .text(orderDate, 80, y)
        .text(shippingMethod, 90, y, { align: "right", width: 100 });
}
function generateOrderInfoTable(doc, y, order, items) {
    const invoiceTableTop = y + 25;
    doc.font("Bold");
    generateTableRow(doc, invoiceTableTop, (0, i18next_1.t)("packing-slip-table-header-order-number", "Order #"), (0, i18next_1.t)("packing-slip-table-header-order-date", "Order date"), (0, i18next_1.t)("packing-slip-table-header-shipping-method", "Shipping method"));
    (0, hr_1.generateHrInA7)(doc, invoiceTableTop + 10);
    doc.font("Regular");
    const position = invoiceTableTop + 20;
    generateTableRow(doc, position, order.display_id, order.created_at.toLocaleString(), order.shipping_methods ? order.shipping_methods[0].name : 'N/A');
    (0, hr_1.generateHrInA7)(doc, position + 10);
    return position + 10;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtb3JkZXItaW5mby1zbWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9wYXJ0cy90YWJsZS1vcmRlci1pbmZvLXNtYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQW9CSCx3REEyQkM7QUE1Q0QsNkJBQXNDO0FBQ3RDLHFDQUE0QjtBQUU1QixTQUFTLGdCQUFnQixDQUN2QixHQUFHLEVBQ0gsQ0FBQyxFQUNELFdBQVcsRUFDWCxTQUFTLEVBQ1QsY0FBYztJQUVkLEdBQUc7U0FDQSxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ1gsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxTQUFnQixzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQWUsRUFBRSxLQUF5QjtJQUN2RixNQUFNLGVBQWUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRS9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsZ0JBQWdCLENBQ2QsR0FBRyxFQUNILGVBQWUsRUFDZixJQUFBLFdBQUMsRUFBQyx3Q0FBd0MsRUFBRSxTQUFTLENBQUMsRUFDdEQsSUFBQSxXQUFDLEVBQUMsc0NBQXNDLEVBQUUsWUFBWSxDQUFDLEVBQ3ZELElBQUEsV0FBQyxFQUFDLDJDQUEyQyxFQUFFLGlCQUFpQixDQUFDLENBQ2xFLENBQUM7SUFDRixJQUFBLG1CQUFjLEVBQUMsR0FBRyxFQUFFLGVBQWUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMxQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sUUFBUSxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFFdEMsZ0JBQWdCLENBQ2QsR0FBRyxFQUNILFFBQVEsRUFDUixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUNqQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDaEUsQ0FBQztJQUVGLElBQUEsbUJBQWMsRUFBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRW5DLE9BQU8sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUN2QixDQUFDIn0=