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
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    validateInput: function() {
        return validateInput;
    }
});
const _pdfkit = /*#__PURE__*/ _interop_require_default(require("pdfkit"));
const _customerinfo = require("./parts/musafir/customer-info");
const _table = require("./parts/musafir/table");
const _invoiceinfo = require("./parts/musafir/invoice-info");
const _headerforlogo = require("./parts/musafir/header-for-logo");
const _headerlogo = require("./parts/musafir/header-logo");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function validateInput(settings) {
    if (settings && settings.storeAddress && settings.storeAddress.company && settings.storeAddress.address_1 && settings.storeAddress.city && settings.storeAddress.postal_code && settings.storeLogoSource) return [
        true,
        ''
    ];
    return [
        false,
        `Not all settings are defined to generate template. Following settings are checked: logo, company, address, city, postal_code`
    ];
}
const _default = async (settings, invoice, order)=>{
    var doc = new _pdfkit.default();
    doc.registerFont('Regular', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    await (0, _headerlogo.generateHeaderLogo)(doc, 50, settings.storeLogoSource);
    const endHeader = (0, _headerforlogo.generateHeaderForLogo)(doc, 50, settings);
    const endInvoice = (0, _invoiceinfo.generateInvoiceInformation)(doc, 50, invoice, order);
    let customerInfoStartY = endInvoice;
    if (endInvoice > endHeader) customerInfoStartY = endInvoice;
    else customerInfoStartY = endHeader;
    const endDetails = (0, _customerinfo.generateCustomerInformation)(doc, customerInfoStartY, order);
    (0, _table.generateInvoiceTable)(doc, endDetails, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise((resolve)=>{
        doc.on("end", ()=>{
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvbXVzYWZpci1sb2dvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAyNCBSU0MtTGFicywgaHR0cHM6Ly9yc29mdGNvbi5jb20vXG4gKlxuICogTUlUIExpY2Vuc2VcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7T3JkZXJEVE99IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3R5cGVzXCJcbmltcG9ydCB7RG9jdW1lbnRJbnZvaWNlRFRPLCBEb2N1bWVudFNldHRpbmdzRFRPfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9kdG8nO1xuaW1wb3J0IFBERkRvY3VtZW50IGZyb20gJ3BkZmtpdCc7XG5pbXBvcnQge2dlbmVyYXRlQ3VzdG9tZXJJbmZvcm1hdGlvbn0gZnJvbSBcIi4vcGFydHMvbXVzYWZpci9jdXN0b21lci1pbmZvXCI7XG5pbXBvcnQge2dlbmVyYXRlSW52b2ljZVRhYmxlfSBmcm9tIFwiLi9wYXJ0cy9tdXNhZmlyL3RhYmxlXCI7XG5pbXBvcnQge2dlbmVyYXRlSW52b2ljZUluZm9ybWF0aW9ufSBmcm9tIFwiLi9wYXJ0cy9tdXNhZmlyL2ludm9pY2UtaW5mb1wiO1xuaW1wb3J0IHtnZW5lcmF0ZUhlYWRlckZvckxvZ299IGZyb20gXCIuL3BhcnRzL211c2FmaXIvaGVhZGVyLWZvci1sb2dvXCI7XG5pbXBvcnQge2dlbmVyYXRlSGVhZGVyTG9nb30gZnJvbSBcIi4vcGFydHMvbXVzYWZpci9oZWFkZXItbG9nb1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXQoc2V0dGluZ3M/OiBEb2N1bWVudFNldHRpbmdzRFRPKTogKFtib29sZWFuLCBzdHJpbmddKSB7XG4gICAgaWYgKHNldHRpbmdzICYmIHNldHRpbmdzLnN0b3JlQWRkcmVzcyAmJiBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuY29tcGFueSAmJlxuICAgICAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuYWRkcmVzc18xICYmXG4gICAgICAgIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5jaXR5ICYmXG4gICAgICAgIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5wb3N0YWxfY29kZSAmJlxuICAgICAgICBzZXR0aW5ncy5zdG9yZUxvZ29Tb3VyY2VcbiAgICApIHJldHVybiBbdHJ1ZSwgJyddO1xuICAgIHJldHVybiBbZmFsc2UsIGBOb3QgYWxsIHNldHRpbmdzIGFyZSBkZWZpbmVkIHRvIGdlbmVyYXRlIHRlbXBsYXRlLiBGb2xsb3dpbmcgc2V0dGluZ3MgYXJlIGNoZWNrZWQ6IGxvZ28sIGNvbXBhbnksIGFkZHJlc3MsIGNpdHksIHBvc3RhbF9jb2RlYF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChzZXR0aW5nczogRG9jdW1lbnRTZXR0aW5nc0RUTywgaW52b2ljZTogRG9jdW1lbnRJbnZvaWNlRFRPLCBvcmRlcjogT3JkZXJEVE8pOiBQcm9taXNlPEJ1ZmZlcj4gPT4ge1xuICAgIHZhciBkb2MgPSBuZXcgUERGRG9jdW1lbnQoKTtcbiAgICBkb2MucmVnaXN0ZXJGb250KCdSZWd1bGFyJywgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uL2Fzc2V0cy9mb250cy9JQk1QbGV4U2Fucy1SZWd1bGFyLnR0ZicpKVxuICAgIGRvYy5yZWdpc3RlckZvbnQoJ0JvbGQnLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vYXNzZXRzL2ZvbnRzL0lCTVBsZXhTYW5zLUJvbGQudHRmJykpXG4gICAgZG9jLmZvbnQoJ1JlZ3VsYXInKTtcblxuICAgIGNvbnN0IGJ1ZmZlcnMgPSBbXVxuICAgIGRvYy5vbihcImRhdGFcIiwgYnVmZmVycy5wdXNoLmJpbmQoYnVmZmVycykpXG5cbiAgICBhd2FpdCBnZW5lcmF0ZUhlYWRlckxvZ28oZG9jLCA1MCwgc2V0dGluZ3Muc3RvcmVMb2dvU291cmNlISk7XG4gICAgY29uc3QgZW5kSGVhZGVyID0gZ2VuZXJhdGVIZWFkZXJGb3JMb2dvKGRvYywgNTAsIHNldHRpbmdzKTtcbiAgICBjb25zdCBlbmRJbnZvaWNlID0gZ2VuZXJhdGVJbnZvaWNlSW5mb3JtYXRpb24oZG9jLCA1MCwgaW52b2ljZSwgb3JkZXIpO1xuICAgIGxldCBjdXN0b21lckluZm9TdGFydFkgPSBlbmRJbnZvaWNlO1xuICAgIGlmIChlbmRJbnZvaWNlID4gZW5kSGVhZGVyKVxuICAgICAgICBjdXN0b21lckluZm9TdGFydFkgPSBlbmRJbnZvaWNlXG4gICAgZWxzZVxuICAgICAgICBjdXN0b21lckluZm9TdGFydFkgPSBlbmRIZWFkZXI7XG5cbiAgICBjb25zdCBlbmREZXRhaWxzID0gZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uKGRvYywgY3VzdG9tZXJJbmZvU3RhcnRZLCBvcmRlcik7XG4gICAgZ2VuZXJhdGVJbnZvaWNlVGFibGUoZG9jLCBlbmREZXRhaWxzLCBvcmRlciwgb3JkZXIuaXRlbXMgfHwgW10pO1xuXG4gICAgZG9jLmVuZCgpO1xuXG4gICAgY29uc3QgYnVmZmVyUHJvbWlzZSA9IG5ldyBQcm9taXNlPEJ1ZmZlcj4ocmVzb2x2ZSA9PiB7XG4gICAgICAgIGRvYy5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwZGZEYXRhID0gQnVmZmVyLmNvbmNhdChidWZmZXJzKVxuICAgICAgICAgICAgcmVzb2x2ZShwZGZEYXRhKVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXdhaXQgYnVmZmVyUHJvbWlzZTtcbn07XG4iXSwibmFtZXMiOlsidmFsaWRhdGVJbnB1dCIsInNldHRpbmdzIiwic3RvcmVBZGRyZXNzIiwiY29tcGFueSIsImFkZHJlc3NfMSIsImNpdHkiLCJwb3N0YWxfY29kZSIsInN0b3JlTG9nb1NvdXJjZSIsImludm9pY2UiLCJvcmRlciIsImRvYyIsIlBERkRvY3VtZW50IiwicmVnaXN0ZXJGb250IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJmb250IiwiYnVmZmVycyIsIm9uIiwicHVzaCIsImJpbmQiLCJnZW5lcmF0ZUhlYWRlckxvZ28iLCJlbmRIZWFkZXIiLCJnZW5lcmF0ZUhlYWRlckZvckxvZ28iLCJlbmRJbnZvaWNlIiwiZ2VuZXJhdGVJbnZvaWNlSW5mb3JtYXRpb24iLCJjdXN0b21lckluZm9TdGFydFkiLCJlbmREZXRhaWxzIiwiZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uIiwiZ2VuZXJhdGVJbnZvaWNlVGFibGUiLCJpdGVtcyIsImVuZCIsImJ1ZmZlclByb21pc2UiLCJQcm9taXNlIiwicGRmRGF0YSIsIkJ1ZmZlciIsImNvbmNhdCJdLCJyYW5nZU1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztDQVVDOzs7Ozs7Ozs7OztJQXNCRCxPQStCRTtlQS9CRjs7SUFWZ0JBLGFBQWE7ZUFBYkE7OzsrREFSUTs4QkFDa0I7dUJBQ1A7NkJBQ007K0JBQ0w7NEJBQ0g7NkRBQ2hCOzs7Ozs7QUFFVixTQUFTQSxjQUFjQyxRQUE4QjtJQUN4RCxJQUFJQSxZQUFZQSxTQUFTQyxZQUFZLElBQUlELFNBQVNDLFlBQVksQ0FBQ0MsT0FBTyxJQUNsRUYsU0FBU0MsWUFBWSxDQUFDRSxTQUFTLElBQy9CSCxTQUFTQyxZQUFZLENBQUNHLElBQUksSUFDMUJKLFNBQVNDLFlBQVksQ0FBQ0ksV0FBVyxJQUNqQ0wsU0FBU00sZUFBZSxFQUMxQixPQUFPO1FBQUM7UUFBTTtLQUFHO0lBQ25CLE9BQU87UUFBQztRQUFPLENBQUMsNEhBQTRILENBQUM7S0FBQztBQUNsSjtNQUVBLFdBQWUsT0FBT04sVUFBK0JPLFNBQTZCQztJQUM5RSxJQUFJQyxNQUFNLElBQUlDLGVBQVc7SUFDekJELElBQUlFLFlBQVksQ0FBQyxXQUFXQyxhQUFJLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVztJQUNwREwsSUFBSUUsWUFBWSxDQUFDLFFBQVFDLGFBQUksQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXO0lBQ2pETCxJQUFJTSxJQUFJLENBQUM7SUFFVCxNQUFNQyxVQUFVLEVBQUU7SUFDbEJQLElBQUlRLEVBQUUsQ0FBQyxRQUFRRCxRQUFRRSxJQUFJLENBQUNDLElBQUksQ0FBQ0g7SUFFakMsTUFBTUksSUFBQUEsOEJBQWtCLEVBQUNYLEtBQUssSUFBSVQsU0FBU00sZUFBZTtJQUMxRCxNQUFNZSxZQUFZQyxJQUFBQSxvQ0FBcUIsRUFBQ2IsS0FBSyxJQUFJVDtJQUNqRCxNQUFNdUIsYUFBYUMsSUFBQUEsdUNBQTBCLEVBQUNmLEtBQUssSUFBSUYsU0FBU0M7SUFDaEUsSUFBSWlCLHFCQUFxQkY7SUFDekIsSUFBSUEsYUFBYUYsV0FDYkkscUJBQXFCRjtTQUVyQkUscUJBQXFCSjtJQUV6QixNQUFNSyxhQUFhQyxJQUFBQSx5Q0FBMkIsRUFBQ2xCLEtBQUtnQixvQkFBb0JqQjtJQUN4RW9CLElBQUFBLDJCQUFvQixFQUFDbkIsS0FBS2lCLFlBQVlsQixPQUFPQSxNQUFNcUIsS0FBSyxJQUFJLEVBQUU7SUFFOURwQixJQUFJcUIsR0FBRztJQUVQLE1BQU1DLGdCQUFnQixJQUFJQyxRQUFnQm5CLENBQUFBO1FBQ3RDSixJQUFJUSxFQUFFLENBQUMsT0FBTztZQUNWLE1BQU1nQixVQUFVQyxPQUFPQyxNQUFNLENBQUNuQjtZQUM5QkgsUUFBUW9CO1FBQ1o7SUFDSjtJQUVBLE9BQU8sTUFBTUY7QUFDakIifQ==