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
        const order = await orderModuleService.retrieveOrder(body.order_id, {
            select: ['*', 'item_total', 'shipping_total', 'tax_total'],
            relations: ['shipping_address', 'billing_address', 'items']
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7Ozs7QUFPSCwyQ0FBNkM7QUFFN0MsNkRBQWdFO0FBQ2hFLHFEQUFvRDtBQUNwRCxxREFBc0U7QUFDdEUsMEZBQStFO0FBR3hFLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUVGLE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFDMUYsTUFBTSxrQkFBa0IsR0FBeUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ2hFLGVBQU8sQ0FBQyxLQUFLLENBQ2QsQ0FBQztJQUVGLElBQUksQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFXLENBQUM7UUFDbEMsTUFBTSxLQUFLLEdBQWEsTUFBTSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1RSxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztZQUMxRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7U0FDNUQsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQXNCLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDMUUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FB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