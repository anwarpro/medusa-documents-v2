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
    GET: function() {
        return GET;
    },
    POST: function() {
        return POST;
    }
});
const _utils = require("@medusajs/utils");
const _documents = require("../../../../modules/documents");
const _utils1 = require("@medusajs/framework/utils");
const _assigninvoice = /*#__PURE__*/ _interop_require_default(require("../../../../workflows/assign-invoice"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const POST = async (req, res)=>{
    const documentsModuleService = req.scope.resolve(_documents.DOCUMENTS_MODULE);
    const orderModuleService = req.scope.resolve(_utils1.Modules.ORDER);
    try {
        const body = req.body;
        if (!body || !body.order_id) {
            throw new _utils.MedusaError(_utils.MedusaError.Types.INVALID_DATA, 'Order ID is required');
        }
        const order = await orderModuleService.retrieveOrder(body.order_id, {
            select: [
                '*',
                'item_total',
                'shipping_total',
                'tax_total'
            ],
            relations: [
                'shipping_address',
                'billing_address',
                'items'
            ]
        });
        if (!order) {
            throw new _utils.MedusaError(_utils.MedusaError.Types.NOT_FOUND, 'Order not found');
        }
        const result = await documentsModuleService.generateInvoiceForOrder(order);
        if (!result || !result.invoice) {
            throw new _utils.MedusaError(_utils.MedusaError.Types.INVALID_DATA, 'Invoice not generated');
        }
        const query = req.scope.resolve(_utils1.ContainerRegistrationKeys.QUERY);
        const { data: [orderWithInvoice] } = await query.graph({
            entity: "order",
            filters: {
                id: [
                    order.id
                ]
            },
            fields: [
                "document_invoice.*"
            ]
        });
        await (0, _assigninvoice.default)(req.scope).run({
            input: {
                orderId: order.id,
                newInvoiceId: result.invoice.id,
                oldInvoiceId: orderWithInvoice.document_invoice ? orderWithInvoice.document_invoice.id : undefined
            }
        });
        res.status(201).json(result);
    } catch (e) {
        const errorMessage = e?.message || e?.toString() || 'An error occurred while generating the invoice';
        res.status(400).json({
            message: errorMessage
        });
    }
};
const GET = async (req, res)=>{
    const documentsModuleService = req.scope.resolve(_documents.DOCUMENTS_MODULE);
    const orderId = req.query.orderId;
    const includeBuffer = req.query.includeBuffer;
    try {
        const query = req.scope.resolve(_utils1.ContainerRegistrationKeys.QUERY);
        const { data: [orderWithInvoice] } = await query.graph({
            entity: "order",
            filters: {
                id: [
                    orderId
                ]
            },
            fields: [
                "document_invoice.*"
            ]
        });
        if (orderWithInvoice.document_invoice && orderId) {
            const orderModuleService = req.scope.resolve(_utils1.Modules.ORDER);
            const orderDto = await orderModuleService.retrieveOrder(orderId, {
                select: [
                    '*',
                    'item_total',
                    'shipping_total',
                    'tax_total'
                ],
                relations: [
                    'shipping_address',
                    'billing_address',
                    'items'
                ]
            });
            const result = await documentsModuleService.getInvoice(orderDto, orderWithInvoice.document_invoice.id, includeBuffer !== undefined);
            res.status(200).json(result);
        } else {
            const result = {
                invoice: undefined
            };
            res.status(200).json(result);
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcGkvYWRtaW4vZG9jdW1lbnRzL2ludm9pY2Uvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDI0IFJTQy1MYWJzLCBodHRwczovL3Jzb2Z0Y29uLmNvbS9cbiAqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBcbiAgTWVkdXNhUmVxdWVzdCwgXG4gIE1lZHVzYVJlc3BvbnNlLFxufSBmcm9tIFwiQG1lZHVzYWpzL2ZyYW1ld29yay9odHRwXCJcbmltcG9ydCB7IElPcmRlck1vZHVsZVNlcnZpY2UsIE9yZGVyRFRPIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdHlwZXNcIlxuaW1wb3J0IHsgTWVkdXNhRXJyb3IgfSBmcm9tIFwiQG1lZHVzYWpzL3V0aWxzXCJcbmltcG9ydCBEb2N1bWVudHNNb2R1bGVTZXJ2aWNlIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlXCJcbmltcG9ydCB7IERPQ1VNRU5UU19NT0RVTEUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9kb2N1bWVudHNcIlxuaW1wb3J0IHsgTW9kdWxlcyB9IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgeyBDb250YWluZXJSZWdpc3RyYXRpb25LZXlzIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdXRpbHNcIjtcbmltcG9ydCBhc3NpZ25JbnZvaWNlVG9PcmRlcldvcmtmbG93IGZyb20gXCIuLi8uLi8uLi8uLi93b3JrZmxvd3MvYXNzaWduLWludm9pY2VcIlxuXG5cbmV4cG9ydCBjb25zdCBQT1NUID0gYXN5bmMgKFxuICByZXE6IE1lZHVzYVJlcXVlc3QsXG4gIHJlczogTWVkdXNhUmVzcG9uc2VcbikgPT4ge1xuXG4gIGNvbnN0IGRvY3VtZW50c01vZHVsZVNlcnZpY2U6IERvY3VtZW50c01vZHVsZVNlcnZpY2UgPSByZXEuc2NvcGUucmVzb2x2ZShET0NVTUVOVFNfTU9EVUxFKVxuICBjb25zdCBvcmRlck1vZHVsZVNlcnZpY2U6IElPcmRlck1vZHVsZVNlcnZpY2UgID0gcmVxLnNjb3BlLnJlc29sdmUoXG4gICAgTW9kdWxlcy5PUkRFUlxuICApO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgYm9keTogYW55ID0gcmVxLmJvZHkgYXMgYW55O1xuICAgIFxuICAgIGlmICghYm9keSB8fCAhYm9keS5vcmRlcl9pZCkge1xuICAgICAgdGhyb3cgbmV3IE1lZHVzYUVycm9yKFxuICAgICAgICBNZWR1c2FFcnJvci5UeXBlcy5JTlZBTElEX0RBVEEsXG4gICAgICAgICdPcmRlciBJRCBpcyByZXF1aXJlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3JkZXI6IE9yZGVyRFRPID0gYXdhaXQgb3JkZXJNb2R1bGVTZXJ2aWNlLnJldHJpZXZlT3JkZXIoYm9keS5vcmRlcl9pZCwge1xuICAgICAgc2VsZWN0OiBbJyonLCAnaXRlbV90b3RhbCcsICdzaGlwcGluZ190b3RhbCcsICd0YXhfdG90YWwnXSxcbiAgICAgIHJlbGF0aW9uczogWydzaGlwcGluZ19hZGRyZXNzJywgJ2JpbGxpbmdfYWRkcmVzcycsICdpdGVtcyddXG4gICAgfSlcbiAgICBcbiAgICBpZiAoIW9yZGVyKSB7XG4gICAgICB0aHJvdyBuZXcgTWVkdXNhRXJyb3IoXG4gICAgICAgIE1lZHVzYUVycm9yLlR5cGVzLk5PVF9GT1VORCxcbiAgICAgICAgJ09yZGVyIG5vdCBmb3VuZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jdW1lbnRzTW9kdWxlU2VydmljZS5nZW5lcmF0ZUludm9pY2VGb3JPcmRlcihvcmRlcilcbiAgICBcbiAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0Lmludm9pY2UpIHtcbiAgICAgIHRocm93IG5ldyBNZWR1c2FFcnJvcihcbiAgICAgICAgTWVkdXNhRXJyb3IuVHlwZXMuSU5WQUxJRF9EQVRBLFxuICAgICAgICAnSW52b2ljZSBub3QgZ2VuZXJhdGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBxdWVyeSA9IHJlcS5zY29wZS5yZXNvbHZlKENvbnRhaW5lclJlZ2lzdHJhdGlvbktleXMuUVVFUlkpXG4gICAgY29uc3QgeyBcbiAgICAgIGRhdGE6IFtvcmRlcldpdGhJbnZvaWNlXSxcbiAgICB9ID0gYXdhaXQgcXVlcnkuZ3JhcGgoe1xuICAgICAgZW50aXR5OiBcIm9yZGVyXCIsXG4gICAgICBmaWx0ZXJzOiB7XG4gICAgICAgIGlkOiBbXG4gICAgICAgICAgb3JkZXIuaWRcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGZpZWxkczogW1xuICAgICAgICBcImRvY3VtZW50X2ludm9pY2UuKlwiLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBcbiAgICBhd2FpdCBhc3NpZ25JbnZvaWNlVG9PcmRlcldvcmtmbG93KHJlcS5zY29wZSlcbiAgICAgIC5ydW4oe1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIG9yZGVySWQ6IG9yZGVyLmlkLFxuICAgICAgICAgIG5ld0ludm9pY2VJZDogcmVzdWx0Lmludm9pY2UuaWQsXG4gICAgICAgICAgb2xkSW52b2ljZUlkOiBvcmRlcldpdGhJbnZvaWNlLmRvY3VtZW50X2ludm9pY2UgPyBvcmRlcldpdGhJbnZvaWNlLmRvY3VtZW50X2ludm9pY2UuaWQgOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGU6IGFueSkge1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGU/Lm1lc3NhZ2UgfHwgZT8udG9TdHJpbmcoKSB8fCAnQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgZ2VuZXJhdGluZyB0aGUgaW52b2ljZSc7XG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgR0VUID0gYXN5bmMgKFxuICByZXE6IE1lZHVzYVJlcXVlc3QsXG4gIHJlczogTWVkdXNhUmVzcG9uc2VcbikgPT4ge1xuXG4gIGNvbnN0IGRvY3VtZW50c01vZHVsZVNlcnZpY2U6IERvY3VtZW50c01vZHVsZVNlcnZpY2UgPSByZXEuc2NvcGUucmVzb2x2ZShET0NVTUVOVFNfTU9EVUxFKVxuXG4gIGNvbnN0IG9yZGVySWQgPSByZXEucXVlcnkub3JkZXJJZCBhcyBzdHJpbmc7XG4gIGNvbnN0IGluY2x1ZGVCdWZmZXIgPSByZXEucXVlcnkuaW5jbHVkZUJ1ZmZlcjtcblxuICB0cnkge1xuICAgIGNvbnN0IHF1ZXJ5ID0gcmVxLnNjb3BlLnJlc29sdmUoQ29udGFpbmVyUmVnaXN0cmF0aW9uS2V5cy5RVUVSWSlcbiAgICBjb25zdCB7IFxuICAgICAgZGF0YTogW29yZGVyV2l0aEludm9pY2VdLFxuICAgIH0gPSBhd2FpdCBxdWVyeS5ncmFwaCh7XG4gICAgICBlbnRpdHk6IFwib3JkZXJcIixcbiAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgaWQ6IFtcbiAgICAgICAgICBvcmRlcklkXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICBmaWVsZHM6IFtcbiAgICAgICAgXCJkb2N1bWVudF9pbnZvaWNlLipcIixcbiAgICAgIF0sXG4gICAgfSk7XG4gICAgaWYgKG9yZGVyV2l0aEludm9pY2UuZG9jdW1lbnRfaW52b2ljZSAmJiBvcmRlcklkKSB7XG4gICAgICBjb25zdCBvcmRlck1vZHVsZVNlcnZpY2U6IElPcmRlck1vZHVsZVNlcnZpY2UgID0gcmVxLnNjb3BlLnJlc29sdmUoXG4gICAgICAgIE1vZHVsZXMuT1JERVJcbiAgICAgICk7XG4gICAgICBjb25zdCBvcmRlckR0byA9IGF3YWl0IG9yZGVyTW9kdWxlU2VydmljZS5yZXRyaWV2ZU9yZGVyKG9yZGVySWQsIFxuICAgICAgICB7XG4gICAgICAgICAgc2VsZWN0OiBbJyonLCAnaXRlbV90b3RhbCcsICdzaGlwcGluZ190b3RhbCcsICd0YXhfdG90YWwnXSxcbiAgICAgICAgICByZWxhdGlvbnM6IFsnc2hpcHBpbmdfYWRkcmVzcycsICdiaWxsaW5nX2FkZHJlc3MnLCAnaXRlbXMnXVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG9jdW1lbnRzTW9kdWxlU2VydmljZS5nZXRJbnZvaWNlKG9yZGVyRHRvLCBvcmRlcldpdGhJbnZvaWNlLmRvY3VtZW50X2ludm9pY2UuaWQsIGluY2x1ZGVCdWZmZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgIGludm9pY2U6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZVxuICAgIH0pXG4gIH1cbn0iXSwibmFtZXMiOlsiR0VUIiwiUE9TVCIsInJlcSIsInJlcyIsImRvY3VtZW50c01vZHVsZVNlcnZpY2UiLCJzY29wZSIsInJlc29sdmUiLCJET0NVTUVOVFNfTU9EVUxFIiwib3JkZXJNb2R1bGVTZXJ2aWNlIiwiTW9kdWxlcyIsIk9SREVSIiwiYm9keSIsIm9yZGVyX2lkIiwiTWVkdXNhRXJyb3IiLCJUeXBlcyIsIklOVkFMSURfREFUQSIsIm9yZGVyIiwicmV0cmlldmVPcmRlciIsInNlbGVjdCIsInJlbGF0aW9ucyIsIk5PVF9GT1VORCIsInJlc3VsdCIsImdlbmVyYXRlSW52b2ljZUZvck9yZGVyIiwiaW52b2ljZSIsInF1ZXJ5IiwiQ29udGFpbmVyUmVnaXN0cmF0aW9uS2V5cyIsIlFVRVJZIiwiZGF0YSIsIm9yZGVyV2l0aEludm9pY2UiLCJncmFwaCIsImVudGl0eSIsImZpbHRlcnMiLCJpZCIsImZpZWxkcyIsImFzc2lnbkludm9pY2VUb09yZGVyV29ya2Zsb3ciLCJydW4iLCJpbnB1dCIsIm9yZGVySWQiLCJuZXdJbnZvaWNlSWQiLCJvbGRJbnZvaWNlSWQiLCJkb2N1bWVudF9pbnZvaWNlIiwidW5kZWZpbmVkIiwic3RhdHVzIiwianNvbiIsImUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwidG9TdHJpbmciLCJpbmNsdWRlQnVmZmVyIiwib3JkZXJEdG8iLCJnZXRJbnZvaWNlIl0sInJhbmdlTWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztDQVVDOzs7Ozs7Ozs7OztJQXlGWUEsR0FBRztlQUFIQTs7SUExRUFDLElBQUk7ZUFBSkE7Ozt1QkFSZTsyQkFFSzt3QkFDVDtzRUFFaUI7Ozs7OztBQUdsQyxNQUFNQSxPQUFPLE9BQ2xCQyxLQUNBQztJQUdBLE1BQU1DLHlCQUFpREYsSUFBSUcsS0FBSyxDQUFDQyxPQUFPLENBQUNDLDJCQUFn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