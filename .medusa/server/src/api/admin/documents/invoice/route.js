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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = exports.POST = void 0;
const utils_1 = require("@medusajs/utils");
const documents_1 = require("../../../../modules/documents");
const utils_2 = require("@medusajs/framework/utils");
const utils_3 = require("@medusajs/framework/utils");
const POST = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderModuleService = req.scope.resolve(utils_2.Modules.ORDER);
    try {
        const body = req.body;
        if (!body || !body.order_id) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Order ID is required');
        }
        const order = await orderModuleService.retrieveOrder(body.order_id, {
            select: ['*', 'item_total', 'shipping_total', 'tax_total'],
            relations: ['shipping_address', 'billing_address', 'items']
        });
        if (!order) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_FOUND, 'Order not found');
        }
        // Fetch variant data for items using query
        const queryService = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
        if (order.items && order.items.length > 0) {
            const variantIds = order.items
                .map(item => item.variant_id)
                .filter((id) => !!id);
            if (variantIds.length > 0) {
                const { data: variants } = await queryService.graph({
                    entity: "product_variant",
                    fields: ["id", "sku", "barcode"],
                    filters: {
                        id: variantIds
                    }
                });
                // Map variants to items
                const variantMap = new Map(variants.map((v) => [v.id, v]));
                order.items = order.items.map((item) => ({
                    ...item,
                    variant: variantMap.get(item.variant_id) || null
                }));
            }
        }
        const result = await documentsModuleService.generateInvoiceForOrder(order);
        if (!result || !result.invoice) {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice not generated');
        }
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
        // Use link service directly instead of workflow to avoid container issues
        const link = req.scope.resolve(utils_3.ContainerRegistrationKeys.LINK);
        // Delete old invoice link if it exists
        if (orderWithInvoice.document_invoice && orderWithInvoice.document_invoice.id) {
            try {
                await link.delete({
                    [utils_2.Modules.ORDER]: {
                        order_id: order.id
                    },
                    [documents_1.DOCUMENTS_MODULE]: {
                        document_invoice_id: orderWithInvoice.document_invoice.id
                    }
                });
            }
            catch (error) {
                // Ignore errors when deleting non-existent link
                console.warn('Error deleting old invoice link:', error);
            }
        }
        // Create new invoice link
        await link.create({
            [utils_2.Modules.ORDER]: {
                order_id: order.id
            },
            [documents_1.DOCUMENTS_MODULE]: {
                document_invoice_id: result.invoice.id
            }
        });
        res.status(201).json(result);
    }
    catch (e) {
        const errorMessage = e?.message || e?.toString() || 'An error occurred while generating the invoice';
        res.status(400).json({
            message: errorMessage
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
            const orderDto = await orderModuleService.retrieveOrder(orderId, {
                select: ['*', 'item_total', 'shipping_total', 'tax_total'],
                relations: ['shipping_address', 'billing_address', 'items']
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFPSCwyQ0FBNkM7QUFFN0MsNkRBQWdFO0FBQ2hFLHFEQUFvRDtBQUNwRCxxREFBc0U7QUFHL0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUMxRixNQUFNLGtCQUFrQixHQUF5QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDaEUsZUFBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO0lBRUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQVcsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLHNCQUFzQixDQUN2QixDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU0sS0FBSyxHQUFhLE1BQU0sa0JBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDNUUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUM7WUFDMUQsU0FBUyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxDQUFDO1NBQzVELENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtB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