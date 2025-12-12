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
exports.generateInvoiceInformation = generateInvoiceInformation;
const i18next_1 = require("i18next");
function generateInvoiceInformation(doc, y, invoice, order) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text((0, i18next_1.t)("invoice", "Invoice"), 350, y);
    const invoiceInformationTop = y + 40;
    doc
        .fontSize(10)
        .text("Invoice number:", 350, invoiceInformationTop)
        .font("Bold")
        .text(invoice.displayNumber, 450, invoiceInformationTop)
        .font("Regular")
        .text("Invoice date:", 350, invoiceInformationTop + 15)
        .text(invoice.created_at.toLocaleDateString(), 450, invoiceInformationTop + 15)
        .text("Order:", 350, invoiceInformationTop + 15 + 15)
        .font("Bold")
        .text(`#${order.display_id}`, 450, invoiceInformationTop + 15 + 15)
        .moveDown();
    return invoiceInformationTop + 30;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1pbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9tdXNhZmlyL2ludm9pY2UtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFNSCxnRUFzQkM7QUF6QkQscUNBQTBCO0FBRzFCLFNBQWdCLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxDQUFTLEVBQUUsT0FBMkIsRUFBRSxLQUFlO0lBQ25HLEdBQUc7U0FDRSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsSUFBQSxXQUFDLEVBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUzQyxNQUFNLHFCQUFxQixHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFckMsR0FBRztTQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixDQUFDO1NBQ25ELElBQUksQ0FBQyxNQUFNLENBQUM7U0FDWixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUscUJBQXFCLENBQUM7U0FDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNmLElBQUksQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztTQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsR0FBRyxFQUFFLENBQUM7U0FDOUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUscUJBQXFCLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRSxxQkFBcUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ2xFLFFBQVEsRUFBRSxDQUFDO0lBRWhCLE9BQU8scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ3RDLENBQUMifQ==