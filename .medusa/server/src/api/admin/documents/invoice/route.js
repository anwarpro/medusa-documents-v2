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
        // Fetch variant data for items using query
        const queryService = req.scope.resolve(_utils1.ContainerRegistrationKeys.QUERY);
        if (order.items && order.items.length > 0) {
            const variantIds = order.items.map((item)=>item.variant_id).filter((id)=>!!id);
            if (variantIds.length > 0) {
                const { data: variants } = await queryService.graph({
                    entity: "product_variant",
                    fields: [
                        "id",
                        "sku",
                        "barcode"
                    ],
                    filters: {
                        id: variantIds
                    }
                });
                // Map variants to items
                const variantMap = new Map(variants.map((v)=>[
                        v.id,
                        v
                    ]));
                order.items = order.items.map((item)=>({
                        ...item,
                        variant: variantMap.get(item.variant_id) || null
                    }));
            }
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
        // Use link service directly instead of workflow to avoid container issues
        const link = req.scope.resolve(_utils1.ContainerRegistrationKeys.LINK);
        // Delete old invoice link if it exists
        if (orderWithInvoice.document_invoice && orderWithInvoice.document_invoice.id) {
            try {
                await link.delete({
                    [_utils1.Modules.ORDER]: {
                        order_id: order.id
                    },
                    [_documents.DOCUMENTS_MODULE]: {
                        document_invoice_id: orderWithInvoice.document_invoice.id
                    }
                });
            } catch (error) {
                // Ignore errors when deleting non-existent link
                console.warn('Error deleting old invoice link:', error);
            }
        }
        // Create new invoice link
        await link.create({
            [_utils1.Modules.ORDER]: {
                order_id: order.id
            },
            [_documents.DOCUMENTS_MODULE]: {
                document_invoice_id: result.invoice.id
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcGkvYWRtaW4vZG9jdW1lbnRzL2ludm9pY2Uvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDI0IFJTQy1MYWJzLCBodHRwczovL3Jzb2Z0Y29uLmNvbS9cbiAqXG4gKiBNSVQgTGljZW5zZVxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBcbiAgTWVkdXNhUmVxdWVzdCwgXG4gIE1lZHVzYVJlc3BvbnNlLFxufSBmcm9tIFwiQG1lZHVzYWpzL2ZyYW1ld29yay9odHRwXCJcbmltcG9ydCB7IElPcmRlck1vZHVsZVNlcnZpY2UsIE9yZGVyRFRPIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdHlwZXNcIlxuaW1wb3J0IHsgTWVkdXNhRXJyb3IgfSBmcm9tIFwiQG1lZHVzYWpzL3V0aWxzXCJcbmltcG9ydCBEb2N1bWVudHNNb2R1bGVTZXJ2aWNlIGZyb20gXCIuLi8uLi8uLi8uLi9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlXCJcbmltcG9ydCB7IERPQ1VNRU5UU19NT0RVTEUgfSBmcm9tIFwiLi4vLi4vLi4vLi4vbW9kdWxlcy9kb2N1bWVudHNcIlxuaW1wb3J0IHsgTW9kdWxlcyB9IGZyb20gXCJAbWVkdXNhanMvZnJhbWV3b3JrL3V0aWxzXCI7XG5pbXBvcnQgeyBDb250YWluZXJSZWdpc3RyYXRpb25LZXlzIH0gZnJvbSBcIkBtZWR1c2Fqcy9mcmFtZXdvcmsvdXRpbHNcIjtcblxuXG5leHBvcnQgY29uc3QgUE9TVCA9IGFzeW5jIChcbiAgcmVxOiBNZWR1c2FSZXF1ZXN0LFxuICByZXM6IE1lZHVzYVJlc3BvbnNlXG4pID0+IHtcblxuICBjb25zdCBkb2N1bWVudHNNb2R1bGVTZXJ2aWNlOiBEb2N1bWVudHNNb2R1bGVTZXJ2aWNlID0gcmVxLnNjb3BlLnJlc29sdmUoRE9DVU1FTlRTX01PRFVMRSlcbiAgY29uc3Qgb3JkZXJNb2R1bGVTZXJ2aWNlOiBJT3JkZXJNb2R1bGVTZXJ2aWNlICA9IHJlcS5zY29wZS5yZXNvbHZlKFxuICAgIE1vZHVsZXMuT1JERVJcbiAgKTtcblxuICB0cnkge1xuICAgIGNvbnN0IGJvZHk6IGFueSA9IHJlcS5ib2R5IGFzIGFueTtcbiAgICBcbiAgICBpZiAoIWJvZHkgfHwgIWJvZHkub3JkZXJfaWQpIHtcbiAgICAgIHRocm93IG5ldyBNZWR1c2FFcnJvcihcbiAgICAgICAgTWVkdXNhRXJyb3IuVHlwZXMuSU5WQUxJRF9EQVRBLFxuICAgICAgICAnT3JkZXIgSUQgaXMgcmVxdWlyZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG9yZGVyOiBPcmRlckRUTyA9IGF3YWl0IG9yZGVyTW9kdWxlU2VydmljZS5yZXRyaWV2ZU9yZGVyKGJvZHkub3JkZXJfaWQsIHtcbiAgICAgIHNlbGVjdDogWycqJywgJ2l0ZW1fdG90YWwnLCAnc2hpcHBpbmdfdG90YWwnLCAndGF4X3RvdGFsJ10sXG4gICAgICByZWxhdGlvbnM6IFsnc2hpcHBpbmdfYWRkcmVzcycsICdiaWxsaW5nX2FkZHJlc3MnLCAnaXRlbXMnXVxuICAgIH0pXG4gICAgXG4gICAgaWYgKCFvcmRlcikge1xuICAgICAgdGhyb3cgbmV3IE1lZHVzYUVycm9yKFxuICAgICAgICBNZWR1c2FFcnJvci5UeXBlcy5OT1RfRk9VTkQsXG4gICAgICAgICdPcmRlciBub3QgZm91bmQnXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEZldGNoIHZhcmlhbnQgZGF0YSBmb3IgaXRlbXMgdXNpbmcgcXVlcnlcbiAgICBjb25zdCBxdWVyeVNlcnZpY2UgPSByZXEuc2NvcGUucmVzb2x2ZShDb250YWluZXJSZWdpc3RyYXRpb25LZXlzLlFVRVJZKTtcbiAgICBpZiAob3JkZXIuaXRlbXMgJiYgb3JkZXIuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdmFyaWFudElkcyA9IG9yZGVyLml0ZW1zXG4gICAgICAgIC5tYXAoaXRlbSA9PiBpdGVtLnZhcmlhbnRfaWQpXG4gICAgICAgIC5maWx0ZXIoKGlkKTogaWQgaXMgc3RyaW5nID0+ICEhaWQpO1xuICAgICAgXG4gICAgICBpZiAodmFyaWFudElkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogdmFyaWFudHMgfSA9IGF3YWl0IHF1ZXJ5U2VydmljZS5ncmFwaCh7XG4gICAgICAgICAgZW50aXR5OiBcInByb2R1Y3RfdmFyaWFudFwiLFxuICAgICAgICAgIGZpZWxkczogW1wiaWRcIiwgXCJza3VcIiwgXCJiYXJjb2RlXCJdLFxuICAgICAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgICAgIGlkOiB2YXJpYW50SWRzXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNYXAgdmFyaWFudHMgdG8gaXRlbXNcbiAgICAgICAgY29uc3QgdmFyaWFudE1hcCA9IG5ldyBNYXAodmFyaWFudHMubWFwKCh2OiBhbnkpID0+IFt2LmlkLCB2XSkpO1xuICAgICAgICBvcmRlci5pdGVtcyA9IG9yZGVyLml0ZW1zLm1hcCgoaXRlbTogYW55KSA9PiAoe1xuICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgdmFyaWFudDogdmFyaWFudE1hcC5nZXQoaXRlbS52YXJpYW50X2lkKSB8fCBudWxsXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkb2N1bWVudHNNb2R1bGVTZXJ2aWNlLmdlbmVyYXRlSW52b2ljZUZvck9yZGVyKG9yZGVyKVxuICAgIFxuICAgIGlmICghcmVzdWx0IHx8ICFyZXN1bHQuaW52b2ljZSkge1xuICAgICAgdGhyb3cgbmV3IE1lZHVzYUVycm9yKFxuICAgICAgICBNZWR1c2FFcnJvci5UeXBlcy5JTlZBTElEX0RBVEEsXG4gICAgICAgICdJbnZvaWNlIG5vdCBnZW5lcmF0ZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXJ5ID0gcmVxLnNjb3BlLnJlc29sdmUoQ29udGFpbmVyUmVnaXN0cmF0aW9uS2V5cy5RVUVSWSlcbiAgICBjb25zdCB7IFxuICAgICAgZGF0YTogW29yZGVyV2l0aEludm9pY2VdLFxuICAgIH0gPSBhd2FpdCBxdWVyeS5ncmFwaCh7XG4gICAgICBlbnRpdHk6IFwib3JkZXJcIixcbiAgICAgIGZpbHRlcnM6IHtcbiAgICAgICAgaWQ6IFtcbiAgICAgICAgICBvcmRlci5pZFxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZmllbGRzOiBbXG4gICAgICAgIFwiZG9jdW1lbnRfaW52b2ljZS4qXCIsXG4gICAgICBdLFxuICAgIH0pO1xuICAgIFxuICAgIC8vIFVzZSBsaW5rIHNlcnZpY2UgZGlyZWN0bHkgaW5zdGVhZCBvZiB3b3JrZmxvdyB0byBhdm9pZCBjb250YWluZXIgaXNzdWVzXG4gICAgY29uc3QgbGluayA9IHJlcS5zY29wZS5yZXNvbHZlKENvbnRhaW5lclJlZ2lzdHJhdGlvbktleXMuTElOSyk7XG4gICAgXG4gICAgLy8gRGVsZXRlIG9sZCBpbnZvaWNlIGxpbmsgaWYgaXQgZXhpc3RzXG4gICAgaWYgKG9yZGVyV2l0aEludm9pY2UuZG9jdW1lbnRfaW52b2ljZSAmJiBvcmRlcldpdGhJbnZvaWNlLmRvY3VtZW50X2ludm9pY2UuaWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGxpbmsuZGVsZXRlKHtcbiAgICAgICAgICBbTW9kdWxlcy5PUkRFUl06IHtcbiAgICAgICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW0RPQ1VNRU5UU19NT0RVTEVdOiB7XG4gICAgICAgICAgICBkb2N1bWVudF9pbnZvaWNlX2lkOiBvcmRlcldpdGhJbnZvaWNlLmRvY3VtZW50X2ludm9pY2UuaWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWdub3JlIGVycm9ycyB3aGVuIGRlbGV0aW5nIG5vbi1leGlzdGVudCBsaW5rXG4gICAgICAgIGNvbnNvbGUud2FybignRXJyb3IgZGVsZXRpbmcgb2xkIGludm9pY2UgbGluazonLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIENyZWF0ZSBuZXcgaW52b2ljZSBsaW5rXG4gICAgYXdhaXQgbGluay5jcmVhdGUoe1xuICAgICAgW01vZHVsZXMuT1JERVJdOiB7XG4gICAgICAgIG9yZGVyX2lkOiBvcmRlci5pZFxuICAgICAgfSxcbiAgICAgIFtET0NVTUVOVFNfTU9EVUxFXToge1xuICAgICAgICBkb2N1bWVudF9pbnZvaWNlX2lkOiByZXN1bHQuaW52b2ljZS5pZFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24ocmVzdWx0KTtcbiAgfSBjYXRjaCAoZTogYW55KSB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZT8ubWVzc2FnZSB8fCBlPy50b1N0cmluZygpIHx8ICdBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBnZW5lcmF0aW5nIHRoZSBpbnZvaWNlJztcbiAgICByZXMuc3RhdHVzKDQwMCkuanNvbih7XG4gICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2VcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBHRVQgPSBhc3luYyAoXG4gIHJlcTogTWVkdXNhUmVxdWVzdCxcbiAgcmVzOiBNZWR1c2FSZXNwb25zZVxuKSA9PiB7XG5cbiAgY29uc3QgZG9jdW1lbnRzTW9kdWxlU2VydmljZTogRG9jdW1lbnRzTW9kdWxlU2VydmljZSA9IHJlcS5zY29wZS5yZXNvbHZlKERPQ1VNRU5UU19NT0RVTEUpXG5cbiAgY29uc3Qgb3JkZXJJZCA9IHJlcS5xdWVyeS5vcmRlcklkIGFzIHN0cmluZztcbiAgY29uc3QgaW5jbHVkZUJ1ZmZlciA9IHJlcS5xdWVyeS5pbmNsdWRlQnVmZmVyO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcXVlcnkgPSByZXEuc2NvcGUucmVzb2x2ZShDb250YWluZXJSZWdpc3RyYXRpb25LZXlzLlFVRVJZKVxuICAgIGNvbnN0IHsgXG4gICAgICBkYXRhOiBbb3JkZXJXaXRoSW52b2ljZV0sXG4gICAgfSA9IGF3YWl0IHF1ZXJ5LmdyYXBoKHtcbiAgICAgIGVudGl0eTogXCJvcmRlclwiLFxuICAgICAgZmlsdGVyczoge1xuICAgICAgICBpZDogW1xuICAgICAgICAgIG9yZGVySWRcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIGZpZWxkczogW1xuICAgICAgICBcImRvY3VtZW50X2ludm9pY2UuKlwiLFxuICAgICAgXSxcbiAgICB9KTtcbiAgICBpZiAob3JkZXJXaXRoSW52b2ljZS5kb2N1bWVudF9pbnZvaWNlICYmIG9yZGVySWQpIHtcbiAgICAgIGNvbnN0IG9yZGVyTW9kdWxlU2VydmljZTogSU9yZGVyTW9kdWxlU2VydmljZSAgPSByZXEuc2NvcGUucmVzb2x2ZShcbiAgICAgICAgTW9kdWxlcy5PUkRFUlxuICAgICAgKTtcbiAgICAgIGNvbnN0IG9yZGVyRHRvID0gYXdhaXQgb3JkZXJNb2R1bGVTZXJ2aWNlLnJldHJpZXZlT3JkZXIob3JkZXJJZCwgXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3Q6IFsnKicsICdpdGVtX3RvdGFsJywgJ3NoaXBwaW5nX3RvdGFsJywgJ3RheF90b3RhbCddLFxuICAgICAgICAgIHJlbGF0aW9uczogWydzaGlwcGluZ19hZGRyZXNzJywgJ2JpbGxpbmdfYWRkcmVzcycsICdpdGVtcyddXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkb2N1bWVudHNNb2R1bGVTZXJ2aWNlLmdldEludm9pY2Uob3JkZXJEdG8sIG9yZGVyV2l0aEludm9pY2UuZG9jdW1lbnRfaW52b2ljZS5pZCwgaW5jbHVkZUJ1ZmZlciAhPT0gdW5kZWZpbmVkKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgaW52b2ljZTogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgbWVzc2FnZTogZS5tZXNzYWdlXG4gICAgfSlcbiAgfVxufSJdLCJuYW1lcyI6WyJHRVQiLCJQT1NUIiwicmVxIiwicmVzIiwiZG9jdW1lbnRzTW9kdWxlU2VydmljZSIsInNjb3BlIiwicmVzb2x2ZSIsIkRPQ1VNRU5UU19NT0RVTEUiLCJvcmRlck1vZHVsZVNlcnZpY2UiLCJNb2R1bGVzIiwiT1JERVIiLCJib2R5Iiwib3JkZXJfaWQiLCJNZWR1c2FFcnJvciIsIlR5cGVzIiwiSU5WQUxJRF9EQVRBIiwib3JkZXIiLCJyZXRyaWV2ZU9yZGVyIiwic2VsZWN0IiwicmVsYXRpb25zIiwiTk9UX0ZPVU5EIiwicXVlcnlTZXJ2aWNlIiwiQ29udGFpbmVyUmVnaXN0cmF0aW9uS2V5cyIsIlFVRVJZIiwiaXRlbXMiLCJsZW5ndGgiLCJ2YXJpYW50SWRzIiwibWFwIiwiaXRlbSIsInZhcmlhbnRfaWQiLCJmaWx0ZXIiLCJpZCIsImRhdGEiLCJ2YXJpYW50cyIsImdyYXBoIiwiZW50aXR5IiwiZmllbGRzIiwiZmlsdGVycyIsInZhcmlhbnRNYXAiLCJNYXAiLCJ2IiwidmFyaWFudCIsImdldCIsInJlc3VsdCIsImdlbmVyYXRlSW52b2ljZUZvck9yZGVyIiwiaW52b2ljZSIsInF1ZXJ5Iiwib3JkZXJXaXRoSW52b2ljZSIsImxpbmsiLCJMSU5LIiwiZG9jdW1lbnRfaW52b2ljZSIsImRlbGV0ZSIsImRvY3VtZW50X2ludm9pY2VfaWQiLCJlcnJvciIsImNvbnNvbGUiLCJ3YXJuIiwiY3JlYXRlIiwic3RhdHVzIiwianNvbiIsImUiLCJlcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwidG9TdHJpbmciLCJvcmRlcklkIiwiaW5jbHVkZUJ1ZmZlciIsIm9yZGVyRHRvIiwiZ2V0SW52b2ljZSIsInVuZGVmaW5lZCJdLCJyYW5nZU1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyIsIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztDQVVDOzs7Ozs7Ozs7OztJQXNJWUEsR0FBRztlQUFIQTs7SUF4SEFDLElBQUk7ZUFBSkE7Ozt1QkFQZTsyQkFFSzt3QkFDVDtBQUlqQixNQUFNQSxPQUFPLE9BQ2xCQyxLQUNBQztJQUdBLE1BQU1DLHlCQUFpREYsSUFBSUcsS0FBSyxDQUFDQyxPQUFPLENBQUNDLDJCQUFnQjtJQUN6RixNQUFNQyxxQkFBMkNOLElBQUlHLEtBQUssQ0FBQ0MsT0FBTyxDQUNoRUcsZUFBTyxDQUFDQyxLQUFLO0lBR2YsSUFBSTtRQUNGLE1BQU1DLE9BQVlULElBQUlTLElBQUk7UUFFMUIsSUFBSSxDQUFDQSxRQUFRLENBQUNBLEtBQUtDLFFBQVEsRUFBRTtZQUMzQixNQUFNLElBQUlDLGtCQUFXLENBQ25CQSxrQkFBVyxDQUFDQyxLQUFLLENBQUNDLFlBQVksRUFDOUI7UUFFSjtRQUVBLE1BQU1DLFFBQWtC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