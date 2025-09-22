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
const utils_1 = require("@medusajs/framework/utils");
const document_invoice_1 = __importDefault(require("./document-invoice"));
const document_packing_slip_1 = __importDefault(require("./document-packing-slip"));
const DocumentSettings = utils_1.model.define("document_settings", {
    id: utils_1.model.id().primaryKey(),
    storeAddress: utils_1.model.json().nullable(),
    storeLogoSource: utils_1.model.text().nullable(),
    documentInvoice: utils_1.model.hasMany(() => document_invoice_1.default, {
        mappedBy: 'settings'
    }),
    documentPackingSlip: utils_1.model.hasMany(() => document_packing_slip_1.default, {
        mappedBy: 'settings'
    })
});
exports.default = DocumentSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtc2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvbW9kZWxzL2RvY3VtZW50LXNldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7OztBQUVILHFEQUFpRDtBQUNqRCwwRUFBZ0Q7QUFDaEQsb0ZBQXlEO0FBRXpELE1BQU0sZ0JBQWdCLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtJQUN6RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixZQUFZLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNyQyxlQUFlLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN4QyxlQUFlLEVBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBZSxFQUFFO1FBQ3BELFFBQVEsRUFBRSxVQUFVO0tBQ3JCLENBQUM7SUFDRixtQkFBbUIsRUFBRSxhQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLCtCQUFtQixFQUFFO1FBQzVELFFBQVEsRUFBRSxVQUFVO0tBQ3JCLENBQUM7Q0FDSCxDQUFDLENBQUE7QUFFRixrQkFBZSxnQkFBZ0IsQ0FBQSJ9