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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = validateInput;
const pdfkit_1 = __importDefault(require("pdfkit"));
const customer_info_1 = require("./parts/musafir/customer-info");
const table_1 = require("./parts/musafir/table");
const invoice_info_1 = require("./parts/musafir/invoice-info");
const header_for_logo_1 = require("./parts/musafir/header-for-logo");
const header_logo_1 = require("./parts/musafir/header-logo");
const path_1 = __importDefault(require("path"));
function validateInput(settings) {
    return [true, ''];
}
exports.default = async (settings, invoice, order) => {
    var doc = new pdfkit_1.default();
    doc.registerFont('Regular', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    if (settings.storeLogoSource) {
        await (0, header_logo_1.generateHeaderLogo)(doc, 30, settings.storeLogoSource);
    }
    // Header section starts at Y=30
    const startY = 100;
    // Three columns for the header information
    const leftColX = 50;
    const midColX = 230;
    const rightColX = 410;
    const endLeft = (0, invoice_info_1.generateInvoiceInformation)(doc, startY, leftColX, invoice, order);
    const endMid = (0, customer_info_1.generateCustomerInformation)(doc, startY, midColX, order);
    const endRight = await (0, header_for_logo_1.generateHeaderForLogo)(doc, startY, rightColX, settings, order);
    const tableStartY = Math.max(endLeft, endMid, endRight) + 20;
    (0, table_1.generateInvoiceTable)(doc, tableStartY, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise(resolve => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMtbG9nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvYmFzaWMtbG9nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7QUFZSCxzQ0FFQztBQVZELG9EQUFpQztBQUNqQyxpRUFBNEU7QUFDNUUsaURBQTZEO0FBQzdELCtEQUEwRTtBQUMxRSxxRUFBd0U7QUFDeEUsNkRBQWlFO0FBQ2pFLGdEQUF3QjtBQUV4QixTQUFnQixhQUFhLENBQUMsUUFBOEI7SUFDMUQsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsa0JBQWUsS0FBSyxFQUFFLFFBQTZCLEVBQUUsT0FBMkIsRUFBRSxLQUFlLEVBQW1CLEVBQUU7SUFDcEgsSUFBSSxHQUFHLEdBQUcsSUFBSSxnQkFBVyxFQUFFLENBQUM7SUFDNUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0RBQWtELENBQUMsQ0FBQyxDQUFBO0lBQ3hHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLCtDQUErQyxDQUFDLENBQUMsQ0FBQTtJQUNsRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRTFDLElBQUksUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBQSxnQ0FBa0IsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxlQUFnQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFFbkIsMkNBQTJDO0lBQzNDLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDcEIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBRXRCLE1BQU0sT0FBTyxHQUFHLElBQUEseUNBQTBCLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xGLE1BQU0sTUFBTSxHQUFHLElBQUEsMkNBQTJCLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLHVDQUFxQixFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUV0RixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTdELElBQUEsNEJBQW9CLEVBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVqRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUNsRCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDakIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDN0IsQ0FBQyxDQUFDIn0=