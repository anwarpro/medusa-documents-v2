"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesTab = void 0;
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
const material_1 = require("@mui/material");
const templates_invoice_tab_1 = require("./templates-invoice-tab");
const templates_packing_slip_tab_1 = require("./templates-packing-slip-tab");
const TemplatesTab = () => {
    return ((0, jsx_runtime_1.jsxs)(ui_1.Tabs, { defaultValue: 'invoice', children: [(0, jsx_runtime_1.jsxs)(ui_1.Tabs.List, { children: [(0, jsx_runtime_1.jsx)(ui_1.Tabs.Trigger, { value: 'invoice', children: "Invoice" }), (0, jsx_runtime_1.jsx)(ui_1.Tabs.Trigger, { value: 'packing-slip', children: "Packing slip" })] }), (0, jsx_runtime_1.jsxs)(ui_1.Tabs.Content, { value: 'invoice', children: [(0, jsx_runtime_1.jsx)(material_1.Box, { height: 20 }), (0, jsx_runtime_1.jsx)(templates_invoice_tab_1.InvoiceTemplatesTab, {})] }), (0, jsx_runtime_1.jsxs)(ui_1.Tabs.Content, { value: 'packing-slip', children: [(0, jsx_runtime_1.jsx)(material_1.Box, { height: 20 }), (0, jsx_runtime_1.jsx)(templates_packing_slip_tab_1.PackingSlipTemplatesTab, {})] })] }));
};
exports.TemplatesTab = TemplatesTab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLXRhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3RhYnMvdGVtcGxhdGVzLXRhYi90ZW1wbGF0ZXMtdGFiLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7R0FVRztBQUVILHFDQUFtQztBQUNuQyw0Q0FBb0M7QUFDcEMsbUVBQThEO0FBQzlELDZFQUF1RTtBQUVoRSxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7SUFDL0IsT0FBTyxDQUNMLHdCQUFDLFNBQUksSUFBQyxZQUFZLEVBQUMsU0FBUyxhQUMxQix3QkFBQyxTQUFJLENBQUMsSUFBSSxlQUNSLHVCQUFDLFNBQUksQ0FBQyxPQUFPLElBQUMsS0FBSyxFQUFDLFNBQVMsd0JBQXVCLEVBQ3BELHVCQUFDLFNBQUksQ0FBQyxPQUFPLElBQUMsS0FBSyxFQUFDLGNBQWMsNkJBQTRCLElBQ3BELEVBQ1osd0JBQUMsU0FBSSxDQUFDLE9BQU8sSUFBQyxLQUFLLEVBQUMsU0FBUyxhQUMzQix1QkFBQyxjQUFHLElBQUMsTUFBTSxFQUFFLEVBQUUsR0FBUSxFQUN2Qix1QkFBQywyQ0FBbUIsS0FBRSxJQUNULEVBQ2Ysd0JBQUMsU0FBSSxDQUFDLE9BQU8sSUFBQyxLQUFLLEVBQUMsY0FBYyxhQUNoQyx1QkFBQyxjQUFHLElBQUMsTUFBTSxFQUFFLEVBQUUsR0FBUSxFQUN2Qix1QkFBQyxvREFBdUIsS0FBRSxJQUNiLElBQ1YsQ0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBakJZLFFBQUEsWUFBWSxnQkFpQnhCIn0=