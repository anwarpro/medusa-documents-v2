"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const utils_1 = require("@medusajs/utils");
const documents_1 = require("../../../../modules/documents");
const utils_2 = require("@medusajs/framework/utils");
const utils_3 = require("@medusajs/framework/utils");
const assign_invoice_1 = __importDefault(require("../../../../workflows/assign-invoice"));
const POST = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderModuleService = req.scope.resolve(utils_2.Modules.ORDER);
    try {
        const body = req.body;
        let order = await orderModuleService.retrieveOrder(body.order_id, {
            select: ['*', 'item_total', 'shipping_total', 'tax_total'],
            relations: ['shipping_address', 'billing_address', 'items']
        });
        // Enrich order items with variant data (SKU, barcode)
        const query = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
        const variantIds = order.items?.map((item) => item.variant_id).filter(Boolean) || [];
        if (variantIds.length > 0) {
            const { data: variants } = await query.graph({
                entity: "variant",
                fields: ["id", "sku", "barcode", "metadata"],
                filters: {
                    id: variantIds
                }
            });
            // Attach variant data to items
            order.items = order.items?.map((item) => {
                const variant = variants.find((v) => v.id === item.variant_id);
                if (variant) {
                    item.variant = variant;
                }
                return item;
            });
        }
        if (order) {
            const result = await documentsModuleService.generateInvoiceForOrder(order);
            if (result.invoice) {
                const query = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
                const { data: [orderWithInvoice], } = await query.graph({
                    entity: "order",
                    filters: {
                        id: [
                            order.id
                        ]
                    },
                    fields: [
                        "document_invoice.*",
                    ],
                });
                await (0, assign_invoice_1.default)(req.scope)
                    .run({
                    input: {
                        orderId: order.id,
                        newInvoiceId: result.invoice.id,
                        oldInvoiceId: orderWithInvoice.document_invoice ? orderWithInvoice.document_invoice.id : undefined
                    }
                });
                res.status(201).json(result);
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice not generated');
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invalid order id');
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.POST = POST;
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderId = req.query.orderId;
    const includeBuffer = req.query.includeBuffer;
    try {
        const query = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
        const { data: [orderWithInvoice], } = await query.graph({
            entity: "order",
            filters: {
                id: [
                    orderId
                ]
            },
            fields: [
                "document_invoice.*",
            ],
        });
        if (orderWithInvoice.document_invoice && orderId) {
            const orderModuleService = req.scope.resolve(utils_2.Modules.ORDER);
            let orderDto = await orderModuleService.retrieveOrder(orderId, {
                select: ['*', 'item_total', 'shipping_total', 'tax_total'],
                relations: ['shipping_address', 'billing_address', 'items']
            });
            // Enrich order items with variant data (SKU, barcode)
            const query = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
            const variantIds = orderDto.items?.map((item) => item.variant_id).filter(Boolean) || [];
            if (variantIds.length > 0) {
                const { data: variants } = await query.graph({
                    entity: "variant",
                    fields: ["id", "sku", "barcode", "metadata"],
                    filters: {
                        id: variantIds
                    }
                });
                // Attach variant data to items
                orderDto.items = orderDto.items?.map((item) => {
                    const variant = variants.find((v) => v.id === item.variant_id);
                    if (variant) {
                        item.variant = variant;
                    }
                    return item;
                });
            }
            const result = await documentsModuleService.getInvoice(orderDto, orderWithInvoice.document_invoice.id, includeBuffer !== undefined);
            res.status(200).json(result);
        }
        else {
            const result = {
                invoice: undefined
            };
            res.status(200).json(result);
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7Ozs7QUFPSCwyQ0FBNkM7QUFFN0MsNkRBQWdFO0FBQ2hFLHFEQUFvRDtBQUNwRCxxREFBc0U7QUFDdEUsMEZBQStFO0FBR3hFLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUVGLE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFDMUYsTUFBTSxrQkFBa0IsR0FBeUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ2hFLGVBQU8sQ0FBQyxLQUFLLENBQ2QsQ0FBQztJQUVGLElBQUksQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFXLENBQUM7UUFDbEMsSUFBSSxLQUFLLEdBQWEsTUFBTSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMxRSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztZQUMxRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7U0FDNUQsQ0FBQyxDQUFBO1FBRUYsc0RBQXNEO1FBQ3RELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxD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