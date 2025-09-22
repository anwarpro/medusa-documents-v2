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
    (0, hr_1.generateHrInA7)(doc, y + 15);
    const customerInformationTop = y + 25;
    let heightOfBillToAddress;
    if (order.billing_address) {
        doc
            .fontSize(6)
            .font("Bold")
            .text(`${(0, i18next_1.t)("packing-slip-bill-to", "Bill to")}:`, 25, customerInformationTop, { align: 'left' })
            .font("Regular")
            .text(`${order.billing_address.first_name} ${order.billing_address.last_name}`, 25, customerInformationTop + 10, { align: 'left' })
            .text(`${order.billing_address.city} ${order.billing_address.postal_code}`, 25, customerInformationTop + 20, { align: 'left' });
        const billAddress = order.billing_address.address_1;
        heightOfBillToAddress = doc.heightOfString(billAddress);
        doc.text(billAddress, 25, customerInformationTop + 30, { align: 'left' })
            .moveDown();
    }
    let heightOfShipToAddress;
    if (order.shipping_address) {
        const RIGHT_MARGIN = 90;
        const RIGHT_WIDTH = 100;
        doc
            .fontSize(6)
            .font("Bold");
        doc
            .text(`${(0, i18next_1.t)("packing-slip-ship-to", "Ship to")}:`, RIGHT_MARGIN, customerInformationTop, { align: 'right', width: RIGHT_WIDTH })
            .font("Regular");
        doc
            .text(`${order.shipping_address.first_name} ${order.shipping_address.last_name}`, RIGHT_MARGIN, customerInformationTop + 10, { align: 'right', width: RIGHT_WIDTH })
            .text(`${order.shipping_address.city} ${order.shipping_address.postal_code}`, RIGHT_MARGIN, customerInformationTop + 20, { align: 'right', width: RIGHT_WIDTH })
            .moveDown();
        const shipAddress = order.shipping_address.address_1;
        heightOfShipToAddress = doc.heightOfString(shipAddress, { width: RIGHT_WIDTH });
        doc.text(shipAddress, RIGHT_MARGIN, customerInformationTop + 30, { align: 'right', width: RIGHT_WIDTH })
            .moveDown();
    }
    if (heightOfBillToAddress && heightOfShipToAddress) {
        if (heightOfShipToAddress > heightOfBillToAddress) {
            return customerInformationTop + 30 + heightOfShipToAddress;
        }
        else {
            return customerInformationTop + 30 + heightOfBillToAddress;
        }
    }
    if (heightOfBillToAddress) {
        return customerInformationTop + 30 + heightOfBillToAddress;
    }
    if (heightOfShipToAddress) {
        return customerInformationTop + 30 + heightOfShipToAddress;
    }
    return customerInformationTop;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5mby1zbWFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9wYXJ0cy9jdXN0b21lci1pbmZvLXNtYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQU1ILGtFQTZEQztBQWhFRCw2QkFBc0M7QUFDdEMscUNBQTRCO0FBRTVCLFNBQWdCLDJCQUEyQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBZTtJQUVqRSxJQUFBLG1CQUFjLEVBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUU1QixNQUFNLHNCQUFzQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFdEMsSUFBSSxxQkFBeUMsQ0FBQztJQUU5QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMxQixHQUFHO2FBQ0YsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNYLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDWixJQUFJLENBQUMsR0FBRyxJQUFBLFdBQUMsRUFBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxzQkFBc0IsRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUMsQ0FBQzthQUM3RixJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsc0JBQXNCLEdBQUcsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQ2hJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxl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