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
const document_packing_slip_settings_1 = __importDefault(require("./document-packing-slip-settings"));
const document_settings_1 = __importDefault(require("./document-settings"));
const DocumentPackingSlip = utils_1.model.define("document_packing_slip", {
    id: utils_1.model.id().primaryKey(),
    number: utils_1.model.number(),
    displayNumber: utils_1.model.text(),
    packingSlipSettings: utils_1.model.belongsTo(() => document_packing_slip_settings_1.default, {
        mappedBy: 'documentPackingSlip'
    }),
    settings: utils_1.model.belongsTo(() => document_settings_1.default, {
        mappedBy: 'documentPackingSlip'
    })
});
exports.default = DocumentPackingSlip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcGFja2luZy1zbGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL21vZGVscy9kb2N1bWVudC1wYWNraW5nLXNsaXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBRUgscURBQWlEO0FBQ2pELHNHQUEwRTtBQUMxRSw0RUFBa0Q7QUFFbEQsTUFBTSxtQkFBbUIsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLHVCQUF1QixFQUFFO0lBQ2hFLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLE1BQU0sRUFBRSxhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3RCLGFBQWEsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQzNCLG1CQUFtQixFQUFFLGFBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsd0NBQTJCLEVBQUU7UUFDdEUsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQyxDQUFDO0lBQ0YsUUFBUSxFQUFFLGFBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsMkJBQWdCLEVBQUU7UUFDaEQsUUFBUSxFQUFFLHFCQUFxQjtLQUNoQyxDQUFDO0NBQ0gsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsbUJBQW1CLENBQUEifQ==