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
const documents_1 = require("../../../../../modules/documents");
const GET = async (req, res) => {
    const rawRequest = req;
    const formatNumber = rawRequest.query.formatNumber;
    const forcedNumber = rawRequest.query.forcedNumber;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const nextDisplayNumber = await documentsModuleService.getTestDisplayNumber(formatNumber, forcedNumber);
        res.status(201).json({
            displayNumber: nextDisplayNumber
        });
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9pbnZvaWNlL2Rpc3BsYXktbnVtYmVyL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFNSCxnRUFBbUU7QUFHNUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxVQUFVLEdBQUcsR0FBcUIsQ0FBQztJQUN6QyxNQUFNLFlBQVksR0FBdUIsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7SUFDdkUsTUFBTSxZQUFZLEdBQXVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0lBRXZFLE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFFMUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLHNCQUFzQixDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQTtRQUN2RyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixhQUFhLEVBQUUsaUJBQWlCO1NBQ2pDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFyQlksUUFBQSxHQUFHLE9BcUJmIn0=