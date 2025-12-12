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
const _tableitems = require("./parts/table-items");
const _tableorderinfo = require("./parts/table-order-info");
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
const _default = async (settings, packingSlip, order)=>{
    var doc = new _pdfkit.default();
    doc.registerFont('Regular', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, _header.generateHeader)(doc, 30, settings);
    const endY = (0, _customerinfo.generateCustomerInformation)(doc, endHeader, order);
    const endTable = (0, _tableorderinfo.generateOrderInfoTable)(doc, endY, order, order.items || []);
    (0, _tableitems.generateItemsTable)(doc, endTable, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise((resolve)=>{
        doc.on("end", ()=>{
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9iYXNpYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjQgUlNDLUxhYnMsIGh0dHBzOi8vcnNvZnRjb24uY29tL1xuICpcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgUERGRG9jdW1lbnQgZnJvbSAncGRma2l0JztcbmltcG9ydCB7IE9yZGVyRFRPIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdHlwZXNcIlxuaW1wb3J0IHsgZ2VuZXJhdGVIZWFkZXIgfSBmcm9tIFwiLi9wYXJ0cy9oZWFkZXJcIlxuaW1wb3J0IHsgZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uIH0gZnJvbSBcIi4vcGFydHMvY3VzdG9tZXItaW5mb1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVJdGVtc1RhYmxlIH0gZnJvbSBcIi4vcGFydHMvdGFibGUtaXRlbXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlT3JkZXJJbmZvVGFibGUgfSBmcm9tIFwiLi9wYXJ0cy90YWJsZS1vcmRlci1pbmZvXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgRG9jdW1lbnRQYWNraW5nU2xpcERUTywgRG9jdW1lbnRTZXR0aW5nc0RUTyB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2R0byc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUlucHV0KHNldHRpbmdzPzogRG9jdW1lbnRTZXR0aW5nc0RUTykgOiAoW2Jvb2xlYW4sIHN0cmluZ10pIHsgXG4gIGlmIChzZXR0aW5ncyAmJiBzZXR0aW5ncy5zdG9yZUFkZHJlc3MgJiYgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLmNvbXBhbnkgJiZcbiAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuYWRkcmVzc18xICYmXG4gICAgc2V0dGluZ3Muc3RvcmVBZGRyZXNzLmNpdHkgJiZcbiAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MucG9zdGFsX2NvZGVcbiAgKSByZXR1cm4gW3RydWUsICcnXTtcbiAgcmV0dXJuIFtmYWxzZSwgYE5vdCBhbGwgc2V0dGluZ3MgYXJlIGRlZmluZWQgdG8gZ2VuZXJhdGUgdGVtcGxhdGUuIEZvbGxvd2luZyBzZXR0aW5ncyBhcmUgY2hlY2tlZDogY29tcGFueSwgYWRkcmVzcywgY2l0eSwgcG9zdGFsX2NvZGVgXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHNldHRpbmdzOiBEb2N1bWVudFNldHRpbmdzRFRPLCBwYWNraW5nU2xpcDogRG9jdW1lbnRQYWNraW5nU2xpcERUTywgb3JkZXI6IE9yZGVyRFRPKTogUHJvbWlzZTxCdWZmZXI+ID0+IHtcblxuICB2YXIgZG9jID0gbmV3IFBERkRvY3VtZW50KCk7XG4gIGRvYy5yZWdpc3RlckZvbnQoJ1JlZ3VsYXInLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vYXNzZXRzL2ZvbnRzL0lCTVBsZXhTYW5zLVJlZ3VsYXIudHRmJykpXG4gIGRvYy5yZWdpc3RlckZvbnQoJ0JvbGQnLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vLi4vYXNzZXRzL2ZvbnRzL0lCTVBsZXhTYW5zLUJvbGQudHRmJykpXG4gIGRvYy5mb250KCdSZWd1bGFyJyk7XG5cbiAgY29uc3QgYnVmZmVycyA9IFtdXG4gIGRvYy5vbihcImRhdGFcIiwgYnVmZmVycy5wdXNoLmJpbmQoYnVmZmVycykpXG5cbiAgY29uc3QgZW5kSGVhZGVyID0gZ2VuZXJhdGVIZWFkZXIoZG9jLCAzMCwgc2V0dGluZ3MpO1xuICBjb25zdCBlbmRZID0gZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uKGRvYywgZW5kSGVhZGVyLCBvcmRlcik7XG4gIGNvbnN0IGVuZFRhYmxlID0gZ2VuZXJhdGVPcmRlckluZm9UYWJsZShkb2MsIGVuZFksIG9yZGVyLCBvcmRlci5pdGVtcyB8fCBbXSk7XG4gIGdlbmVyYXRlSXRlbXNUYWJsZShkb2MsIGVuZFRhYmxlLCBvcmRlciwgb3JkZXIuaXRlbXMgfHwgW10pO1xuIFxuICBkb2MuZW5kKCk7XG5cbiAgY29uc3QgYnVmZmVyUHJvbWlzZSA9IG5ldyBQcm9taXNlPEJ1ZmZlcj4ocmVzb2x2ZSA9PiB7XG4gICAgZG9jLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcGRmRGF0YSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycylcbiAgICAgICAgcmVzb2x2ZShwZGZEYXRhKVxuICAgIH0pXG4gIH0pXG4gIFxuICByZXR1cm4gYXdhaXQgYnVmZmVyUHJvbWlzZTtcbn07Il0sIm5hbWVzIjpbInZhbGlkYXRlSW5wdXQiLCJzZXR0aW5ncyIsInN0b3JlQWRkcmVzcyIsImNvbXBhbnkiLCJhZGRyZXNzXzEiLCJjaXR5IiwicG9zdGFsX2NvZGUiLCJwYWNraW5nU2xpcCIsIm9yZGVyIiwiZG9jIiwiUERGRG9jdW1lbnQiLCJyZWdpc3RlckZvbnQiLCJwYXRoIiwicmVzb2x2ZSIsIl9fZGlybmFtZSIsImZvbnQiLCJidWZmZXJzIiwib24iLCJwdXNoIiwiYmluZCIsImVuZEhlYWRlciIsImdlbmVyYXRlSGVhZGVyIiwiZW5kWSIsImdlbmVyYXRlQ3VzdG9tZXJJbmZvcm1hdGlvbiIsImVuZFRhYmxlIiwiZ2VuZXJhdGVPcmRlckluZm9UYWJsZSIsIml0ZW1zIiwiZ2VuZXJhdGVJdGVtc1RhYmxlIiwiZW5kIiwiYnVmZmVyUHJvbWlzZSIsIlByb21pc2UiLCJwZGZEYXRhIiwiQnVmZmVyIiwiY29uY2F0Il0sInJhbmdlTWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztDQVVDOzs7Ozs7Ozs7OztJQW9CRCxPQXlCRTtlQXpCRjs7SUFUZ0JBLGFBQWE7ZUFBYkE7OzsrREFUUTt3QkFFTzs4QkFDYTs0QkFDVDtnQ0FDSTs2REFDdEI7Ozs7OztBQUdWLFNBQVNBLGNBQWNDLFFBQThCO0lBQzFELElBQUlBLFlBQVlBLFNBQVNDLFlBQVksSUFBSUQsU0FBU0MsWUFBWSxDQUFDQyxPQUFPLElBQ3BFRixTQUFTQyxZQUFZLENBQUNFLFNBQVMsSUFDL0JILFNBQVNDLFlBQVksQ0FBQ0csSUFBSSxJQUMxQkosU0FBU0MsWUFBWSxDQUFDSSxXQUFXLEVBQ2pDLE9BQU87UUFBQztRQUFNO0tBQUc7SUFDbkIsT0FBTztRQUFDO1FBQU8sQ0FBQyxzSEFBc0gsQ0FBQztLQUFDO0FBQzFJO01BRUEsV0FBZSxPQUFPTCxVQUErQk0sYUFBcUNDO0lBRXhGLElBQUlDLE1BQU0sSUFBSUMsZUFBVztJQUN6QkQsSUFBSUUsWUFBWSxDQUFDLFdBQVdDLGFBQUksQ0FBQ0MsT0FBTyxDQUFDQyxXQUFXO0lBQ3BETCxJQUFJRSxZQUFZLENBQUMsUUFBUUMsYUFBSSxDQUFDQyxPQUFPLENBQUNDLFdBQVc7SUFDakRMLElBQUlNLElBQUksQ0FBQztJQUVULE1BQU1DLFVBQVUsRUFBRTtJQUNsQlAsSUFBSVEsRUFBRSxDQUFDLFFBQVFELFFBQVFFLElBQUksQ0FBQ0MsSUFBSSxDQUFDSDtJQUVqQyxNQUFNSSxZQUFZQyxJQUFBQSxzQkFBYyxFQUFDWixLQUFLLElBQUlSO0lBQzFDLE1BQU1xQixPQUFPQyxJQUFBQSx5Q0FBMkIsRUFBQ2QsS0FBS1csV0FBV1o7SUFDekQsTUFBTWdCLFdBQVdDLElBQUFBLHNDQUFzQixFQUFDaEIsS0FBS2EsTUFBTWQsT0FBT0EsTUFBTWtCLEtBQUssSUFBSSxFQUFFO0lBQzNFQyxJQUFBQSw4QkFBa0IsRUFBQ2xCLEtBQUtlLFVBQVVoQixPQUFPQSxNQUFNa0IsS0FBSyxJQUFJLEVBQUU7SUFFMURqQixJQUFJbUIsR0FBRztJQUVQLE1BQU1DLGdCQUFnQixJQUFJQyxRQUFnQmpCLENBQUFBO1FBQ3hDSixJQUFJUSxFQUFFLENBQUMsT0FBTztZQUNWLE1BQU1jLFVBQVVDLE9BQU9DLE1BQU0sQ0FBQ2pCO1lBQzlCSCxRQUFRa0I7UUFDWjtJQUNGO0lBRUEsT0FBTyxNQUFNRjtBQUNmIn0=