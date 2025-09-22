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
const react_hook_form_1 = require("react-hook-form");
const ui_2 = require("@medusajs/ui");
const react_1 = require("react");
const LogoFields = ({ logoSource, register }) => {
    const [logoUrl, setLogoUrl] = (0, react_1.useState)(logoSource);
    const [isValidUrl, setIsValidUrl] = (0, react_1.useState)(true);
    const [imgLoaded, setIsImageLoaded] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(undefined);
    const handleInputChange = (event) => {
        setLogoUrl(event.target.value);
        setIsValidUrl(true);
    };
    const handleImageError = () => {
        setIsValidUrl(false);
        setIsImageLoaded(false);
    };
    const handleOnLoad = (event) => {
        setIsImageLoaded(true);
    };
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: "Link to logo" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: 'https://raw.githubusercontent.com/RSC-Labs/medusa-store-analytics/main/docs/store-analytics-logo.PNG', ...register, defaultValue: logoSource, onChange: handleInputChange }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, justifyContent: 'center', alignContent: 'center', marginTop: 5, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)("div", { style: { height: '200px', width: '300px', overflow: 'hidden', border: imgLoaded ? undefined : "1px solid rgba(0, 0, 0, 0.12)" }, children: logoUrl && isValidUrl && (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, textAlign: 'center', children: (0, jsx_runtime_1.jsx)("img", { src: logoUrl, alt: "Preview", style: { maxWidth: 300, maxHeight: 200 }, onLoad: handleOnLoad, onError: handleImageError }) }) }) }) })] }));
};
const LogoForm = ({ logoSource, setOpenModal }) => {
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => {
        fetch(`/admin/documents/document-settings/logo`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                logoSource: data.logoSource,
            })
        })
            .then(async (response) => {
            if (response.ok) {
                ui_2.toast.success('Logo', {
                    description: "New logo saved",
                });
                setOpenModal(false);
            }
            else {
                const error = await response.json();
                ui_2.toast.error('Logo', {
                    description: `Logo cannot be saved, some error happened. ${error.message}`,
                });
                ui_2.toast.error('Invoice settings', {
                    description: `New invoice settings cannot be saved, some error happened.`,
                });
            }
        })
            .catch((e) => {
            ui_2.toast.error('Logo', {
                description: `Logo cannot be saved, some error happened. ${e.toString()}`,
            });
            console.error(e);
        });
    };
    return ((0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', rowSpacing: 4, paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(LogoFields, { logoSource: logoSource, register: register('logoSource') }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { type: "submit", variant: 'primary', onClick: handleSubmit(onSubmit), children: "Save" }) })] }) }));
};
const LogoModalDetails = ({ setOpenModal }) => {
    const [data, setData] = (0, react_1.useState)(undefined);
    const [error, setError] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/documents/document-settings`, {
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
    return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', alignContent: 'center', paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Heading, { children: "Store logo" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "This logo will be used on your documents." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "Presence of logo on document depends on template." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(LogoForm, { logoSource: data.settings && data.settings.storeLogoSource ? data.settings.storeLogoSource : undefined, setOpenModal: setOpenModal }) })] }) }));
};
const LogoChangeModal = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(ui_1.FocusModal, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { children: "Change logo" }) }), (0, jsx_runtime_1.jsxs)(ui_1.FocusModal.Content, { children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Header, {}), (0, jsx_runtime_1.jsx)(LogoModalDetails, { setOpenModal: setOpen })] })] }));
};
exports.default = LogoChangeModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtbG9nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWxvZ28udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBOEU7QUFDOUUsNENBQXVEO0FBQ3ZELHFEQUEwQztBQUMxQyxxQ0FBcUM7QUFDckMsaUNBQTRDO0FBRTVDLE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUF5QyxFQUFFLEVBQUU7SUFDckYsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUV0RCxNQUFNLENBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBRSxHQUFHLElBQUEsZ0JBQVEsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUVoRCxNQUFNLGlCQUFpQixHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDbEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQztJQUVGLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxFQUFFO1FBQzVCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQzdCLGdCQUFnQixDQUFD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