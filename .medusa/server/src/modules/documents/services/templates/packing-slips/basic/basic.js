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
const path_1 = __importDefault(require("path"));
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
    doc.registerFont('Regular', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', path_1.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL3BhY2tpbmctc2xpcHMvYmFzaWMvYmFzaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBV0gsc0NBT0M7QUFoQkQsb0RBQWlDO0FBRWpDLDJDQUErQztBQUMvQyx5REFBb0U7QUFDcEUscURBQXlEO0FBQ3pELCtEQUFrRTtBQUNsRSxnREFBd0I7QUFHeEIsU0FBZ0IsYUFBYSxDQUFDLFFBQThCO0lBQzFELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPO1FBQ3BFLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUztRQUMvQixRQUFRLENBQUMsWUFBWSxDQUFDLElBQUk7UUFDMUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXO1FBQ2pDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSx3SEFBd0gsQ0FBQyxDQUFDO0FBQzNJLENBQUM7QUFFRCxrQkFBZSxLQUFLLEVBQUUsUUFBNkIsRUFBRSxXQUFtQyxFQUFFLEtBQWUsRUFBbUIsRUFBRTtJQUU1SCxJQUFJLEdBQUcsR0FBRyxJQUFJLGdCQUFXLEVBQUUsQ0FBQztJQUM1QixHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxrREFBa0QsQ0FBQyxDQUFDLENBQUE7SUFDeEcsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsK0NBQStDLENBQUMsQ0FBQyxDQUFBO0lBQ2xHLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7SUFFMUMsTUFBTSxTQUFTLEdBQUcsSUFBQSx1QkFBYyxFQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsTUFBTSxJQUFJLEdBQUcsSUFBQSwyQ0FBMkIsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sUUFBUSxHQUFHLElBQUEseUNBQXNCLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3RSxJQUFBLGdDQUFrQixFQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFFNUQsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRVYsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQVMsT0FBTyxDQUFDLEVBQUU7UUFDbEQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO1lBQ2YsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sTUFBTSxhQUFhLENBQUM7QUFDN0IsQ0FBQyxDQUFDIn0=