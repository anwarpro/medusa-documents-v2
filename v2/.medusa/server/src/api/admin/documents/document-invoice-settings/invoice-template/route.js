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
exports.POST = void 0;
const documents_1 = require("../../../../../modules/documents");
const POST = async (req, res) => {
    const body = req.body;
    const invoiceTemplate = body.template;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const newSettings = await documentsModuleService.updateInvoiceTemplate(invoiceTemplate);
        if (newSettings !== undefined) {
            res.status(201).json({
                settings: newSettings
            });
        }
        else {
            res.status(400).json({
                message: 'Cant update invoice template'
            });
        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9kb2N1bWVudC1pbnZvaWNlLXNldHRpbmdzL2ludm9pY2UtdGVtcGxhdGUvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7OztBQU9ILGdFQUFtRTtBQUk1RCxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsSUFBVyxDQUFDO0lBQ2xDLE1BQU0sZUFBZSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzFELE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFFMUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxlQUFzQyxDQUFDLENBQUE7UUFDOUcsSUFBSSxXQUFXLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLFFBQVEsRUFBRSxXQUFXO2FBQ3RCLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSw4QkFBOEI7YUFDeEMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUdILENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUEzQlksUUFBQSxJQUFJLFFBMkJoQiJ9