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
exports.DOCUMENTS_MODULE = void 0;
const service_1 = __importDefault(require("./service"));
const i18next_1 = __importDefault(require("./loaders/i18next"));
const utils_1 = require("@medusajs/framework/utils");
exports.DOCUMENTS_MODULE = "documentsModuleService";
exports.default = (0, utils_1.Module)(exports.DOCUMENTS_MODULE, {
    service: service_1.default,
    loaders: [i18next_1.default]
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7OztBQUVILHdEQUE4QztBQUM5QyxnRUFBNkM7QUFDN0MscURBQWtEO0FBRXJDLFFBQUEsZ0JBQWdCLEdBQUcsd0JBQXdCLENBQUE7QUFFeEQsa0JBQWUsSUFBQSxjQUFNLEVBQUMsd0JBQWdCLEVBQUU7SUFDdEMsT0FBTyxFQUFFLGlCQUFzQjtJQUMvQixPQUFPLEVBQUUsQ0FBQyxpQkFBYSxDQUFDO0NBQ3pCLENBQUMsQ0FBQSJ9