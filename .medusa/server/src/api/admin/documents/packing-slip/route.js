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
const assign_packing_slip_1 = __importDefault(require("./../../../../workflows/assign-packing-slip"));
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
            const result = await documentsModuleService.generatePackingSlipForOrder(order);
            if (result.packingSlip) {
                const query = req.scope.resolve(utils_3.ContainerRegistrationKeys.QUERY);
                const { data: [orderWithPackingSlip], } = await query.graph({
                    entity: "order",
                    filters: {
                        id: [
                            order.id
                        ]
                    },
                    fields: [
                        "document_packing_slip.*",
                    ],
                });
                await (0, assign_packing_slip_1.default)(req.scope)
                    .run({
                    input: {
                        orderId: order.id,
                        newPackingSlipId: result.packingSlip.id,
                        oldPackingSlipId: orderWithPackingSlip.document_packing_slip ? orderWithPackingSlip.document_packing_slip.id : undefined
                    }
                });
                res.status(201).json(result);
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Packing slip not generated');
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
        const { data: [orderWithPackingSlip], } = await query.graph({
            entity: "order",
            filters: {
                id: [
                    orderId
                ]
            },
            fields: [
                "document_packing_slip.*",
            ],
        });
        if (orderWithPackingSlip.document_packing_slip && orderId) {
            const orderModuleService = req.scope.resolve(utils_2.Modules.ORDER);
            const orderDto = await orderModuleService.retrieveOrder(orderId, {
                select: ['*', 'item_total', 'shipping_total', 'tax_total'],
                relations: ['shipping_address', 'billing_address', 'items']
            });
            const result = await documentsModuleService.getPackingSlip(orderDto, orderWithPackingSlip.document_packing_slip.id, includeBuffer !== undefined);
            res.status(200).json(result);
        }
        else {
            const result = {
                packingSlip: undefined
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9wYWNraW5nLXNsaXAvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7Ozs7OztBQU9ILDJDQUE2QztBQUU3Qyw2REFBZ0U7QUFDaEUscURBQW9EO0FBQ3BELHFEQUFzRTtBQUN0RSxzR0FBMEY7QUFHbkYsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUMxRixNQUFNLGtCQUFrQixHQUF5QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDaEUsZUFBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO0lBRUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQVcsQ0FBQztRQUNsQyxNQUFNLEtBQUssR0FBYSxNQUFNLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzVFLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1lBQzFELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztTQUM1RCxDQUFDLENBQUE7UUFDRixJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM5RSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FB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