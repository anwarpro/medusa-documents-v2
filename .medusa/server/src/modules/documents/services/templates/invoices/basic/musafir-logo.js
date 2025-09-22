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
    if (settings && settings.storeAddress && settings.storeAddress.company &&
        settings.storeAddress.address_1 &&
        settings.storeAddress.city &&
        settings.storeAddress.postal_code &&
        settings.storeLogoSource)
        return [true, ''];
    return [false, `Not all settings are defined to generate template. Following settings are checked: logo, company, address, city, postal_code`];
}
exports.default = async (settings, invoice, order) => {
    var doc = new pdfkit_1.default();
    doc.registerFont('Regular', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    await (0, header_logo_1.generateHeaderLogo)(doc, 50, settings.storeLogoSource);
    const endHeader = (0, header_for_logo_1.generateHeaderForLogo)(doc, 50, settings);
    const endInvoice = (0, invoice_info_1.generateInvoiceInformation)(doc, 50, invoice, order);
    let customerInfoStartY = endInvoice;
    if (endInvoice > endHeader)
        customerInfoStartY = endInvoice;
    else
        customerInfoStartY = endHeader;
    const endDetails = (0, customer_info_1.generateCustomerInformation)(doc, customerInfoStartY, order);
    (0, table_1.generateInvoiceTable)(doc, endDetails, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise(resolve => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzYWZpci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9tdXNhZmlyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBWUgsc0NBUUM7QUFoQkQsb0RBQWlDO0FBQ2pDLGlFQUEwRTtBQUMxRSxpREFBMkQ7QUFDM0QsK0RBQXdFO0FBQ3hFLHFFQUFzRTtBQUN0RSw2REFBK0Q7QUFDL0QsZ0RBQXdCO0FBRXhCLFNBQWdCLGFBQWEsQ0FBQyxRQUE4QjtJQUN4RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTztRQUNsRSxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVM7UUFDL0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJO1FBQzFCLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVztRQUNqQyxRQUFRLENBQUMsZUFBZTtRQUMxQixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsOEhBQThILENBQUMsQ0FBQztBQUNuSixDQUFDO0FBRUQsa0JBQWUsS0FBSyxFQUFFLFFBQTZCLEVBQUUsT0FBMkIsRUFBRSxLQUFlLEVBQW1CLEVBQUU7SUFDbEgsSUFBSSxHQUFHLEdBQUcsSUFBSSxnQkFBVyxFQUFFLENBQUM7SUFDNUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsa0RBQWtELENBQUMsQ0FBQyxDQUFBO0lBQ3hHLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLCtDQUErQyxDQUFDLENBQUMsQ0FBQTtJQUNsRyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRXBCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNsQixHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBRTFDLE1BQU0sSUFBQSxnQ0FBa0IsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxlQUFnQixDQUFDLENBQUM7SUFDN0QsTUFBTSxTQUFTLEdBQUcsSUFBQSx1Q0FBcUIsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELE1BQU0sVUFBVSxHQUFHLElBQUEseUNBQTBCLEVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkUsSUFBSSxrQkFBa0IsR0FBRyxVQUFVLENBQUM7SUFDcEMsSUFBSSxVQUFVLEdBQUcsU0FBUztRQUN0QixrQkFBa0IsR0FBRyxVQUFVLENBQUE7O1FBRS9CLGtCQUFrQixHQUFHLFNBQVMsQ0FBQztJQUVuQyxNQUFNLFVBQVUsR0FBRyxJQUFBLDJDQUEyQixFQUFDLEdBQUcsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvRSxJQUFBLDRCQUFvQixFQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFFaEUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRVYsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQVMsT0FBTyxDQUFDLEVBQUU7UUFDaEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDL0IsQ0FBQyxDQUFDIn0=