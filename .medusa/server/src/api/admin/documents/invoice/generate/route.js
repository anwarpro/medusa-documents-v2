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
            const result = await documentsModuleService.generateTestInvoice(lastOrders[0], templateKind);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL2dlbmVyYXRlL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFNSCwyQ0FBNkM7QUFJN0MsZ0VBQW1FO0FBRW5FLHFEQUFvRDtBQUU3QyxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLHNCQUFzQixHQUEyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFBO0lBRTFGLE1BQU0sa0JBQWtCLEdBQXlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUNoRSxlQUFPLENBQUMsS0FBSyxDQUNkLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBZSxNQUFNLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUU7UUFDckUsS0FBSyxFQUFFO1lBQ0wsVUFBVSxFQUFFLE1BQU07U0FDbkI7UUFDRCxJQUFJLEVBQUUsQ0FBQztRQUNQLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDO1FBQzFELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztLQUM1RCxDQUFDLENBQUE7SUFDRixJQUFJLENBQUM7UUFDSCxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsTUFBTSxVQUFVLEdBQUcsR0FBcUIsQ0FBQztZQUN6QyxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFtQyxDQUFDLENBQUE7WUFDbkgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUM5QixvREFBb0QsQ0FDckQsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztTQUNyQixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBcENZLFFBQUEsR0FBRyxPQW9DZiJ9