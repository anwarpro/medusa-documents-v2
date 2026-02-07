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
const AddressField = ({ name, placeholder, initValue, register }) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', spacing: 1, marginTop: 2, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Label, { size: "small", children: name }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Input, { placeholder: placeholder, ...register, defaultValue: initValue }) })] }));
};
const AddressForm = ({ address, setOpenModal }) => {
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => {
        fetch(`/admin/documents/document-settings/document-address`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: data
            })
        })
            .then(async (response) => {
            if (response.ok) {
                ui_2.toast.success('Address', {
                    description: "New address saved",
                });
                setOpenModal(false);
            }
            else {
                const error = await response.json();
                ui_2.toast.error('Address', {
                    description: `Address cannot be saved. ${error.message}`,
                });
            }
        })
            .catch((e) => {
            ui_2.toast.error('Address', {
                description: `Address cannot be saved. ${e.toString()}`,
            });
            console.error(e);
        });
    };
    return ((0, jsx_runtime_1.jsx)("form", { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', rowSpacing: 4, paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(AddressField, { name: "Company name", placeholder: 'My store', register: register('company'), initValue: address?.company }), (0, jsx_runtime_1.jsx)(AddressField, { name: "First name", placeholder: 'John', register: register('first_name'), initValue: address?.first_name }), (0, jsx_runtime_1.jsx)(AddressField, { name: "Last name", placeholder: 'Doe', register: register('last_name'), initValue: address?.last_name }), (0, jsx_runtime_1.jsx)(AddressField, { name: "Address", placeholder: '56 Street', register: register('address_1'), initValue: address?.address_1 }), (0, jsx_runtime_1.jsx)(AddressField, { name: "City", placeholder: 'Warsaw', register: register('city'), initValue: address?.city }), (0, jsx_runtime_1.jsx)(AddressField, { name: "Postal code", placeholder: '55-200', register: register('postal_code'), initValue: address?.postal_code }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { type: "submit", variant: 'primary', onClick: handleSubmit(onSubmit), children: "Save" }) })] }) }));
};
const AddressModalDetails = ({ setOpenModal }) => {
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
    return ((0, jsx_runtime_1.jsx)(ui_1.FocusModal.Body, { children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, direction: 'column', alignContent: 'center', paddingTop: 8, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Heading, { children: "Store address" }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "This address will be used on your documents." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: "Presence of field on document depends on template." }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(AddressForm, { address: data?.settings?.storeAddress, setOpenModal: setOpenModal }) })] }) }));
};
const AddressChangeModal = () => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(ui_1.FocusModal, { open: open, onOpenChange: setOpen, children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.Button, { children: "Change address" }) }), (0, jsx_runtime_1.jsxs)(ui_1.FocusModal.Content, { children: [(0, jsx_runtime_1.jsx)(ui_1.FocusModal.Header, {}), (0, jsx_runtime_1.jsx)(AddressModalDetails, { setOpenModal: setOpen })] })] }));
};
exports.default = AddressChangeModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MtYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWFkZHJlc3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFFSCxxQ0FBOEU7QUFDOUUsNENBQXVEO0FBQ3ZELHFEQUEwQztBQUMxQyxxQ0FBcUM7QUFDckMsaUNBQTRDO0FBRzVDLE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQTJFLEVBQUUsRUFBRTtJQUMzSSxPQUFPLENBQ0wsd0JBQUMsZUFBSSxJQUFDLFNBQVMsUUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsYUFDM0QsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUFDLElBQUksRUFBQyxPQUFPLFlBQ2hCLElBQUksR0FDQyxHQUNILEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsVUFBSyxJQUNKLFdBQVcsRUFBRSxXQUFXLEtBQ3BCLFFBQVEsRUFDWixZQUFZLEVBQUUsU0FBUyxHQUN2QixHQUNHLElBQ0YsQ0FDUixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQW1ELEVBQUUsRUFBRTtJQUVqRyxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUEseUJBQU8sR0FBbUIsQ0FBQTtJQUU3RCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQXFCLEVBQUUsRUFBRTtRQUN6QyxLQUFLLENBQUMscURBQXFELEVBQUU7WUFDM0QsTUFBTSxFQUFFLE1BQU07WUFDZCxXQUFXLEVBQUUsU0FBUztZQUN0QixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUM7U0FDSCxDQUFDO2FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUN2QixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDaEIsVUFBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7b0JBQ3ZCLFdBQVcsRUFBRSxtQkFBbUI7aUJBQ2pDLENBQUMsQ0FBQztnQkFDSCxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE1BQU0sS0FBSyxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQyxVQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtvQkFDckIsV0FBVyxFQUFFLDRCQUE0QixLQUFLLENBQUMsT0FBTyxFQUFFO2lCQUN6RCxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDWCxVQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDckIsV0FBVyxFQUFFLDRCQUE0QixDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7YUFDeEQsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQTtJQUVELE9BQU8sQ0FDTCwyQ0FDRSx3QkFBQyxlQUFJLElBQUMsU0FBUyxRQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxhQUMvRCx1QkFBQyxZQUFZLElBQ1gsSUFBSSxFQUFDLGNBQWMsRUFDbkIsV0FBVyxFQUFDLFVBQVUsRUFDdEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDN0IsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQzNCLEVBQ0YsdUJBQUMsWUFBWSxJQUNYLElBQUksRUFBQyxZQUFZLEVBQ2pCLFdBQVcsRUFBQyxNQUFNLEVBQ2xCLFFBQVEsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQ2hDLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxHQUM5QixFQUNGLHVCQUFDLFlBQVksSUFDWCxJQUFJLEVBQUMsV0FBVyxFQUNoQixXQUFXLEVBQUMsS0FBSyxFQUNqQixRQUFRLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUMvQixTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FDN0IsRUFDRix1QkFBQyxZQUFZLElBQ1gsSUFBSSxFQUFDLFNBQVMsRUFDZCxXQUFXLEVBQUMsV0FBVyxFQUN2QixRQUFRLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUMvQixTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FDN0IsRUFDRix1QkFBQyxZQUFZLElBQ1gsSUFBSSxFQUFDLE1BQU0sRUFDWCxXQUFXLEVBQUMsUUFBUSxFQUNwQixRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUMxQixTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksR0FDeEIsRUFDRix1QkFBQyxZQUFZLElBQ1gsSUFBSSxFQUFDLGFBQWEsRUFDbEIsV0FBVyxFQUFDLFFBQVEsRUFDcEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDakMsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXLEdBQy9CLEVBQ0YsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsV0FBTSxJQUNMLElBQUksRUFBQyxRQUFRLEVBQ2IsT0FBTyxFQUFFLFNBQVMsRUFDbEIsT0FBTyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMscUJBR3hCLEdBQ0osSUFDRixHQUNGLENBQ1IsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxFQUFFLEVBQUU7SUFFL0MsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQWtCLFNBQVMsQ0FBQyxDQUFBO0lBRTVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFNLFNBQVMsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRTlDLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELEtBQUssQ0FBQyxvQ0FBb0MsRUFBRTtZQUMxQyxXQUFXLEVBQUUsU0FBUztTQUN2QixDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDekIsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDZixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7SUFFZixJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUNMLHVCQUFDLGVBQVUsQ0FBQyxJQUFJLGNBQ2QsdUJBQUMsMkJBQWdCLEtBQUUsR0FDSCxDQUNuQixDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FDTCx1QkFBQyxlQUFVLENBQUMsSUFBSSxjQUNkLHdCQUFDLGVBQUksSUFBQyxTQUFTLFFBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLGFBQ3hFLHVCQUFDLGVBQUksSUFBQyxJQUFJLGtCQUNSLHVCQUFDLFlBQU8sZ0NBQXdCLEdBQzNCLEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsU0FBSSwrREFFRSxHQUNGLEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsU0FBSSxxRUFFRSxHQUNGLEVBQ1AsdUJBQUMsZUFBSSxJQUFDLElBQUksa0JBQ1IsdUJBQUMsV0FBVyxJQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxHQUFHLEdBQzVFLElBQ0YsR0FDUyxDQUNuQixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7SUFDOUIsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLENBQUE7SUFFdkMsT0FBTyxDQUNMLHdCQUFDLGVBQVUsSUFDVCxJQUFJLEVBQUUsSUFBSSxFQUNWLFlBQVksRUFBRSxPQUFPLGFBRXJCLHVCQUFDLGVBQVUsQ0FBQyxPQUFPLElBQUMsT0FBTyxrQkFDekIsdUJBQUMsV0FBTSxpQ0FBd0IsR0FDWixFQUNyQix3QkFBQyxlQUFVLENBQUMsT0FBTyxlQUNqQix1QkFBQyxlQUFVLENBQUMsTUFBTSxLQUFFLEVBQ3BCLHVCQUFDLG1CQUFtQixJQUFDLFlBQVksRUFBRSxPQUFPLEdBQUcsSUFDMUIsSUFDVixDQUNkLENBQUE7QUFDSCxDQUFDLENBQUE7QUFHRCxrQkFBZSxrQkFBa0IsQ0FBQSJ9