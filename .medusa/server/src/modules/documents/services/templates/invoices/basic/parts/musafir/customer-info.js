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
function generateCustomerInformation(doc, y, order) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Customer Details", 50, y + 10);
    (0, hr_1.generateHr)(doc, y + 40);
    const customerInformationTop = y + 50;
    let heightOfBillToAddress;
    if (order.billing_address) {
        doc
            .fontSize(10)
            .font("Bold")
            .text("Bill to:", 50, customerInformationTop, { align: 'left' })
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
            .text("Ship to:", 50, customerInformationTop, { align: 'right' })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvcGFydHMvbXVzYWZpci9jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQU1ILGtFQTREQztBQWhFRCw2QkFBZ0M7QUFJaEMsU0FBZ0IsMkJBQTJCLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFlO0lBQy9ELEdBQUc7U0FDRSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUUxQyxJQUFBLGVBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUV0QyxJQUFJLHFCQUF5QyxDQUFDO0lBRTlDLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLEdBQUc7YUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUVaLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQzdELElBQUksQ0FBQyxTQUFTLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsR0FBRyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUM7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