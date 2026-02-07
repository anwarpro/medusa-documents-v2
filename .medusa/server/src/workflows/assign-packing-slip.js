"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_1 = require("@medusajs/framework/utils");
const documents_1 = require("../modules/documents");
const assignPackingSlipToOrderWorkflow = (0, workflows_sdk_1.createWorkflow)("assign-packing-slip-to-order", function (input) {
    (0, workflows_sdk_1.when)(input, (input) => {
        return input.oldPackingSlipId !== undefined;
    }).then(() => {
        (0, core_flows_1.dismissRemoteLinkStep)([{
                [utils_1.Modules.ORDER]: {
                    order_id: input.orderId
                },
                [documents_1.DOCUMENTS_MODULE]: {
                    document_packing_slip_id: input.oldPackingSlipId
                }
            }]);
    });
    (0, core_flows_1.createRemoteLinkStep)([{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXBhY2tpbmctc2xpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvYXNzaWduLXBhY2tpbmctc2xpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFFQUkwQztBQUMxQyw0REFBMEY7QUFDMUYscURBQW9EO0FBQ3BELG9EQUF3RDtBQVF4RCxNQUFNLGdDQUFnQyxHQUFHLElBQUEsOEJBQWMsRUFDckQsOEJBQThCLEVBQzlCLFVBQVUsS0FBb0M7SUFFNUMsSUFBQSxvQkFBSSxFQUNGLEtBQUssRUFDTCxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxDQUFDO0lBQzlDLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixJQUFBLGtDQUFxQixFQUFDLENBQUM7Z0JBQ3JCLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNmLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTztpQkFDeEI7Z0JBQ0QsQ0FBQyw0QkFBZ0IsQ0FBQyxFQUFFO29CQUNsQix3QkFBd0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO2lCQUNqRDthQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLENBQUM7WUFDcEIsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3hCO1lBQ0QsQ0FBQyw0QkFBZ0IsQ0FBQyxFQUFFO2dCQUNsQix3QkFBd0IsRUFBRSxLQUFLLENBQUMsZ0JBQWdCO2FBQ2pEO1NBQ0YsQ0FBQyxDQUFDLENBQUE7SUFFSCxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUE7QUFFRCxrQkFBZSxnQ0FBZ0MsQ0FBQSJ9