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
const documents_1 = require("../../../../../modules/documents");
const GET = async (req, res) => {
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        const lastDocumentSettings = await documentsModuleService.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        res.status(200).json({
            logoSource: lastDocumentSettings && lastDocumentSettings.length ? lastDocumentSettings[0].storeLogoSource : undefined
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
    const logoSource = body.logoSource;
    const documentsModuleService = req.scope.resolve(documents_1.DOCUMENTS_MODULE);
    try {
        if (logoSource !== undefined) {
            const newSettings = await documentsModuleService.updateStoreLogo(logoSource);
            if (newSettings !== undefined) {
                res.status(201).json({
                    settings: newSettings
                });
            }
            else {
                res.status(400).json({
                    message: 'Cant update logo'
                });
            }
        }
        else {
            res.status(400).json({
                message: 'Logo not passed'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2RvY3VtZW50cy9kb2N1bWVudC1zZXR0aW5ncy9sb2dvL3JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7QUFPSCxnRUFBbUU7QUFHNUQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxzQkFBc0IsR0FBMkIsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQWdCLENBQUMsQ0FBQTtJQUUxRixJQUFJLENBQUM7UUFDSCxNQUFNLG9CQUFvQixHQUFHLE1BQU0sc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFO1lBQ2pGLEtBQUssRUFBRTtnQkFDTCxVQUFVLEVBQUUsTUFBTTthQUNuQjtZQUNELElBQUksRUFBRSxDQUFDO1NBQ1IsQ0FBQyxDQUFBO1FBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsVUFBVSxFQUFFLG9CQUFvQixJQUFJLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQ3RILENBQUMsQ0FBQztJQUVMLENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDbkIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ25CLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUF2QlksUUFBQSxHQUFHLE9BdUJmO0FBRU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQVcsQ0FBQztJQUNsQyxNQUFNLFVBQVUsR0FBdUIsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN2RCxNQUFNLHNCQUFzQixHQUEyQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyw0QkFBZ0IsQ0FBQyxDQUFBO0lBRTFGLElBQUksQ0FBQztRQUNILElBQUksVUFBVSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzdCLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0JBQXNCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdFLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsUUFBUSxFQUFFLFdBQVc7aUJBQ3RCLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sQ0FBQztnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsT0FBTyxFQUFFLGtCQUFrQjtpQkFDNUIsQ0FBQyxDQUFBO1lBQ0osQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxpQkFBaUI7YUFDM0IsQ0FBQyxDQUFBO1FBQ0osQ0FBQztJQUVILENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPO1NBQ3JCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDLENBQUE7QUFoQ1ksUUFBQSxJQUFJLFFBZ0NoQiJ9