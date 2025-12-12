"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersTab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
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
const ui_1 = require("@medusajs/ui");
const react_1 = require("react");
const material_1 = require("@mui/material");
const order_table_1 = __importDefault(require("../orders/order-table"));
const OrdersTab = ({ searchTerm = "" }) => {
    const [contextFilters, setContextFilters] = (0, react_1.useState)();
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, spacing: 2, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ui_1.Container, { children: (0, jsx_runtime_1.jsx)(order_table_1.default, { setContextFilters: setContextFilters, searchTerm: searchTerm }) }) }) }));
};
exports.OrdersTab = OrdersTab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLXRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3RhYnMvb3JkZXJzLXRhYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBd0M7QUFDeEMsaUNBQStCO0FBQy9CLDRDQUFxQztBQUNyQyx3RUFBK0M7QUFNeEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQWtCLEVBQUUsRUFBRTtJQUMvRCxNQUFNLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLEdBQ3ZDLElBQUEsZ0JBQVEsR0FBd0MsQ0FBQTtJQUVsRCxPQUFPLENBQ0wsdUJBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxPQUFPLEVBQUUsQ0FBQyxZQUN4Qix1QkFBQyxlQUFJLElBQUMsSUFBSSxRQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxZQUMvQix1QkFBQyxjQUFTLGNBQ1IsdUJBQUMscUJBQVUsSUFBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsVUFBVSxHQUFJLEdBQ2xFLEdBQ1AsR0FDRixDQUNSLENBQUE7QUFDSCxDQUFDLENBQUE7QUFiWSxRQUFBLFNBQVMsYUFhckIifQ==