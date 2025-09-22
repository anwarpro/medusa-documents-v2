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
    (0, hr_1.generateHr)(doc, y + 35);
    const customerInformationTop = y + 50;
    let heightOfBillToAddress;
    if (order.billing_address) {
        doc
            .fontSize(10)
            .font("Bold")
            .text(`${(0, i18next_1.t)("packing-slip-bill-to", "Bill to")}:`, 50, customerInformationTop, { align: 'left' })
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
            .text(`${(0, i18next_1.t)("packing-slip-ship-to", "Ship to")}:`, 50, customerInformationTop, { align: 'right' })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9wYXJ0cy9jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQU1ILGtFQXNEQztBQTFERCw2QkFBa0M7QUFDbEMscUNBQTRCO0FBRzVCLFNBQWdCLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBZTtJQUVqRSxJQUFBLGVBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUV0QyxJQUFJLHFCQUF5QyxDQUFDO0lBRTlDLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzFCLEdBQUc7YUFDQSxRQUFRLENBQUMsRUFBRSxDQUFDO2FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNaLElBQUksQ0FBQyxHQUFHLElBQUEsV0FBQyxFQUFDLHNCQUFzQixFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLHNCQUFzQixFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQzdGLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDZixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsR0FBRyxFQUFFLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDaEksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxXQUFX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