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
            const rawRequest = req;
            const templateKind = rawRequest.query.template;
            const result = await documentsModuleService.generateTestPackingSlip(lastOrders[0], templateKind);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9wYWNraW5nLXNsaXAvcHJldmlldy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7O0FBTUgsMkNBQTZDO0FBRzdDLGdFQUFtRTtBQUVuRSxxREFBb0Q7QUFFN0MsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUUxRixNQUFNLGtCQUFrQixHQUF5QixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDaEUsZUFBTyxDQUFDLEtBQUssQ0FDZCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQWUsTUFBTSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFO1FBQ3JFLEtBQUssRUFBRTtZQUNMLFVBQVUsRUFBRSxNQUFNO1NBQ25CO1FBQ0QsSUFBSSxFQUFFLENBQUM7UUFDUCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBQztRQUMxRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7S0FDNUQsQ0FBQyxDQUFBO0lBQ0YsSUFBSSxDQUFDO1FBQ0gsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7WUFDekMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBdUMsQ0FBQyxDQUFBO1lBQzNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksRUFDOUIsb0RBQW9ELENBQ3JELENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQTtBQXBDWSxRQUFBLEdBQUcsT0FvQ2YifQ==