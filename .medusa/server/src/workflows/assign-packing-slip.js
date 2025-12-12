"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const documents_1 = require("../modules/documents");
// Custom step to create remote link without importing from core-flows
const createRemoteLinkStep = (0, workflows_sdk_1.createStep)("create-remote-link", async (input, { container }) => {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    for (const linkData of input) {
        await link.create(linkData);
    }
    return new workflows_sdk_1.StepResponse(void 0);
});
// Custom step to dismiss remote link without importing from core-flows
const dismissRemoteLinkStep = (0, workflows_sdk_1.createStep)("dismiss-remote-link", async (input, { container }) => {
    const link = container.resolve(utils_1.ContainerRegistrationKeys.LINK);
    for (const linkData of input) {
        await link.delete(linkData);
    }
    return new workflows_sdk_1.StepResponse(void 0);
});
const assignPackingSlipToOrderWorkflow = (0, workflows_sdk_1.createWorkflow)("assign-packing-slip-to-order", function (input) {
    (0, workflows_sdk_1.when)(input, (input) => {
        return input.oldPackingSlipId !== undefined;
    }).then(() => {
        dismissRemoteLinkStep([{
                [utils_1.Modules.ORDER]: {
                    order_id: input.orderId
                },
                [documents_1.DOCUMENTS_MODULE]: {
                    document_packing_slip_id: input.oldPackingSlipId
                }
            }]);
    });
    createRemoteLinkStep([{
            [utils_1.Modules.ORDER]: {
                order_id: input.orderId
            },
            [documents_1.DOCUMENTS_MODULE]: {
                document_packing_slip_id: input.newPackingSlipId
            }
        }]);
    return new workflows_sdk_1.WorkflowResponse({});
});
exports.default = assignPackingSlipToOrderWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXBhY2tpbmctc2xpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvYXNzaWduLXBhY2tpbmctc2xpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQU0wQztBQUMxQyxxREFBK0U7QUFDL0Usb0RBQXdEO0FBUXhELHNFQUFzRTtBQUN0RSxNQUFNLG9CQUFvQixHQUFHLElBQUEsMEJBQVUsRUFDckMsb0JBQW9CLEVBQ3BCLEtBQUssRUFBRSxLQUFvRCxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtJQUM1RSxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxFQUFFLENBQUM7UUFDN0IsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDRCxPQUFPLElBQUksNEJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FDRixDQUFDO0FBRUYsdUVBQXVFO0FBQ3ZFLE1BQU0scUJBQXFCLEdBQUcsSUFBQSwwQkFBVSxFQUN0QyxxQkFBcUIsRUFDckIsS0FBSyxFQUFFLEtBQW9ELEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQzVFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE9BQU8sSUFBSSw0QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUNGLENBQUM7QUFFRixNQUFNLGdDQUFnQyxHQUFHLElBQUEsOEJBQWMsRUFDckQsOEJBQThCLEVBQzlCLFVBQVUsS0FBb0M7SUFFNUMsSUFBQSxvQkFBSSxFQUNGLEtBQUssRUFDTCxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDO0lBQzlDLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixxQkFBcUIsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDZixRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU87aUJBQ3hCO2dCQUNELENBQUMsNEJBQWdCLENBQUMsRUFBRTtvQkFDbEIsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLGdCQUFpQjtpQkFDbEQ7YUFDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBRUYsb0JBQW9CLENBQUMsQ0FBQztZQUNwQixDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDZixRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDeEI7WUFDRCxDQUFDLDRCQUFnQixDQUFDLEVBQUU7Z0JBQ2xCLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxnQkFBZ0I7YUFDakQ7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUVILE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQTtBQUVELGtCQUFlLGdDQUFnQyxDQUFBIn0=