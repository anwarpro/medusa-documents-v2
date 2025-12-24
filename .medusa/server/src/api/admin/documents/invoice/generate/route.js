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
exports.GET = void 0;
const utils_1 = require("@medusajs/utils");
const documents_1 = require("../../../../../modules/documents");
const utils_2 = require("@medusajs/framework/utils");
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    const orderModuleService = req.scope.resolve(utils_2.Modules.ORDER);
    const lastOrders = await orderModuleService.listOrders({}, {
        order: {
            created_at: "DESC"
        },
        take: 1,
        select: ['*', 'item_total', 'shipping_total', 'tax_total'],
        relations: ['shipping_address', 'billing_address', 'items']
    });
    try {
        if (lastOrders && lastOrders.length) {
            const order = lastOrders[0];
            // Enrich order items with variant data (SKU, barcode)
            const query = req.scope.resolve(utils_2.ContainerRegistrationKeys.QUERY);
            const variantIds = order.items?.map(item => item.variant_id).filter(Boolean) || [];
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
            const rawRequest = req;
            const templateKind = rawRequest.query.template;
            const result = await documentsModuleService.generateTestInvoice(order, templateKind);
            res.status(201).json(result);
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'You need to have at least one order to see preview');
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL2dlbmVyYXRlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFNSCwyQ0FBNkM7QUFJN0MsZ0VBQW1FO0FBRW5FLHFEQUErRTtBQUV4RSxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLHNCQUFzQixHQUEyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFBO0lBRTFGLE1BQU0sa0JBQWtCLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoRSxlQUFPLENBQUMsS0FBSyxDQUNkLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBZSxNQUFNLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUU7UUFDckUsS0FBSyxFQUFFO1lBQ0wsVUFBVSxFQUFFLE1BQU07U0FDbkI7UUFDRCxJQUFJLEVBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1FBQzFELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztLQUM1RCxDQUFDLENBQUE7SUFDRixJQUFJLENBQUM7UUFDSCxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLHNEQUFzRDtZQUN0RCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRW5GLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxTQUFTO29CQUNqQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUM7b0JBQzVDLE9BQU8sRUFBRTt3QkFDUCxFQUFFLEVBQUUsVUFBVTtxQkFDZjtpQkFDRixDQUFDLENBQUM7Z0JBRUgsK0JBQStCO2dCQUMvQixLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7b0JBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUNaLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN6QixDQUFDO29CQUNELE9BQU8sSUFBSSxDQUFDO2dCQUNkLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7WUFDekMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsWUFBbUMsQ0FBQyxDQUFBO1lBQzNHLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsb0RBQW9ELENBQ3JELENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQTtBQTdEWSxRQUFBLEdBQUcsT0E2RGYifQ==