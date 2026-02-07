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
exports.POST = exports.GET = void 0;
const documents_1 = require("../../../../modules/documents");
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const lastDocumentInvoiceSettings = await documentsModuleService.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        res.status(200).json({
            settings: lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length ? lastDocumentInvoiceSettings[0] : undefined
        });
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};
exports.GET = GET;
const POST = async (req, res) => {
    const body = req.body;
    const formatNumber = body.formatNumber;
    const forcedNumber = body.forcedNumber;
    const invoiceTemplate = body.template;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const newSettings = await documentsModuleService.updateInvoiceSettings(formatNumber, forcedNumber, invoiceTemplate);
        if (newSettings !== undefined) {
            res.status(201).json({
                settings: newSettings
            });
        }
        else {
            res.status(400).json({
                message: 'Cant update invoice settings'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9kb2N1bWVudC1pbnZvaWNlLXNldHRpbmdzL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFPSCw2REFBZ0U7QUFJekQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUUxRixJQUFJLENBQUM7UUFDSCxNQUFNLDJCQUEyQixHQUFHLE1BQU0sc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsRUFBRSxFQUFFO1lBQy9GLEtBQUssRUFBRTtnQkFDTCxVQUFVLEVBQUUsTUFBTTthQUNuQjtZQUNELElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsUUFBUSxFQUFFLDJCQUEyQixJQUFJLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDekgsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQTtBQXZCWSxRQUFBLEdBQUcsT0F1QmY7QUFFTSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLElBQUksR0FBUSxHQUFHLENBQUMsSUFBVyxDQUFDO0lBQ2xDLE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNELE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNELE1BQU0sZUFBZSxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDO0lBQzFELE1BQU0sc0JBQXNCLEdBQTJCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDRCQUFnQixDQUFDLENBQUE7SUFFMUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGVBQXNDLENBQUMsQ0FBQTtRQUMxSSxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsUUFBUSxFQUFFLFdBQVc7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkIsT0FBTyxFQUFFLDhCQUE4QjthQUN4QyxDQUFDLENBQUE7UUFDSixDQUFDO0lBR0gsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDWCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQTtBQTdCWSxRQUFBLElBQUksUUE2QmhCIn0=