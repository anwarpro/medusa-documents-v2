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
        const lastDocumentPackingSlipSettings = await documentsModuleService.listDocumentPackingSlipSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        res.status(200).json({
            settings: lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length ? lastDocumentPackingSlipSettings[0] : undefined
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
    const template = body.template;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const newSettings = await documentsModuleService.updatePackingSlipSettings(formatNumber, forcedNumber, template);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9kb2N1bWVudC1wYWNraW5nLXNsaXAtc2V0dGluZ3Mvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7OztBQU9ILDZEQUFnRTtBQUl6RCxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLHNCQUFzQixHQUEyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFBO0lBRTFGLElBQUksQ0FBQztRQUNILE1BQU0sK0JBQStCLEdBQUcsTUFBTSxzQkFBc0IsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFLEVBQUU7WUFDdkcsS0FBSyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxNQUFNO2FBQ25CO1lBQ0QsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDLENBQUE7UUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixRQUFRLEVBQUUsK0JBQStCLElBQUksK0JBQStCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNySSxDQUFDLENBQUM7SUFFTCxDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ25CLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBdkJZLFFBQUEsR0FBRyxPQXVCZjtBQUVNLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUVGLE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFXLENBQUM7SUFDbEMsTUFBTSxZQUFZLEdBQXVCLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0QsTUFBTSxZQUFZLEdBQXVCLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0QsTUFBTSxRQUFRLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkQsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUUxRixJQUFJLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFzQixDQUFDLHlCQUF5QixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsUUFBbUMsQ0FBQyxDQUFBO1FBQzNJLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixRQUFRLEVBQUUsV0FBVzthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDO2FBQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNuQixPQUFPLEVBQUUsOEJBQThCO2FBQ3hDLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFHSCxDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNYLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTztTQUNyQixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBN0JZLFFBQUEsSUFBSSxRQTZCaEIifQ==