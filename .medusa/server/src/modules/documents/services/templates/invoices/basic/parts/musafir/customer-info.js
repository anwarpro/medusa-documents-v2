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
exports.generateCustomerInformation = generateCustomerInformation;
const hr_1 = require("./hr");
const i18next_1 = require("i18next");
function generateCustomerInformation(doc, y, order) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text(`${(0, i18next_1.t)("invoice-customer-details", "Details")}`, 50, y + 10);
    (0, hr_1.generateHr)(doc, y + 40);
    const customerInformationTop = y + 50;
    let heightOfBillToAddress;
    if (order.billing_address) {
        doc
            .fontSize(10)
            .font("Bold")
            .text(`${(0, i18next_1.t)("invoice-bill-to", "Bill to")}:`, 50, customerInformationTop, { align: 'left' })
            .font("Regular")
            .text(`${order.billing_address.first_name} ${order.billing_address.last_name}`, 50, customerInformationTop + 15, { align: 'left' })
            .text(`${order.billing_address.city} ${order.billing_address.postal_code}`, 50, customerInformationTop + 30, { align: 'left' });
        const billAddress = order.billing_address.address_1;
        heightOfBillToAddress = doc.heightOfString(billAddress, { width: 150 });
        doc.text(billAddress, 50, customerInformationTop + 45, { align: 'left', width: 150 })
            .moveDown();
    }
    let heightOfShipToAddress;
    if (order.shipping_address) {
        doc
            .fontSize(10)
            .font("Bold")
            .text(`${(0, i18next_1.t)("invoice-ship-to", "Ship to")}:`, 50, customerInformationTop, { align: 'right' })
            .font("Regular")
            .text(`${order.shipping_address.first_name} ${order.shipping_address.last_name}`, 50, customerInformationTop + 15, { align: 'right' })
            .text(`${order.shipping_address.city} ${order.shipping_address.postal_code}`, 50, customerInformationTop + 30, { align: 'right' })
            .moveDown();
        const shipAddress = order.shipping_address.address_1;
        heightOfShipToAddress = doc.heightOfString(shipAddress, { width: 150 });
        doc.text(shipAddress, 360, customerInformationTop + 45, { align: 'right', widdth: 150 })
            .moveDown();
    }
    if (heightOfBillToAddress && heightOfShipToAddress) {
        if (heightOfShipToAddress > heightOfBillToAddress) {
            return customerInformationTop + 45 + heightOfShipToAddress;
        }
        else {
            return customerInformationTop + 45 + heightOfBillToAddress;
        }
    }
    if (heightOfBillToAddress) {
        return customerInformationTop + 45 + heightOfBillToAddress;
    }
    if (heightOfShipToAddress) {
        return customerInformationTop + 45 + heightOfShipToAddress;
    }
    return customerInformationTop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvcGFydHMvbXVzYWZpci9jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQU1ILGtFQTREQztBQWhFRCw2QkFBZ0M7QUFDaEMscUNBQTBCO0FBRzFCLFNBQWdCLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBZTtJQUMvRCxHQUFHO1NBQ0UsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ1osSUFBSSxDQUFDLEdBQUcsSUFBQSxXQUFDLEVBQUMsMEJBQTBCLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXJFLElBQUEsZUFBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFeEIsTUFBTSxzQkFBc0IsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXRDLElBQUkscUJBQXlDLENBQUM7SUFFOUMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsR0FBRzthQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7YUFDWixJQUFJLENBQUMsTUFBTSxDQUFDO2FBRVosSUFBSSxDQUFDLEdBQUcsSUFBQSxXQUFDLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsc0JBQXNCLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDeEYsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNmLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxJQUFJLEtB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