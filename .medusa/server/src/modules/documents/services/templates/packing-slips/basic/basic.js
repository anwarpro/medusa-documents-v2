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
const header_1 = require("./parts/header");
const customer_info_1 = require("./parts/customer-info");
const table_items_1 = require("./parts/table-items");
const table_order_info_1 = require("./parts/table-order-info");
const fonts_1 = require("../../../../utils/fonts");
function validateInput(settings) {
    if (settings && settings.storeAddress && settings.storeAddress.company &&
        settings.storeAddress.address_1 &&
        settings.storeAddress.city &&
        settings.storeAddress.postal_code)
        return [true, ''];
    return [false, `Not all settings are defined to generate template. Following settings are checked: company, address, city, postal_code`];
}
exports.default = async (settings, packingSlip, order) => {
    var doc = new pdfkit_1.default();
    doc.registerFont('Regular', (0, fonts_1.resolveFontPath)('IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', (0, fonts_1.resolveFontPath)('IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, header_1.generateHeader)(doc, 30, settings);
    const endY = (0, customer_info_1.generateCustomerInformation)(doc, endHeader, order);
    const endTable = (0, table_order_info_1.generateOrderInfoTable)(doc, endY, order, order.items || []);
    (0, table_items_1.generateItemsTable)(doc, endTable, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise(resolve => {
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL3BhY2tpbmctc2xpcHMvYmFzaWMvYmFzaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBV0gsc0NBT0M7QUFoQkQsb0RBQWlDO0FBRWpDLDJDQUErQztBQUMvQyx5REFBb0U7QUFDcEUscURBQXlEO0FBQ3pELCtEQUFrRTtBQUNsRSxtREFBMEQ7QUFHMUQsU0FBZ0IsYUFBYSxDQUFDLFFBQThCO0lBQzFELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPO1FBQ3BFLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUztRQUMvQixRQUFRLENBQUMsWUFBWSxDQUFDLElBQUk7UUFDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO0FBQzNJLENBQUM7QUFFRCxrQkFBZSxLQUFLLEVBQUUsUUFBNkIsRUFBRSxXQUFtQyxFQUFFLEtBQWUsRUFBbUIsRUFBRTtJQUU1SCxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFXLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFBLHVCQUFlLEVBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFBO0lBQ3ZFLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUEsdUJBQWUsRUFBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUE7SUFDakUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFDbEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtJQUUxQyxNQUFNLFNBQVMsR0FBRyxJQUFBLHVCQUFjLEVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxNQUFNLElBQUksR0FBRyxJQUFBLDJDQUEyQixFQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBQSx5Q0FBc0IsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLElBQUEsZ0NBQWtCLEVBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUU1RCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFVixNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBUyxPQUFPLENBQUMsRUFBRTtRQUNsRCxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDZixNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUM3QixDQUFDLENBQUMifQ==