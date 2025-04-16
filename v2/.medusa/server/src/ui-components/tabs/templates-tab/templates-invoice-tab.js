"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceTemplatesTab = void 0;
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
const ui_2 = require("@medusajs/ui");
const react_1 = require("react");
const material_1 = require("@mui/material");
const template_kind_1 = require("../../types/template-kind");
const ViewExampleInvoice = ({ kind }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const [lastKind, setLastKind] = (0, react_1.useState)(kind);
    (0, react_1.useEffect)(() => {
        if (lastKind !== kind) {
            setLastKind(kind);
            if (!isLoading) {
                setLoading(true);
            }
        }
    }, [kind]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        const result = new URLSearchParams({
            template: kind
        });
        fetch(`/admin/documents/invoice/generate?${result.toString()}`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            if (result && result.message) {
                setError({
                    message: result.message
                });
            }
            else {
                ui_2.toast.dismiss();
                setError(undefined);
                setData(result);
            }
            setLoading(false);
        })
            .catch((error) => {
            setError(error);
            console.error(error);
        });
    }, [isLoading]);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, justifyContent: 'center', children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 12 }) }) }));
    }
    if (error) {
        const trueError = error;
        if (trueError.response?.data?.message || trueError.message) {
            if (trueError.message) {
                return ((0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: trueError.message }));
            }
            return ((0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: trueError.response.data.message }));
        }
        else {
            return ((0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: "Preview can't be generated" }));
        }
    }
    if (data && data.buffer) {
        const anyBuffer = data.buffer;
        const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: 'application/pdf' });
        const pdfURL = URL.createObjectURL(blob);
        return ((0, jsx_runtime_1.jsx)("iframe", { src: pdfURL, width: 660, height: 1000 }));
    }
    else {
        return ((0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: "Preview can't be generated" }));
    }
};
const ChooseTemplate = (props) => {
    const handleChange = (checked) => {
        props.setKind(checked);
    };
    return ((0, jsx_runtime_1.jsxs)(ui_2.RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-3", children: [(0, jsx_runtime_1.jsx)(ui_2.RadioGroup.Item, { value: template_kind_1.InvoiceTemplateKind.BASIC.toString(), id: template_kind_1.InvoiceTemplateKind.BASIC.toString() }), (0, jsx_runtime_1.jsx)(ui_2.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-3", children: [(0, jsx_runtime_1.jsx)(ui_2.RadioGroup.Item, { value: template_kind_1.InvoiceTemplateKind.BASIC_LOGO.toString(), id: template_kind_1.InvoiceTemplateKind.BASIC_LOGO.toString() }), (0, jsx_runtime_1.jsx)(ui_2.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic with logo" })] })] }));
};
const TemplatesTabContent = ({ lastKind }) => {
    const [templateKind, setTemplateKind] = (0, react_1.useState)(lastKind !== undefined && lastKind !== null ? lastKind : template_kind_1.InvoiceTemplateKind.BASIC);
    const onSubmit = () => {
        fetch(`/admin/documents/document-invoice-settings/invoice-template`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                template: templateKind
            })
        })
            .then(async (response) => {
            if (response.ok) {
                ui_2.toast.success('Template', {
                    description: "New template saved",
                });
            }
            else {
                const error = await response.json();
                ui_2.toast.error('Template', {
                    description: `New template cannot be saved, some error happened. ${error.message}`,
                });
            }
        })
            .catch((e) => {
            ui_2.toast.error('Template', {
                description: `New template cannot be saved, some error happened. ${e.toString()}`,
            });
            console.error(e);
        });
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, md: 3, xl: 3, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { children: "Preview is based on the last order" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ui_2.Container, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_2.Heading, { level: "h1", children: "Choose template" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ChooseTemplate, { lastKind: templateKind, setKind: setTemplateKind }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_2.Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })] }) }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, md: 6, xl: 6, children: (0, jsx_runtime_1.jsx)(ViewExampleInvoice, { kind: templateKind }) })] }));
};
const InvoiceTemplatesTab = () => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        fetch(`/admin/documents/document-invoice-settings`, {
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
    }, []);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 12 }));
    }
    return ((0, jsx_runtime_1.jsx)(TemplatesTabContent, { lastKind: data?.settings?.template }));
};
exports.InvoiceTemplatesTab = InvoiceTemplatesTab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLWludm9pY2UtdGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3VpLWNvbXBvbmVudHMvdGFicy90ZW1wbGF0ZXMtdGFiL3RlbXBsYXRlcy1pbnZvaWNlLXRhYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBb0M7QUFDcEMscUNBQW1GO0FBQ25GLGlDQUEyQztBQUMzQyw0Q0FBdUQ7QUFDdkQsNkRBQWdFO0FBRWhFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFDLElBQUksRUFBK0IsRUFBRSxFQUFFO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFrQixTQUFTLENBQUMsQ0FBQTtJQUU1RCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBTSxTQUFTLENBQUMsQ0FBQztJQUVuRCxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUUvQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkIsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBRVYsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE9B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