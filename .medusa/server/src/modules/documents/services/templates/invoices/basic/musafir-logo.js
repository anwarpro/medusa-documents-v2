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
const fonts_1 = require("../../../../utils/fonts");
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
    doc.registerFont('Regular', (0, fonts_1.resolveFontPath)('IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', (0, fonts_1.resolveFontPath)('IBMPlexSans-Bold.ttf'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzYWZpci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9tdXNhZmlyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBWUgsc0NBUUM7QUFoQkQsb0RBQWlDO0FBQ2pDLGlFQUEwRTtBQUMxRSxpREFBMkQ7QUFDM0QsK0RBQXdFO0FBQ3hFLHFFQUFzRTtBQUN0RSw2REFBK0Q7QUFDL0QsbURBQXdEO0FBRXhELFNBQWdCLGFBQWEsQ0FBQyxRQUE4QjtJQUN4RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTztRQUNsRSxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVM7UUFDL0IsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJO1FBQzFCLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVztRQUNqQyxRQUFRLENBQUMsZUFBZTtRQUMxQixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsOEhBQThILENBQUMsQ0FBQztBQUNuSixDQUFDO0FBRUQsa0JBQWUsS0FBSyxFQUFFLFFBQTZCLEVBQUUsT0FBMkIsRUFBRSxLQUFlLEVBQW1CLEVBQUU7SUFDbEgsSUFBSSxHQUFHLEdBQUcsSUFBSSxnQkFBVyxFQUFFLENBQUM7SUFDNUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBQSx1QkFBZSxFQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQTtJQUN2RSxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFBLHVCQUFlLEVBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFBO0lBQ2pFLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFMUMsTUFBTSxJQUFBLGdDQUFrQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLGVBQWdCLENBQUMsQ0FBQztJQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFBLHVDQUFxQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsTUFBTSxVQUFVLEdBQUcsSUFBQSx5Q0FBMEIsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RSxJQUFJLGtCQUFrQixHQUFHLFVBQVUsQ0FBQztJQUNwQyxJQUFJLFVBQVUsR0FBRyxTQUFTO1FBQ3RCLGtCQUFrQixHQUFHLFVBQVUsQ0FBQTs7UUFFL0Isa0JBQWtCLEdBQUcsU0FBUyxDQUFDO0lBRW5DLE1BQU0sVUFBVSxHQUFHLElBQUEsMkNBQTJCLEVBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9FLElBQUEsNEJBQW9CLEVBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVoRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUNoRCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDZixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUMvQixDQUFDLENBQUMifQ==