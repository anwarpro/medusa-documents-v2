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
const DocumentInvoiceSettings = utils_1.model.define("document_invoice_settings", {
    id: utils_1.model.id().primaryKey(),
    forcedNumber: utils_1.model.number().nullable(),
    numberFormat: utils_1.model.text().nullable(),
    template: utils_1.model.text().nullable(),
    documentInvoice: utils_1.model.hasMany(() => document_invoice_1.default, {
        mappedBy: 'invoiceSettings'
    })
});
exports.default = DocumentInvoiceSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtaW52b2ljZS1zZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9tb2RlbHMvZG9jdW1lbnQtaW52b2ljZS1zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7QUFFSCxxREFBaUQ7QUFDakQsMEVBQWdEO0FBRWhELE1BQU0sdUJBQXVCLEdBQUcsYUFBSyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRTtJQUN4RSxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixZQUFZLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN2QyxZQUFZLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNyQyxRQUFRLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNqQyxlQUFlLEVBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQywwQkFBZSxFQUFFO1FBQ3BELFFBQVEsRUFBRSxpQkFBaUI7S0FDNUIsQ0FBQztDQUNILENBQUMsQ0FBQTtBQUVGLGtCQUFlLHVCQUF1QixDQUFBIn0=