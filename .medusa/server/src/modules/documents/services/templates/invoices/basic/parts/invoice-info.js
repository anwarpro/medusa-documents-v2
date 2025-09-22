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
const hr_1 = require("./hr");
const i18next_1 = require("i18next");
function generateInvoiceInformation(doc, y, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text((0, i18next_1.t)("invoice", "Invoice"), 50, y + 40);
    (0, hr_1.generateHr)(doc, y + 65);
    const invoiceInformationTop = y + 80;
    doc
        .fontSize(10)
        .text(`${(0, i18next_1.t)("invoice-number", "Invoice number")}:`, 50, invoiceInformationTop)
        .font("Bold")
        .text(invoice.displayNumber, 150, invoiceInformationTop)
        .font("Regular")
        .text(`${(0, i18next_1.t)("invoice-date", "Invoice date")}:`, 50, invoiceInformationTop + 15)
        .text(invoice.created_at.toLocaleDateString(), 150, invoiceInformationTop + 15)
        .moveDown();
    return invoiceInformationTop + 15;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1pbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9pbnZvaWNlLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBTUgsZ0VBcUJDO0FBeEJELDZCQUFrQztBQUNsQyxxQ0FBNEI7QUFFNUIsU0FBZ0IsMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxPQUEyQjtJQUNwRixHQUFHO1NBQ0EsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ1osSUFBSSxDQUFDLElBQUEsV0FBQyxFQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRTdDLElBQUEsZUFBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFeEIsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXJDLEdBQUc7U0FDQSxRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ1osSUFBSSxDQUFDLEdBQUcsSUFBQSxXQUFDLEVBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQztTQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixDQUFDO1NBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUM7U0FDZixJQUFJLENBQUMsR0FBRyxJQUFBLFdBQUMsRUFBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1NBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztTQUM5RSxRQUFRLEVBQUUsQ0FBQztJQUVkLE9BQU8scUJBQXFCLEdBQUcsRUFBRSxDQUFDO0FBQ3BDLENBQUMifQ==