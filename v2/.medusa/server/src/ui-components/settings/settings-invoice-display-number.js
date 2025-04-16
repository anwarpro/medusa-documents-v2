"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const react_1 = require("react");
const InvoiceSettingsDisplayNumber = ({ formatNumber, forcedNumber }) => {
    const result = new URLSearchParams();
    if (formatNumber) {
        result.append('formatNumber', formatNumber);
    }
    if (forcedNumber) {
        result.append('forcedNumber', forcedNumber.toString());
    }
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setLoading(true);
    }, [formatNumber, forcedNumber]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/invoice/display-number?${result.toString()}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            setData(result);
            setLoading(false);
        })
            .catch((error) => {
            setError(error);
            console.error(error);
        });
    }, [isLoading]);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { readOnly: true }) }));
    }
    return ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { defaultValue: data.displayNumber, readOnly: true }, `display-number-${data.displayNumber}`) }));
};
exports.default = InvoiceSettingsDisplayNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtaW52b2ljZS1kaXNwbGF5LW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWludm9pY2UtZGlzcGxheS1udW1iZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBb0M7QUFDcEMsNENBQXFDO0FBQ3JDLGlDQUE0QztBQUU1QyxNQUFNLDRCQUE0QixHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFtRCxFQUFFLEVBQUU7SUFFdkgsTUFBTSxNQUFNLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUE7SUFFckQsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQWtCLFNBQVMsQ0FBQyxDQUFBO0lBRTVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFNLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRTlDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUE7SUFFaEMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE9BQU87UUFDVCxDQUFDO1FBRUQsS0FBSyxDQUFDLDJDQUEyQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNwRSxXQUFXLEVBQUUsU0FBUztTQUN2QixDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDZixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFHZixJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUNMLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFVBQUssSUFDSixRQUFRLEVBQUUsSUFBSSxHQUNkLEdBQ0csQ0FDUixDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FDTCx1QkFBQyxlQUFJLElBQUMsSUFBSSxrQkFDUix1QkFBQyxVQUFLLElBQ0osWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQ2hDLFFBQVEsRUFBRSxJQUFJLElBRkosa0JBQWtCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FHaEQsR0FDRyxDQUNSLENBQUE7QUFDSCxDQUFDLENBQUE7QUFHRCxrQkFBZSw0QkFBNEIsQ0FBQSJ9