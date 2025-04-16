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
const document_packing_slip_1 = __importDefault(require("./document-packing-slip"));
const DocumentPackingSlipSettings = utils_1.model.define("document_packing_slip_settings", {
    id: utils_1.model.id().primaryKey(),
    forcedNumber: utils_1.model.number().nullable(),
    numberFormat: utils_1.model.text().nullable(),
    template: utils_1.model.text().nullable(),
    documentPackingSlip: utils_1.model.hasMany(() => document_packing_slip_1.default, {
        mappedBy: 'packingSlipSettings'
    })
});
exports.default = DocumentPackingSlipSettings;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQtcGFja2luZy1zbGlwLXNldHRpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL21vZGVscy9kb2N1bWVudC1wYWNraW5nLXNsaXAtc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7O0FBRUgscURBQWlEO0FBQ2pELG9GQUF5RDtBQUV6RCxNQUFNLDJCQUEyQixHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLEVBQUU7SUFDakYsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsWUFBWSxFQUFFLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDdkMsWUFBWSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsUUFBUSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakMsbUJBQW1CLEVBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQywrQkFBbUIsRUFBRTtRQUM1RCxRQUFRLEVBQUUscUJBQXFCO0tBQ2hDLENBQUM7Q0FDSCxDQUFDLENBQUE7QUFFRixrQkFBZSwyQkFBMkIsQ0FBQSJ9