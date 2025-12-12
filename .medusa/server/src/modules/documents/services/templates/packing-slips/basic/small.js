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
    var doc = new _pdfkit.default({
        size: 'A7'
    });
    doc.registerFont('Regular', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'));
    doc.registerFont('Bold', _path.default.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'));
    doc.font('Regular');
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    const endHeader = (0, _header.generateHeader)(doc, 30, settings);
    const endY = (0, _customerinfo.generateCustomerInformation)(doc, endHeader, order);
    const endTable = (0, _tableorderinfo.generateOrderInfoTable)(doc, endY, order, order.items || []);
    doc = doc.addPage();
    (0, _tableitems.generateItemsTable)(doc, 0, order, order.items || []);
    doc.end();
    const bufferPromise = new Promise((resolve)=>{
        doc.on("end", ()=>{
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
    return await bufferPromise;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvcGFja2luZy1zbGlwcy9iYXNpYy9zbWFsbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMjQgUlNDLUxhYnMsIGh0dHBzOi8vcnNvZnRjb24uY29tL1xuICpcbiAqIE1JVCBMaWNlbnNlXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgUERGRG9jdW1lbnQgZnJvbSAncGRma2l0JztcbmltcG9ydCB7IE9yZGVyRFRPIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdHlwZXNcIlxuaW1wb3J0IHsgZ2VuZXJhdGVIZWFkZXIgfSBmcm9tIFwiLi9wYXJ0cy9oZWFkZXJcIlxuaW1wb3J0IHsgZ2VuZXJhdGVDdXN0b21lckluZm9ybWF0aW9uIH0gZnJvbSBcIi4vcGFydHMvY3VzdG9tZXItaW5mb1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVJdGVtc1RhYmxlIH0gZnJvbSBcIi4vcGFydHMvdGFibGUtaXRlbXNcIjtcbmltcG9ydCB7IGdlbmVyYXRlT3JkZXJJbmZvVGFibGUgfSBmcm9tIFwiLi9wYXJ0cy90YWJsZS1vcmRlci1pbmZvXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgRG9jdW1lbnRQYWNraW5nU2xpcERUTywgRG9jdW1lbnRTZXR0aW5nc0RUTyB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2R0byc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXQoc2V0dGluZ3M/OiBEb2N1bWVudFNldHRpbmdzRFRPKSA6IChbYm9vbGVhbiwgc3RyaW5nXSkgeyBcbiAgaWYgKHNldHRpbmdzICYmIHNldHRpbmdzLnN0b3JlQWRkcmVzcyAmJiBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuY29tcGFueSAmJlxuICAgIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5hZGRyZXNzXzEgJiZcbiAgICBzZXR0aW5ncy5zdG9yZUFkZHJlc3MuY2l0eSAmJlxuICAgIHNldHRpbmdzLnN0b3JlQWRkcmVzcy5wb3N0YWxfY29kZVxuICApIHJldHVybiBbdHJ1ZSwgJyddO1xuICByZXR1cm4gW2ZhbHNlLCBgTm90IGFsbCBzZXR0aW5ncyBhcmUgZGVmaW5lZCB0byBnZW5lcmF0ZSB0ZW1wbGF0ZS4gRm9sbG93aW5nIHNldHRpbmdzIGFyZSBjaGVja2VkOiBjb21wYW55LCBhZGRyZXNzLCBjaXR5LCBwb3N0YWxfY29kZWBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoc2V0dGluZ3M6IERvY3VtZW50U2V0dGluZ3NEVE8sIHBhY2tpbmdTbGlwOiBEb2N1bWVudFBhY2tpbmdTbGlwRFRPLCBvcmRlcjogT3JkZXJEVE8pOiBQcm9taXNlPEJ1ZmZlcj4gPT4geyBcbiAgdmFyIGRvYyA9IG5ldyBQREZEb2N1bWVudCh7c2l6ZTogJ0E3J30pO1xuICBkb2MucmVnaXN0ZXJGb250KCdSZWd1bGFyJywgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uL2Fzc2V0cy9mb250cy9JQk1QbGV4U2Fucy1SZWd1bGFyLnR0ZicpKVxuICBkb2MucmVnaXN0ZXJGb250KCdCb2xkJywgcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uL2Fzc2V0cy9mb250cy9JQk1QbGV4U2Fucy1Cb2xkLnR0ZicpKVxuICBkb2MuZm9udCgnUmVndWxhcicpO1xuXG4gIGNvbnN0IGJ1ZmZlcnMgPSBbXVxuICBkb2Mub24oXCJkYXRhXCIsIGJ1ZmZlcnMucHVzaC5iaW5kKGJ1ZmZlcnMpKVxuXG4gIGNvbnN0IGVuZEhlYWRlciA9IGdlbmVyYXRlSGVhZGVyKGRvYywgMzAsIHNldHRpbmdzKTtcbiAgY29uc3QgZW5kWSA9IGdlbmVyYXRlQ3VzdG9tZXJJbmZvcm1hdGlvbihkb2MsIGVuZEhlYWRlciwgb3JkZXIpO1xuICBjb25zdCBlbmRUYWJsZSA9IGdlbmVyYXRlT3JkZXJJbmZvVGFibGUoZG9jLCBlbmRZLCBvcmRlciwgb3JkZXIuaXRlbXMgfHwgW10pO1xuICBkb2MgPSBkb2MuYWRkUGFnZSgpO1xuICBnZW5lcmF0ZUl0ZW1zVGFibGUoZG9jLCAwLCBvcmRlciwgb3JkZXIuaXRlbXMgfHwgW10pO1xuIFxuICBkb2MuZW5kKCk7XG5cbiAgY29uc3QgYnVmZmVyUHJvbWlzZSA9IG5ldyBQcm9taXNlPEJ1ZmZlcj4ocmVzb2x2ZSA9PiB7XG4gICAgZG9jLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcGRmRGF0YSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycylcbiAgICAgICAgcmVzb2x2ZShwZGZEYXRhKVxuICAgIH0pXG4gIH0pXG4gIFxuICByZXR1cm4gYXdhaXQgYnVmZmVyUHJvbWlzZTtcbn07Il0sIm5hbWVzIjpbInZhbGlkYXRlSW5wdXQiLCJzZXR0aW5ncyIsInN0b3JlQWRkcmVzcyIsImNvbXBhbnkiLCJhZGRyZXNzXzEiLCJjaXR5IiwicG9zdGFsX2NvZGUiLCJwYWNraW5nU2xpcCIsIm9yZGVyIiwiZG9jIiwiUERGRG9jdW1lbnQiLCJzaXplIiwicmVnaXN0ZXJGb250IiwicGF0aCIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJmb250IiwiYnVmZmVycyIsIm9uIiwicHVzaCIsImJpbmQiLCJlbmRIZWFkZXIiLCJnZW5lcmF0ZUhlYWRlciIsImVuZFkiLCJnZW5lcmF0ZUN1c3RvbWVySW5mb3JtYXRpb24iLCJlbmRUYWJsZSIsImdlbmVyYXRlT3JkZXJJbmZvVGFibGUiLCJpdGVtcyIsImFkZFBhZ2UiLCJnZW5lcmF0ZUl0ZW1zVGFibGUiLCJlbmQiLCJidWZmZXJQcm9taXNlIiwiUHJvbWlzZSIsInBkZkRhdGEiLCJCdWZmZXIiLCJjb25jYXQiXSwicmFuZ2VNYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7IiwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0NBVUM7Ozs7Ozs7Ozs7O0lBcUJELE9BeUJFO2VBekJGOztJQVRnQkEsYUFBYTtlQUFiQTs7OytEQVZRO3dCQUVPOzhCQUNhOzRCQUNUO2dDQUNJOzZEQUN0Qjs7Ozs7O0FBSVYsU0FBU0EsY0FBY0MsUUFBOEI7SUFDMUQsSUFBSUEsWUFBWUEsU0FBU0MsWUFBWSxJQUFJRCxTQUFTQyxZQUFZLENBQUNDLE9BQU8sSUFDcEVGLFNBQVNDLFlBQVksQ0FBQ0UsU0FBUyxJQUMvQkgsU0FBU0MsWUFBWSxDQUFDRyxJQUFJLElBQzFCSixTQUFTQyxZQUFZLENBQUNJLFdBQVcsRUFDakMsT0FBTztRQUFDO1FBQU07S0FBRztJQUNuQixPQUFPO1FBQUM7UUFBTyxDQUFDLHNIQUFzSCxDQUFDO0tBQUM7QUFDMUk7TUFFQSxXQUFlLE9BQU9MLFVBQStCTSxhQUFxQ0M7SUFDeEYsSUFBSUMsTUFBTSxJQUFJQyxlQUFXLENBQUM7UUFBQ0MsTUFBTTtJQUFJO0lBQ3JDRixJQUFJRyxZQUFZLENBQUMsV0FBV0MsYUFBSSxDQUFDQyxPQUFPLENBQUNDLFdBQVc7SUFDcEROLElBQUlHLFlBQVksQ0FBQyxRQUFRQyxhQUFJLENBQUNDLE9BQU8sQ0FBQ0MsV0FBVztJQUNqRE4sSUFBSU8sSUFBSSxDQUFDO0lBRVQsTUFBTUMsVUFBVSxFQUFFO0lBQ2xCUixJQUFJUyxFQUFFLENBQUMsUUFBUUQsUUFBUUUsSUFBSSxDQUFDQyxJQUFJLENBQUNIO0lBRWpDLE1BQU1JLFlBQVlDLElBQUFBLHNCQUFjLEVBQUNiLEtBQUssSUFBSVI7SUFDMUMsTUFBTXNCLE9BQU9DLElBQUFBLHlDQUEyQixFQUFDZixLQUFLWSxXQUFXYjtJQUN6RCxNQUFNaUIsV0FBV0MsSUFBQUEsc0NBQXNCLEVBQUNqQixLQUFLYyxNQUFNZixPQUFPQSxNQUFNbUIsS0FBSyxJQUFJLEVBQUU7SUFDM0VsQixNQUFNQSxJQUFJbUIsT0FBTztJQUNqQkMsSUFBQUEsOEJBQWtCLEVBQUNwQixLQUFLLEdBQUdELE9BQU9BLE1BQU1tQixLQUFLLElBQUksRUFBRTtJQUVuRGxCLElBQUlxQixHQUFHO0lBRVAsTUFBTUMsZ0JBQWdCLElBQUlDLFFBQWdCbEIsQ0FBQUE7UUFDeENMLElBQUlTLEVBQUUsQ0FBQyxPQUFPO1lBQ1YsTUFBTWUsVUFBVUMsT0FBT0MsTUFBTSxDQUFDbEI7WUFDOUJILFFBQVFtQjtRQUNaO0lBQ0Y7SUFFQSxPQUFPLE1BQU1GO0FBQ2YifQ==