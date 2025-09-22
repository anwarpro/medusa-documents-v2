"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const react_hook_form_1 = require("react-hook-form");
const ui_2 = require("@medusajs/ui");
const react_1 = require("react");
const settings_invoice_display_number_1 = __importDefault(require("./settings-invoice-display-number"));
const InvoiceSettingsForm = ({ invoiceSettings, setOpenModal }) => {
    const { register, handleSubmit, formState: { errors } } = (0, react_hook_form_1.useForm)();
    const [formatNumber, setFormatNumber] = (0, react_1.useState)(invoiceSettings?.numberFormat);
    const [forcedNumber, setForcedNumber] = (0, react_1.useState)(invoiceSettings?.forcedNumber);
    const [error, setError] = (0, react_1.useState)(undefined);
    const onSubmit = (data) => {
        fetch(`/admin/documents/document-invoice-settings`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                formatNumber: data.formatNumber,
                forcedNumber: data.forcedNumber !== undefined && data.forcedNumber.toString().length ? data.forcedNumber : undefined
            })
        })
            .then(async (response) => {
            if (response.ok) {
                ui_2.toast.success('Invoice settings', {
                    description: "New invoice settings saved",
                });
                setOpenModal(false);
            }
            else {
                const error = await response.json();
                ui_2.toast.error('Invoice settings', {
                    description: `New invoice settings cannot be saved, some error happened. ${error.message}`,
                });
            }
        })
            .catch((e) => {
            ui_2.toast.error('Invoice settings', {
                description: `New invoice settings cannot be saved, some error happened. ${e.toString()}`,
            });
            console.error(e);
        });
    };
    const INVOICE_NUMBER_PLACEHOLDER = '{invoice_number}';
    const errorText = `Text ${INVOICE_NUMBER_PLACEHOLDER} needs to be included in input.`;
    const LABEL_MUST_FORMAT = `Format must include ${INVOICE_NUMBER_PLACEHOLDER}`;
    const LABEL_MUST_FORCED = `Forced number must be a number`;
    const LABEL_INFO_FORCED = `It will auto-increment starting from this number.`;
    const validateFormatNumber = (value) => {
        if (!value.includes(INVOICE_NUMBER_PLACEHOLDER)) {
            return LABEL_MUST_FORMAT;
        }
        return true;
    };
    const validateForcedNumber = (value) => {
        if (value.length && isNaN(Number(value))) {
            return LABEL_MUST_FORCED;
        }
        return true;
    };
    return ((0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', rowSpacing: 4, paddingTop: 8, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Number format" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: 'xsmall', children: LABEL_MUST_FORMAT }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: INVOICE_NUMBER_PLACEHOLDER, defaultValue: invoiceSettings?.numberFormat ? invoiceSettings.numberFormat : INVOICE_NUMBER_PLACEHOLDER, ...register('formatNumber', {
                                    validate: validateFormatNumber,
                                    onChange(e) {
                                        const value = e.target.value;
                                        if (typeof validateFormatNumber(value) === 'string') {
                                            const result = validateFormatNumber(value);
                                            setError(result);
                                        }
                                        else {
                                            setError(undefined);
                                            setFormatNumber(value);
                                        }
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Forced number" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: 'xsmall', children: LABEL_INFO_FORCED }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { defaultValue: invoiceSettings?.forcedNumber !== undefined && invoiceSettings.forcedNumber !== null
                                    ? invoiceSettings.forcedNumber : '', type: "number", ...register('forcedNumber', {
                                    validate: validateForcedNumber,
                                    onChange(e) {
                                        const value = e.target.value;
                                        if (typeof validateForcedNumber(value) === 'string') {
                                            const result = validateForcedNumber(value);
                                            setError(result);
                                        }
                                        else {
                                            setError(undefined);
                                            setForcedNumber(value);
                                        }
                                    },
                                }) }) })] }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Your next invoice number will be:" }) }), errors.formatNumber == undefined && errors.forcedNumber == undefined && error == undefined && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(settings_invoice_display_number_1.default, { formatNumber: formatNumber, forcedNumber: forcedNumber !== undefined && forcedNumber !== null ? parseInt(forcedNumber) : undefined }) })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { type: "submit", variant: 'primary', onClick: handleSubmit(onSubmit), children: "Save" }) }), (errors.formatNumber || errors.forcedNumber) && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: errorText }) }), error && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Alert, { variant: "error", children: error }) })] }) }));
};
const InvoiceSettingsModalDetails = ({ setOpenModal }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
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
    }, [isLoading]);
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) }));
    }
    return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', alignContent: 'center', paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Heading, { children: "Invoice settings" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "These settings will be applied for newly generated invoices." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(InvoiceSettingsForm, { invoiceSettings: data?.settings, setOpenModal: setOpenModal }) })] }) }));
};
const InvoiceSettingsModal = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(ui_1.FocusModal, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { children: "Change settings" }) }), (0, jsx_runtime_1.jsxs)(ui_1.FocusModal.Content, { children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Header, {}), (0, jsx_runtime_1.jsx)(InvoiceSettingsModalDetails, { setOpenModal: setOpen })] })] }));
};
exports.default = InvoiceSettingsModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtaW52b2ljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWludm9pY2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBcUY7QUFDckYsNENBQXVEO0FBQ3ZELHFEQUEwQztBQUMxQyxxQ0FBcUM7QUFDckMsaUNBQTRDO0FBRTVDLHdHQUE2RTtBQU83RSxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFtRSxFQUFFLEVBQUU7SUFFakksTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRyxJQUFBLHlCQUFPLEdBQW1CLENBQUE7SUFDcEYsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ2hGLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNoRixNQUFNLENBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBRSxHQUFHLElBQUEsZ0JBQVEsRUFBcUIsU0FBUyxDQUFDLENBQUM7SUFFcEUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUU7UUFDekMsS0FBSyxDQUFDLDRDQUE0QyxFQUFFO1lBQ2xELE1BQU0sRUFBRSxNQUFNO1lBQ2QsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO2dCQUMvQixZQUFZLEVBQUUsSUFBSSxD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