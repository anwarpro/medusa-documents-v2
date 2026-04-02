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
    // Use default A4 size with bufferPages for control
    var doc = new pdfkit_1.default({
        size: 'A4',
        bufferPages: true
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVzYWZpci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9tdXNhZmlyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBWUgsc0NBRUM7QUFWRCxvREFBaUM7QUFDakMsaUVBQTRFO0FBQzVFLGlEQUE2RDtBQUM3RCwrREFBMEU7QUFDMUUscUVBQXdFO0FBQ3hFLDZEQUFpRTtBQUNqRSxnREFBd0I7QUFFeEIsU0FBZ0IsYUFBYSxDQUFDLFFBQThCO0lBQ3hELE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUVELGtCQUFlLEtBQUssRUFBRSxRQUE2QixFQUFFLE9BQTJCLEVBQUUsS0FBZSxFQUFtQixFQUFFO0lBQ2xILG1EQUFtRDtJQUNuRCxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFXLENBQUM7UUFDdEIsSUFBSSxFQUFFLElBQUk7UUFDVixXQUFXLEVBQUUsSUFBSTtLQUNwQixDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDLENBQUE7SUFDeEcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsK0NBQStDLENBQUMsQ0FBQyxDQUFBO0lBQ2xHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFMUMsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFBLGdDQUFrQixFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLGVBQWdCLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZ0NBQWdDO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUVuQiwyQ0FBMkM7SUFDM0MsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUNwQixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFFdEIsTUFBTSxPQUFPLEdBQUcsSUFBQSx5Q0FBMEIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEYsTUFBTSxNQUFNLEdBQUcsSUFBQSwyQ0FBMkIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsdUNBQXFCLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRXRGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFN0QsSUFBQSw0QkFBb0IsRUFBQyxHQUFHLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRWpFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUVWLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFTLE9BQU8sQ0FBQyxFQUFFO1FBQ2hELEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNmLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLE1BQU0sYUFBYSxDQUFDO0FBQy9CLENBQUMsQ0FBQyJ9