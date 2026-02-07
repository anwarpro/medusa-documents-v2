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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputForProvidedKind = validateInputForProvidedKind;
exports.generatePackingSlip = generatePackingSlip;
const template_kind_1 = require("../../types/template-kind");
const basic_1 = __importStar(require("../templates/packing-slips/basic/basic"));
const small_1 = __importStar(require("../templates/packing-slips/basic/small"));
function validateInputForProvidedKind(templateKind, documentSettings) {
    switch (templateKind) {
        case template_kind_1.PackingSlipTemplateKind.BASIC:
            return (0, basic_1.validateInput)(documentSettings);
        case template_kind_1.PackingSlipTemplateKind.BASIC_SMALL:
            return (0, small_1.validateInput)(documentSettings);
        default:
            return [false, 'Not supported template'];
    }
}
function generatePackingSlip(kind, documentSettings, invoice, order) {
    switch (kind) {
        case template_kind_1.PackingSlipTemplateKind.BASIC:
            return (0, basic_1.default)(documentSettings, invoice, order);
        case template_kind_1.PackingSlipTemplateKind.BASIC_SMALL:
            return (0, small_1.default)(documentSettings, invoice, order);
        default:
            return Promise.resolve(Buffer.from('Not supported template'));
    }
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2luZy1zbGlwLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy9nZW5lcmF0b3JzL3BhY2tpbmctc2xpcC1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUgsb0VBU0M7QUFFRCxrREFTQztBQXhCRCw2REFBb0U7QUFDcEUsZ0ZBQTBHO0FBQzFHLGdGQUEwRztBQUUxRyxTQUFnQiw0QkFBNEIsQ0FBQyxZQUFxQyxFQUFFLGdCQUFxQztJQUN2SCxRQUFRLFlBQVksRUFBRSxDQUFDO1FBQ3JCLEtBQUssdUNBQXVCLENBQUMsS0FBSztZQUNoQyxPQUFPLElBQUEscUJBQWtCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QyxLQUFLLHVDQUF1QixDQUFDLFdBQVc7WUFDdEMsT0FBTyxJQUFBLHFCQUFrQixFQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUM7WUFDRSxPQUFPLENBQUMsS0FBSyxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDN0MsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxJQUE2QixFQUFFLGdCQUFxQyxFQUFFLE9BQStCLEVBQUUsS0FBZTtJQUN4SixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyx1Q0FBdUIsQ0FBQyxLQUFLO1lBQ2hDLE9BQU8sSUFBQSxlQUFhLEVBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3pELEtBQUssdUNBQXVCLENBQUMsV0FBVztZQUN0QyxPQUFPLElBQUEsZUFBYSxFQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RDtZQUNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0FBQ0gsQ0FBQztBQUFBLENBQUMifQ==