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
const icons_1 = require("@medusajs/icons");
const ui_1 = require("@medusajs/ui");
const react_1 = require("react");
const GenerateInvoiceDropdownButton = ({ order, updateInvoiceNumber }) => {
    const [isLoading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/invoice`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_id: order.id
            })
        })
            .then(async (res) => {
            const responseJson = await res.json();
            if (!res.ok) {
                throw new Error(responseJson.message || `HTTP error! status: ${res.status}`);
            }
            return responseJson;
        })
            .then((responseJson) => {
            if (responseJson && responseJson.message && !responseJson.invoice) {
                setError({
                    message: responseJson.message
                });
                ui_1.toast.error("Invoice", {
                    description: `Problem happened when generating invoice. ${responseJson.message}`,
                });
                setLoading(false);
                return;
            }
            if (responseJson && responseJson.buffer) {
                updateInvoiceNumber(order.id, responseJson.invoice.displayNumber);
                const anyBuffer = responseJson.buffer;
                const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: 'application/pdf' });
                ui_1.toast.dismiss();
                const pdfURL = URL.createObjectURL(blob);
                window.open(pdfURL, '_blank');
            }
            else {
                ui_1.toast.dismiss();
                ui_1.toast.error("Invoice", {
                    description: responseJson?.message || 'Problem happened when generating invoice',
                });
            }
            setLoading(false);
        })
            .catch((error) => {
            console.error('Invoice generation error:', error);
            setLoading(false);
            ui_1.toast.dismiss();
            const errorMessage = error?.message || error?.response?.data?.message || 'An unexpected error occurred while generating the invoice';
            ui_1.toast.error("Invoice", {
                description: errorMessage,
            });
        });
    }, [isLoading]);
    return ((0, jsx_runtime_1.jsxs)(ui_1.DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [(0, jsx_runtime_1.jsx)(icons_1.FlyingBox, {}), "Generate new invoice"] }));
};
exports.default = GenerateInvoiceDropdownButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdlbmVyYXRlLWludm9pY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9hY3Rpb25zLWRyb3Bkb3duL2ludm9pY2UvYnV0dG9uLWdlbmVyYXRlLWludm9pY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCwyQ0FBMkM7QUFDM0MscUNBQWtEO0FBQ2xELGlDQUE0QztBQUU1QyxNQUFNLDZCQUE2QixHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQTRDLEVBQUUsRUFBRTtJQUVqSCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUUvQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTztRQUNULENBQUM7UUFDRCxLQUFLLENBQUMsMEJBQTBCLEVBQUU7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7YUFDbkIsQ0FBQztTQUNILENBQUM7YUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FB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