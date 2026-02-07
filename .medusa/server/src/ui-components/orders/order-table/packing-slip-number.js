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
const material_1 = require("@mui/material");
const react_1 = require("react");
const ui_1 = require("@medusajs/ui");
const material_2 = require("@mui/material");
const PackingSlipNumber = ({ orderId, packingSlipNumber }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const handleClick = async () => {
        ui_1.toast.loading("Packing slip", {
            description: "Preparing packing slip...",
            duration: Infinity,
        });
        const result = new URLSearchParams({
            includeBuffer: "true",
            orderId: orderId
        });
        fetch(`/admin/documents/packing-slip?${result.toString()}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            if (result && result.buffer) {
                ui_1.toast.dismiss();
                openPdf(result);
            }
            else {
                ui_1.toast.dismiss();
                ui_1.toast.error("Packing slip", {
                    description: 'Problem happened when preparing packing slip',
                });
            }
        })
            .catch((error) => {
            setError(error);
            console.error(error);
            ui_1.toast.dismiss();
            ui_1.toast.error("Packing slip", {
                description: error,
            });
        });
    };
    const openPdf = (packingSlipResult) => {
        if (packingSlipResult && packingSlipResult.buffer) {
            const anyBuffer = packingSlipResult.buffer;
            const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: 'application/pdf' });
            const pdfURL = URL.createObjectURL(blob);
            window.open(pdfURL, '_blank');
        }
    };
    const result = new URLSearchParams({
        orderId: orderId
    });
    (0, react_1.useEffect)(() => {
        setLoading(true);
    }, [packingSlipNumber]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/packing-slip?${result.toString()}`, {
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
        return ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 8 }));
    }
    ;
    if (data && data.packingSlip) {
        return ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 hover:text-violet-60 cursor-pointer pl-2 transition-colors duration-200", onClick: () => handleClick(), style: {
                    cursor: 'pointer',
                    color: isHovered ? 'violet' : 'grey',
                    textDecoration: isHovered ? 'underline' : 'none',
                    transition: 'color 0.2s, text-decoration 0.2s',
                }, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: `Packing slip: ${data.packingSlip.displayNumber}` }) }));
    }
    else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
};
exports.default = PackingSlipNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2luZy1zbGlwLW51bWJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS9wYWNraW5nLXNsaXAtbnVtYmVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBRUgsNENBQWlEO0FBQ2pELGlDQUE0QztBQUM1QyxxQ0FBb0M7QUFFcEMsNENBQW9DO0FBRXBDLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBa0QsRUFBRSxFQUFFO0lBRTNHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFrQixTQUFTLENBQUMsQ0FBQTtJQUU1RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxNQUFNLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUU5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtRQUM3QixVQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUM1QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFvQixJQUFJLGVBQWUsQ0FBQztZQUNsRCxhQUFhLEVBQUUsTUFBTTtZQUNyQixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUE7UUFFRixLQUFLLENBQUMsaUNBQWlDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO1lBQzFELFdBQVcsRUFBRSxT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