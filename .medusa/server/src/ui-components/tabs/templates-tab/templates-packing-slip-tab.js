"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackingSlipTemplatesTab = void 0;
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
const ViewExample = ({ kind }) => {
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
        fetch(`/admin/documents/packing-slip/preview?${result.toString()}`, {
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
    return ((0, jsx_runtime_1.jsxs)(ui_2.RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-3", children: [(0, jsx_runtime_1.jsx)(ui_2.RadioGroup.Item, { value: template_kind_1.PackingSlipTemplateKind.BASIC.toString(), id: template_kind_1.PackingSlipTemplateKind.BASIC.toString() }), (0, jsx_runtime_1.jsx)(ui_2.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-x-3", children: [(0, jsx_runtime_1.jsx)(ui_2.RadioGroup.Item, { value: template_kind_1.PackingSlipTemplateKind.BASIC_SMALL.toString(), id: template_kind_1.PackingSlipTemplateKind.BASIC_SMALL.toString() }), (0, jsx_runtime_1.jsx)(ui_2.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic A7" })] })] }));
};
const TemplatesTabContent = ({ lastKind }) => {
    const [templateKind, setTemplateKind] = (0, react_1.useState)(lastKind !== undefined && lastKind !== null ? lastKind : template_kind_1.PackingSlipTemplateKind.BASIC);
    const onSubmit = () => {
        fetch(`/admin/documents/document-packing-slip-settings/template`, {
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
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 3, md: 3, xl: 3, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { children: "Preview is based on the last order" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, md: 12, xl: 12, children: (0, jsx_runtime_1.jsx)(ui_2.Container, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_2.Heading, { level: "h1", children: "Choose template" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ChooseTemplate, { lastKind: templateKind, setKind: setTemplateKind }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_2.Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })] }) }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, md: 6, xl: 6, children: (0, jsx_runtime_1.jsx)(ViewExample, { kind: templateKind }) })] }));
};
const PackingSlipTemplatesTab = () => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/document-packing-slip-settings`, {
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
        return ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 12 }));
    }
    return ((0, jsx_runtime_1.jsx)(TemplatesTabContent, { lastKind: data?.settings?.template }));
};
exports.PackingSlipTemplatesTab = PackingSlipTemplatesTab;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVzLXBhY2tpbmctc2xpcC10YWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy90YWJzL3RlbXBsYXRlcy10YWIvdGVtcGxhdGVzLXBhY2tpbmctc2xpcC10YWIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7OztHQVVHO0FBRUgscUNBQW9DO0FBQ3BDLHFDQUFtRjtBQUNuRixpQ0FBMkM7QUFDM0MsNENBQXVEO0FBQ3ZELDZEQUFvRTtBQUVwRSxNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFtQyxFQUFFLEVBQUU7SUFDL0QsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQWtCLFNBQVMsQ0FBQyxDQUFBO0lBRTVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFNLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBRS9DLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0QixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7SUFFVixJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFO1FBQ2IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFD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