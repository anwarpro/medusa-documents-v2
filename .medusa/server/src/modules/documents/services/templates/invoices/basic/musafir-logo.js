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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzYWZpci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9tdXNhZmlyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBWUgsc0NBRUM7QUFWRCxvREFBaUM7QUFDakMsaUVBQTRFO0FBQzVFLGlEQUE2RDtBQUM3RCwrREFBMEU7QUFDMUUscUVBQXdFO0FBQ3hFLDZEQUFpRTtBQUNqRSxnREFBd0I7QUFFeEIsU0FBZ0IsYUFBYSxDQUFDLFFBQThCO0lBQ3hELE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGtCQUFlLEtBQUssRUFBRSxRQUE2QixFQUFFLE9BQTJCLEVBQUUsS0FBZSxFQUFtQixFQUFFO0lBQ2xILElBQUksR0FBRyxHQUFHLElBQUksZ0JBQVcsRUFBRSxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLGtEQUFrRCxDQUFDLENBQUMsQ0FBQTtJQUN4RyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwrQ0FBK0MsQ0FBQyxDQUFDLENBQUE7SUFDbEcsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDbEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUUxQyxJQUFJLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixNQUFNLElBQUEsZ0NBQWtCLEVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsZUFBZ0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxnQ0FBZ0M7SUFDaEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBRW5CLDJDQUEyQztJQUMzQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUV0QixNQUFNLE9BQU8sR0FBRyxJQUFBLHlDQUEwQixFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRixNQUFNLE1BQU0sR0FBRyxJQUFBLDJDQUEyQixFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSx1Q0FBcUIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUU3RCxJQUFBLDRCQUFvQixFQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFFakUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRVYsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQVMsT0FBTyxDQUFDLEVBQUU7UUFDaEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDL0IsQ0FBQyxDQUFDIn0=