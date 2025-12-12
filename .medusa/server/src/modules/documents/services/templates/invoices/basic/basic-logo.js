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
const _customerinfo = require("./parts/customer-info");
const _table = require("./parts/table");
const _invoiceinfo = require("./parts/invoice-info");
const _headerforlogo = require("./parts/header-for-logo");
const _headerlogo = require("./parts/header-logo");
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
    const endHeader = (0, _headerforlogo.generateHeaderForLogo)(doc, 50, settings);
    await (0, _headerlogo.generateHeaderLogo)(doc, 50, settings.storeLogoSource);
    const endInvoice = (0, _invoiceinfo.generateInvoiceInformation)(doc, endHeader, invoice);
    const endDetails = (0, _customerinfo.generateCustomerInformation)(doc, endInvoice, order);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvYmFzaWMtbG9nby50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjQgUlNDLUxhYnMsIGh0dHBzOi8vcnNvZnRjb24uY29tL1xuICpcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgeyBPcmRlckRUTyB9IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3R5cGVzXCJcbmltcG9ydCB7IERvY3VtZW50SW52b2ljZURUTywgRG9jdW1lbnRTZXR0aW5nc0RUTyB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2R0byc7XG5pbXBvcnQgUERGRG9jdW1lbnQgZnJvbSAncGRma2l0JztcbmltcG9ydCB7IGdlbmVyYXRlQ3VzdG9tZXJJbmZvcm1hdGlvbiB9IGZyb20gXCIuL3BhcnRzL2N1c3RvbWVyLWluZm9cIjtcbmltcG9ydCB7IGdlbmVyYXRlSW52b2ljZVRhYmxlIH0gZnJvbSBcIi4vcGFydHMvdGFibGVcIjtcbmltcG9ydCB7IGdlbmVyYXRlSW52b2ljZUluZm9ybWF0aW9uIH0gZnJvbSBcIi4vcGFydHMvaW52b2ljZS1pbmZvXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZUhlYWRlckZvckxvZ28gfSBmcm9tIFwiLi9wYXJ0cy9oZWFkZXItZm9yLWxvZ29cIjtcbmltcG9ydCB7IGdlbmVyYXRlSGVhZGVyTG9nbyB9IGZyb20gXCIuL3BhcnRzL2hlYWRlci1sb2dvXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVJbnB1dChzZXR0aW5ncz86IERvY3VtZW50U2V0dGluZ3NEVE8pIDogKFtib29sZWFuLCBzdHJpbmddKSB7IFxuICBpZiAoc2V0dGluZ3MgJiYgc2V0dGluZ3Muc3RvcmVBZGRyZXNzICYmIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5jb21wYW55ICYmXG4gICAgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLmFkZHJlc3NfMSAmJlxuICAgIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5jaXR5ICYmXG4gICAgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLnBvc3RhbF9jb2RlICYmIFxuICAgIHNldHRpbmdzLnN0b3JlTG9nb1NvdXJjZVxuICApIHJldHVybiBbdHJ1ZSwgJyddO1xuICByZXR1cm4gW2ZhbHNlLCBgTm90IGFsbCBzZXR0aW5ncyBhcmUgZGVmaW5lZCB0byBnZW5lcmF0ZSB0ZW1wbGF0ZS4gRm9sbG93aW5nIHNldHRpbmdzIGFyZSBjaGVja2VkOiBsb2dvLCBjb21wYW55LCBhZGRyZXNzLCBjaXR5LCBwb3N0YWxfY29kZWBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoc2V0dGluZ3M6IERvY3VtZW50U2V0dGluZ3NEVE8sIGludm9pY2U6IERvY3VtZW50SW52b2ljZURUTywgb3JkZXI6IE9yZGVyRFRPKTogUHJvbWlzZTxCdWZmZXI+ID0+IHsgXG4gIHZhciBkb2MgPSBuZXcgUERGRG9jdW1lbnQoKTtcbiAgZG9jLnJlZ2lzdGVyRm9udCgnUmVndWxhcicsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi8uLi9hc3NldHMvZm9udHMvSUJNUGxleFNhbnMtUmVndWxhci50dGYnKSlcbiAgZG9jLnJlZ2lzdGVyRm9udCgnQm9sZCcsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi8uLi9hc3NldHMvZm9udHMvSUJNUGxleFNhbnMtQm9sZC50dGYnKSlcbiAgZG9jLmZvbnQoJ1JlZ3VsYXInKTtcblxuICBjb25zdCBidWZmZXJzID0gW11cbiAgZG9jLm9uKFwiZGF0YVwiLCBidWZmZXJzLnB1c2guYmluZChidWZmZXJzKSlcblxuICBjb25zdCBlbmRIZWFkZXIgPSBnZW5lcmF0ZUhlYWRlckZvckxvZ28oZG9jLCA1MCwgc2V0dGluZ3MpO1xuICBhd2FpdCBnZW5lcmF0ZUhlYWRlckxvZ28oZG9jLCA1MCwgc2V0dGluZ3Muc3RvcmVMb2dvU291cmNlISk7XG4gIGNvbnN0IGVuZEludm9pY2UgPSBnZW5lcmF0ZUludm9pY2VJbmZvcm1hdGlvbihkb2MsIGVuZEhlYWRlciwgaW52b2ljZSk7XG4gIGNvbnN0IGVuZERldGFpbHMgPSBnZW5lcmF0ZUN1c3RvbWVySW5mb3JtYXRpb24oZG9jLCBlbmRJbnZvaWNlLCBvcmRlcik7XG4gIGdlbmVyYXRlSW52b2ljZVRhYmxlKGRvYywgZW5kRGV0YWlscywgb3JkZXIsIG9yZGVyLml0ZW1zIHx8IFtdKTtcbiBcbiAgZG9jLmVuZCgpO1xuXG4gIGNvbnN0IGJ1ZmZlclByb21pc2UgPSBuZXcgUHJvbWlzZTxCdWZmZXI+KHJlc29sdmUgPT4ge1xuICAgIGRvYy5vbihcImVuZFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHBkZkRhdGEgPSBCdWZmZXIuY29uY2F0KGJ1ZmZlcnMpXG4gICAgICAgIHJlc29sdmUocGRmRGF0YSlcbiAgICB9KVxuICB9KVxuICBcbiAgcmV0dXJuIGF3YWl0IGJ1ZmZlclByb21pc2U7XG59OyJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUlucHV0Iiwic2V0dGluZ3MiLCJzdG9yZUFkZHJlc3MiLCJjb21wYW55IiwiYWRkcmVzc18xIiwiY2l0eSIsInBvc3RhbF9jb2RlIiwic3RvcmVMb2dvU291cmNlIiwiaW52b2ljZSIsIm9yZGVyIiwiZG9jIiwiUERGRG9jdW1lbnQiLCJyZWdpc3RlckZvbnQiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImZvbnQiLCJidWZmZXJzIiwib24iLCJwdXNoIiwiYmluZCIsImVuZEhlYWRlciIsImdlbmVyYXRlSGVhZGVyRm9yTG9nbyIsImdlbmVyYXRlSGVhZGVyTG9nbyIsImVuZEludm9pY2UiLCJnZW5lcmF0ZUludm9pY2VJbmZvcm1hdGlvbiIsImVuZERldGFpbHMiLCJnZW5lcmF0ZUN1c3RvbWVySW5mb3JtYXRpb24iLCJnZW5lcmF0ZUludm9pY2VUYWJsZSIsIml0ZW1zIiwiZW5kIiwiYnVmZmVyUHJvbWlzZSIsIlByb21pc2UiLCJwZGZEYXRhIiwiQnVmZmVyIiwiY29uY2F0Il0sInJhbmdlTWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7IiwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0NBVUM7Ozs7Ozs7Ozs7O0lBc0JELE9BeUJFO2VBekJGOztJQVZnQkEsYUFBYTtlQUFiQTs7OytEQVJROzhCQUNvQjt1QkFDUDs2QkFDTTsrQkFDTDs0QkFDSDs2REFDbEI7Ozs7OztBQUVWLFNBQVNBLGNBQWNDLFFBQThCO0lBQzFELElBQUlBLFlBQVlBLFNBQVNDLFlBQVksSUFBSUQsU0FBU0MsWUFBWSxDQUFDQyxPQUFPLElBQ3BFRixTQUFTQyxZQUFZLENBQUNFLFNBQVMsSUFDL0JILFNBQVNDLFlBQVksQ0FBQ0csSUFBSSxJQUMxQkosU0FBU0MsWUFBWSxDQUFDSSxXQUFXLElBQ2pDTCxTQUFTTSxlQUFlLEVBQ3hCLE9BQU87UUFBQztRQUFNO0tBQUc7SUFDbkIsT0FBTztRQUFDO1FBQU8sQ0FBQyw0SEFBNEgsQ0FBQztLQUFDO0FBQ2hKO01BRUEsV0FBZSxPQUFPTixVQUErQk8sU0FBNkJDO0lBQ2hGLElBQUlDLE1BQU0sSUFBSUMsZUFBVztJQUN6QkQsSUFBSUUsWUFBWSxDQUFDLFdBQVdDLGFBQUksQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXO0lBQ3BETCxJQUFJRSxZQUFZLENBQUMsUUFBUUMsYUFBSSxDQUFDQyxPQUFPLENBQUNDLFdBQVc7SUFDakRMLElBQUlNLElBQUksQ0FBQztJQUVULE1BQU1DLFVBQVUsRUFBRTtJQUNsQlAsSUFBSVEsRUFBRSxDQUFDLFFBQVFELFFBQVFFLElBQUksQ0FBQ0MsSUFBSSxDQUFDSDtJQUVqQyxNQUFNSSxZQUFZQyxJQUFBQSxvQ0FBcUIsRUFBQ1osS0FBSyxJQUFJVDtJQUNqRCxNQUFNc0IsSUFBQUEsOEJBQWtCLEVBQUNiLEtBQUssSUFBSVQsU0FBU00sZUFBZTtJQUMxRCxNQUFNaUIsYUFBYUMsSUFBQUEsdUNBQTBCLEVBQUNmLEtBQUtXLFdBQVdiO0lBQzlELE1BQU1rQixhQUFhQyxJQUFBQSx5Q0FBMkIsRUFBQ2pCLEtBQUtjLFlBQVlmO0lBQ2hFbUIsSUFBQUEsMkJBQW9CLEVBQUNsQixLQUFLZ0IsWUFBWWpCLE9BQU9BLE1BQU1vQixLQUFLLElBQUksRUFBRTtJQUU5RG5CLElBQUlvQixHQUFHO0lBRVAsTUFBTUMsZ0JBQWdCLElBQUlDLFFBQWdCbEIsQ0FBQUE7UUFDeENKLElBQUlRLEVBQUUsQ0FBQyxPQUFPO1lBQ1YsTUFBTWUsVUFBVUMsT0FBT0MsTUFBTSxDQUFDbEI7WUFDOUJILFFBQVFtQjtRQUNaO0lBQ0Y7SUFFQSxPQUFPLE1BQU1GO0FBQ2YifQ==