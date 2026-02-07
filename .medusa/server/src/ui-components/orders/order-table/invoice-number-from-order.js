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
const react_1 = require("react");
const material_1 = require("@mui/material");
const material_2 = require("@mui/material");
const ui_1 = require("@medusajs/ui");
const InvoiceNumberFromOrder = ({ orderId, invoiceNumber }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const handleClick = async () => {
        ui_1.toast.loading("Invoice", {
            description: "Preparing invoice...",
            duration: Infinity,
        });
        const result = new URLSearchParams({
            includeBuffer: "true",
            orderId: orderId
        });
        fetch(`/admin/documents/invoice?${result.toString()}`, {
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
                ui_1.toast.error("Invoice", {
                    description: 'Problem happened when preparing invoice',
                });
            }
        })
            .catch((error) => {
            setError(error);
            console.error(error);
            ui_1.toast.dismiss();
            ui_1.toast.error("Invoice", {
                description: error,
            });
        });
    };
    const openPdf = (invoiceResult) => {
        if (invoiceResult && invoiceResult.buffer) {
            const anyBuffer = invoiceResult.buffer;
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
    }, [invoiceNumber]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/invoice?${result.toString()}`, {
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
        return ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 8 }) }));
    }
    ;
    if (data && data.invoice) {
        return ((0, jsx_runtime_1.jsx)(material_2.Grid, { item: true, children: (0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 hover:text-violet-60 cursor-pointer pl-2 transition-colors duration-200", onClick: () => handleClick(), style: {
                    cursor: 'pointer',
                    color: isHovered ? 'violet' : 'grey',
                    textDecoration: isHovered ? 'underline' : 'none',
                    transition: 'color 0.2s, text-decoration 0.2s',
                }, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: `Invoice: ${data.invoice.displayNumber}` }) }));
    }
    else {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
};
exports.default = InvoiceNumberFromOrder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1udW1iZXItZnJvbS1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS9pbnZvaWNlLW51bWJlci1mcm9tLW9yZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBRUgsaUNBQTRDO0FBQzVDLDRDQUFpRDtBQUNqRCw0Q0FBb0M7QUFDcEMscUNBQW9DO0FBR3BDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQThDLEVBQUUsRUFBRTtJQUV4RyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBa0IsU0FBUyxDQUFDLENBQUE7SUFFNUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQU0sU0FBUyxDQUFDLENBQUM7SUFFbkQsTUFBTSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFFbEQsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFOUMsTUFBTSxXQUFXLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDN0IsVUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7WUFDdkIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBb0IsSUFBSSxlQUFlLENBQUM7WUFDbEQsYUFBYSxFQUFFLE1BQU07WUFDckIsT0FBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFBO1FBRUYsS0FBSyxDQUFDLDRCQUE0QixNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxX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