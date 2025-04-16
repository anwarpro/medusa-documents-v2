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
const document_invoice_settings_1 = __importDefault(require("./document-invoice-settings"));
const document_settings_1 = __importDefault(require("./document-settings"));
const DocumentInvoice = utils_1.model.define("document_invoice", {
    id: utils_1.model.id().primaryKey(),
    number: utils_1.model.number(),
    displayNumber: utils_1.model.text(),
    invoiceSettings: utils_1.model.belongsTo(() => document_invoice_settings_1.default, {
        mappedBy: 'documentInvoice'
    }),
    settings: utils_1.model.belongsTo(() => document_settings_1.default, {
        mappedBy: 'documentInvoice'
    })
});
exports.default = DocumentInvoice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtaW52b2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9tb2RlbHMvZG9jdW1lbnQtaW52b2ljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7QUFFSCxxREFBaUQ7QUFDakQsNEZBQWlFO0FBQ2pFLDRFQUFrRDtBQUVsRCxNQUFNLGVBQWUsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO0lBQ3ZELEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLE1BQU0sRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3RCLGFBQWEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQzNCLGVBQWUsRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1DQUF1QixFQUFFO1FBQzlELFFBQVEsRUFBRSxpQkFBaUI7S0FDNUIsQ0FBQztJQUNGLFFBQVEsRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLDJCQUFnQixFQUFFO1FBQ2hELFFBQVEsRUFBRSxpQkFBaUI7S0FDNUIsQ0FBQztDQUNILENBQUMsQ0FBQTtBQUVGLGtCQUFlLGVBQWUsQ0FBQSJ9