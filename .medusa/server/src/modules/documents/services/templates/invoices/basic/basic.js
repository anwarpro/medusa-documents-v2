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
const _header = require("./parts/header");
const _customerinfo = require("./parts/customer-info");
const _table = require("./parts/table");
const _invoiceinfo = require("./parts/invoice-info");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function validateInput(settings) {
    if (settings && settings.storeAddress && settings.storeAddress.company && settings.storeAddress.address_1 && settings.storeAddress.city && settings.storeAddress.postal_code) return [
        true,
        ''
    ];
    return [
        false,
        `Not all settings are defined to generate template. Following settings are checked: company, address, city, postal_code`
    ];
}
const _default = async (settings, invoice, order)=>{
    var doc = new _pdfkit.default();
    doc.registerFont('Regular', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, _header.generateHeader)(doc, 50, settings);
    const endInvoiceInfo = (0, _invoiceinfo.generateInvoiceInformation)(doc, endHeader, invoice);
    const endY = (0, _customerinfo.generateCustomerInformation)(doc, endInvoiceInfo, order);
    (0, _table.generateInvoiceTable)(doc, endY, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise((resolve)=>{
        doc.on("end", ()=>{
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvYmFzaWMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDI0IFJTQy1MYWJzLCBodHRwczovL3Jzb2Z0Y29uLmNvbS9cbiAqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IFBERkRvY3VtZW50IGZyb20gJ3BkZmtpdCc7XG5pbXBvcnQgeyBPcmRlckRUTyB9IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3R5cGVzXCJcbmltcG9ydCB7IGdlbmVyYXRlSGVhZGVyIH0gZnJvbSBcIi4vcGFydHMvaGVhZGVyXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUN1c3RvbWVySW5mb3JtYXRpb24gfSBmcm9tIFwiLi9wYXJ0cy9jdXN0b21lci1pbmZvXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUludm9pY2VUYWJsZSB9IGZyb20gXCIuL3BhcnRzL3RhYmxlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUludm9pY2VJbmZvcm1hdGlvbiB9IGZyb20gXCIuL3BhcnRzL2ludm9pY2UtaW5mb1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IERvY3VtZW50SW52b2ljZURUTywgRG9jdW1lbnRTZXR0aW5nc0RUTyB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2R0byc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0KHNldHRpbmdzPzogRG9jdW1lbnRTZXR0aW5nc0RUTykgOiAoW2Jvb2xlYW4sIHN0cmluZ10pIHsgXG4gIGlmIChzZXR0aW5ncyAmJiBzZXR0aW5ncy5zdG9yZUFkZHJlc3MgJiYgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLmNvbXBhbnkgJiZcbiAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuYWRkcmVzc18xICYmXG4gICAgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLmNpdHkgJiZcbiAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MucG9zdGFsX2NvZGVcbiAgKSByZXR1cm4gW3RydWUsICcnXTtcbiAgcmV0dXJuIFtmYWxzZSwgYE5vdCBhbGwgc2V0dGluZ3MgYXJlIGRlZmluZWQgdG8gZ2VuZXJhdGUgdGVtcGxhdGUuIEZvbGxvd2luZyBzZXR0aW5ncyBhcmUgY2hlY2tlZDogY29tcGFueSwgYWRkcmVzcywgY2l0eSwgcG9zdGFsX2NvZGVgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHNldHRpbmdzOiBEb2N1bWVudFNldHRpbmdzRFRPLCBpbnZvaWNlOiBEb2N1bWVudEludm9pY2VEVE8sIG9yZGVyOiBPcmRlckRUTyk6IFByb21pc2U8QnVmZmVyPiA9PiB7IFxuICB2YXIgZG9jID0gbmV3IFBERkRvY3VtZW50KCk7XG4gIGRvYy5yZWdpc3RlckZvbnQoJ1JlZ3VsYXInLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vYXNzZXRzL2ZvbnRzL0lCTVBsZXhTYW5zLVJlZ3VsYXIudHRmJykpXG4gIGRvYy5yZWdpc3RlckZvbnQoJ0JvbGQnLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vYXNzZXRzL2ZvbnRzL0lCTVBsZXhTYW5zLUJvbGQudHRmJykpXG4gIGRvYy5mb250KCdSZWd1bGFyJyk7XG5cbiAgY29uc3QgYnVmZmVycyA9IFtdXG4gIGRvYy5vbihcImRhdGFcIiwgYnVmZmVycy5wdXNoLmJpbmQoYnVmZmVycykpXG5cbiAgY29uc3QgZW5kSGVhZGVyID0gZ2VuZXJhdGVIZWFkZXIoZG9jLCA1MCwgc2V0dGluZ3MpO1xuICBjb25zdCBlbmRJbnZvaWNlSW5mbyA9IGdlbmVyYXRlSW52b2ljZUluZm9ybWF0aW9uKGRvYywgZW5kSGVhZGVyLCBpbnZvaWNlKTtcbiAgY29uc3QgZW5kWSA9IGdlbmVyYXRlQ3VzdG9tZXJJbmZvcm1hdGlvbihkb2MsIGVuZEludm9pY2VJbmZvLCBvcmRlcik7XG4gIGdlbmVyYXRlSW52b2ljZVRhYmxlKGRvYywgZW5kWSwgb3JkZXIsIG9yZGVyLml0ZW1zIHx8IFtdKTtcbiBcbiAgZG9jLmVuZCgpO1xuXG4gIGNvbnN0IGJ1ZmZlclByb21pc2UgPSBuZXcgUHJvbWlzZTxCdWZmZXI+KHJlc29sdmUgPT4ge1xuICAgIGRvYy5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBkZkRhdGEgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpXG4gICAgICAgIHJlc29sdmUocGRmRGF0YSlcbiAgICB9KVxuICB9KVxuXG4gIHJldHVybiBhd2FpdCBidWZmZXJQcm9taXNlO1xufTsiXSwibmFtZXMiOlsidmFsaWRhdGVJbnB1dCIsInNldHRpbmdzIiwic3RvcmVBZGRyZXNzIiwiY29tcGFueSIsImFkZHJlc3NfMSIsImNpdHkiLCJwb3N0YWxfY29kZSIsImludm9pY2UiLCJvcmRlciIsImRvYyIsIlBERkRvY3VtZW50IiwicmVnaXN0ZXJGb250IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJmb250IiwiYnVmZmVycyIsIm9uIiwicHVzaCIsImJpbmQiLCJlbmRIZWFkZXIiLCJnZW5lcmF0ZUhlYWRlciIsImVuZEludm9pY2VJbmZvIiwiZ2VuZXJhdGVJbnZvaWNlSW5mb3JtYXRpb24iLCJlbmRZIiwiZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uIiwiZ2VuZXJhdGVJbnZvaWNlVGFibGUiLCJpdGVtcyIsImVuZCIsImJ1ZmZlclByb21pc2UiLCJQcm9taXNlIiwicGRmRGF0YSIsIkJ1ZmZlciIsImNvbmNhdCJdLCJyYW5nZU1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsiLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Q0FVQzs7Ozs7Ozs7Ozs7SUFvQkQsT0F3QkU7ZUF4QkY7O0lBVGdCQSxhQUFhO2VBQWJBOzs7K0RBVFE7d0JBRU87OEJBQ2E7dUJBQ1A7NkJBQ007NkRBQzFCOzs7Ozs7QUFHVixTQUFTQSxjQUFjQyxRQUE4QjtJQUMxRCxJQUFJQSxZQUFZQSxTQUFTQyxZQUFZLElBQUlELFNBQVNDLFlBQVksQ0FBQ0MsT0FBTyxJQUNwRUYsU0FBU0MsWUFBWSxDQUFDRSxTQUFTLElBQy9CSCxTQUFTQyxZQUFZLENBQUNHLElBQUksSUFDMUJKLFNBQVNDLFlBQVksQ0FBQ0ksV0FBVyxFQUNqQyxPQUFPO1FBQUM7UUFBTTtLQUFHO0lBQ25CLE9BQU87UUFBQztRQUFPLENBQUMsc0hBQXNILENBQUM7S0FBQztBQUMxSTtNQUVBLFdBQWUsT0FBT0wsVUFBK0JNLFNBQTZCQztJQUNoRixJQUFJQyxNQUFNLElBQUlDLGVBQVc7SUFDekJELElBQUlFLFlBQVksQ0FBQyxXQUFXQyxhQUFJLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVztJQUNwREwsSUFBSUUsWUFBWSxDQUFDLFFBQVFDLGFBQUksQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXO0lBQ2pETCxJQUFJTSxJQUFJLENBQUM7SUFFVCxNQUFNQyxVQUFVLEVBQUU7SUFDbEJQLElBQUlRLEVBQUUsQ0FBQyxRQUFRRCxRQUFRRSxJQUFJLENBQUNDLElBQUksQ0FBQ0g7SUFFakMsTUFBTUksWUFBWUMsSUFBQUEsc0JBQWMsRUFBQ1osS0FBSyxJQUFJUjtJQUMxQyxNQUFNcUIsaUJBQWlCQyxJQUFBQSx1Q0FBMEIsRUFBQ2QsS0FBS1csV0FBV2I7SUFDbEUsTUFBTWlCLE9BQU9DLElBQUFBLHlDQUEyQixFQUFDaEIsS0FBS2EsZ0JBQWdCZDtJQUM5RGtCLElBQUFBLDJCQUFvQixFQUFDakIsS0FBS2UsTUFBTWhCLE9BQU9BLE1BQU1tQixLQUFLLElBQUksRUFBRTtJQUV4RGxCLElBQUltQixHQUFHO0lBRVAsTUFBTUMsZ0JBQWdCLElBQUlDLFFBQWdCakIsQ0FBQUE7UUFDeENKLElBQUlRLEVBQUUsQ0FBQyxPQUFPO1lBQ1YsTUFBTWMsVUFBVUMsT0FBT0MsTUFBTSxDQUFDakI7WUFDOUJILFFBQVFrQjtRQUNaO0lBQ0Y7SUFFQSxPQUFPLE1BQU1GO0FBQ2YifQ==