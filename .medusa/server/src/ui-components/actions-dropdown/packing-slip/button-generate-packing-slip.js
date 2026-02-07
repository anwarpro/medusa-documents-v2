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
const GeneratePackingSlipDropdownButton = ({ order, updatePackingSlipNumber }) => {
    const [isLoading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(undefined);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/packing-slip`, {
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
                ui_1.toast.error("Packing slip", {
                    description: `Problem happened when generating packing slip. ${responseJson.message}`,
                });
            }
            else {
                if (responseJson.buffer) {
                    updatePackingSlipNumber(order.id, responseJson.packingSlip.displayNumber);
                    const anyBuffer = responseJson.buffer;
                    const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: 'application/pdf' });
                    ui_1.toast.dismiss();
                    const pdfURL = URL.createObjectURL(blob);
                    window.open(pdfURL, '_blank');
                }
                else {
                    ui_1.toast.dismiss();
                    ui_1.toast.error("Packing slip", {
                        description: 'Problem happened when generating packing slip',
                    });
                }
            }
            setLoading(false);
        })
            .catch((error) => {
            console.error(error);
            ui_1.toast.dismiss();
            const trueError = error;
            ui_1.toast.error("Packing slip", {
                description: trueError?.response?.data?.message,
            });
        });
    }, [isLoading]);
    return ((0, jsx_runtime_1.jsxs)(ui_1.DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [(0, jsx_runtime_1.jsx)(icons_1.FlyingBox, {}), "Generate new packing slip"] }));
};
exports.default = GeneratePackingSlipDropdownButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdlbmVyYXRlLXBhY2tpbmctc2xpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL2FjdGlvbnMtZHJvcGRvd24vcGFja2luZy1zbGlwL2J1dHRvbi1nZW5lcmF0ZS1wYWNraW5nLXNsaXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCwyQ0FBMkM7QUFDM0MscUNBQWtEO0FBQ2xELGlDQUE0QztBQUU1QyxNQUFNLGlDQUFpQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQWdELEVBQUUsRUFBRTtJQUU3SCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQTtJQUUvQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTztRQUNULENBQUM7UUFDRCxLQUFLLENBQUMsK0JBQStCLEVBQUU7WUFDckMsTUFBTSxFQUFFLE1BQU07WUFDZCxXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7YUFDbkIsQ0FBQztTQUNILENBQUM7YUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QixJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNyQixJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pDLFVBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFO29CQUMxQixXQUFXLEVBQUUsa0RBQWtELFlBQVksQ0FBQyxPQUFPLEVBQUU7aUJBQ3RGLENBQUMsQ0FBQTtZQUNKLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEIsdUJBQXVCLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO29CQUN6RSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsTUFBYSxDQUFDO29CQUM3QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFFLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFHLGlCQUFpQixFQUFDLENBQUMsQ0FBQztvQkFDeEYsVUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNoQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLFVBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDaEIsVUFBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7d0JBQzFCLFdBQVcsRUFBRSwrQ0FBK0M7cUJBQzdELENBQUMsQ0FBQTtnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUNELFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsVUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hCLE1BQU0sU0FBUyxHQUFHLEtBQVksQ0FBQztZQUMvQixVQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRTtnQkFDMUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU87YUFDaEQsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBRWYsT0FBTyxDQUNMLHdCQUFDLGlCQUFZLENBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFDcEUsdUJBQUMsaUJBQVMsS0FBRSxpQ0FFTSxDQUNyQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsaUNBQWlDLENBQUEifQ==