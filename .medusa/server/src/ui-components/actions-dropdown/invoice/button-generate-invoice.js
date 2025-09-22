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
            .then((res) => res.json())
            .then((responseJson) => {
            if (responseJson && responseJson.message) {
                setError({
                    message: responseJson.message
                });
                ui_1.toast.error("Invoice", {
                    description: `Problem happened when generating invoice. ${responseJson.message}`,
                });
            }
            else {
                if (responseJson.buffer) {
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
                        description: 'Problem happened when generating invoice',
                    });
                }
            }
            setLoading(false);
        })
            .catch((error) => {
            console.error(error);
            ui_1.toast.dismiss();
            const trueError = error;
            ui_1.toast.error("Invoice", {
                description: trueError?.response?.data?.message,
            });
        });
    }, [isLoading]);
    return ((0, jsx_runtime_1.jsxs)(ui_1.DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [(0, jsx_runtime_1.jsx)(icons_1.FlyingBox, {}), "Generate new invoice"] }));
};
exports.default = GenerateInvoiceDropdownButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdlbmVyYXRlLWludm9pY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9hY3Rpb25zLWRyb3Bkb3duL2ludm9pY2UvYnV0dG9uLWdlbmVyYXRlLWludm9pY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCwyQ0FBMkM7QUFDM0MscUNBQWtEO0FBQ2xELGlDQUE0QztBQUU1QyxNQUFNLDZCQUE2QixHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQTRDLEVBQUUsRUFBRTtJQUVqSCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUUvQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTztRQUNULENBQUM7UUFDRCxLQUFLLENBQUMsMEJBQTBCLEVBQUU7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7YUFDbkIsQ0FBQztTQUNILENBQUM7YUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QixJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNyQixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQztvQkFDUCxPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87aUJBQzlCLENBQUMsQ0FBQztnQkFDSCxVQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDckIsV0FBVyxFQUFFLDZDQUE2QyxZQUFZLENBQUMsT0FBTyxFQUFFO2lCQUNqRixDQUFDLENBQUE7WUFDSixDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3hCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtvQkFDakUsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQWEsQ0FBQztvQkFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBRSxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUcsRUFBRSxFQUFFLElBQUksRUFBRyxpQkFBaUIsRUFBQyxDQUFDLENBQUM7b0JBQ3hGLFVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixVQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hCLFVBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO3dCQUNyQixXQUFXLEVBQUUsMENBQTBDO3FCQUN4RCxDQUFDLENBQUE7Z0JBQ0osQ0FBQztZQUNILENBQUM7WUFDRCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLFVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoQixNQUFNLFNBQVMsR0FBRyxLQUFZLENBQUM7WUFDL0IsVUFBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JCLFdBQVcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPO2FBQ2hELENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtJQUVmLE9BQU8sQ0FDTCx3QkFBQyxpQkFBWSxDQUFDLElBQUksSUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQ3BFLHVCQUFDLGlCQUFTLEtBQUUsNEJBRU0sQ0FDckIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELGtCQUFlLDZCQUE2QixDQUFBIn0=