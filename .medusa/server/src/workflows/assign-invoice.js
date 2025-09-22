"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_1 = require("@medusajs/framework/utils");
const documents_1 = require("../modules/documents");
const assignInvoiceToOrderWorkflow = (0, workflows_sdk_1.createWorkflow)("assign-invoice-to-order", function (input) {
    (0, workflows_sdk_1.when)(input, (input) => {
        return input.oldInvoiceId !== undefined;
    }).then(() => {
        (0, core_flows_1.dismissRemoteLinkStep)([{
                [utils_1.Modules.ORDER]: {
                    order_id: input.orderId
                },
                [documents_1.DOCUMENTS_MODULE]: {
                    document_invoice_id: input.oldInvoiceId
                }
            }]);
    });
    (0, core_flows_1.createRemoteLinkStep)([{
            [utils_1.Modules.ORDER]: {
                order_id: input.orderId
            },
            [documents_1.DOCUMENTS_MODULE]: {
                document_invoice_id: input.newInvoiceId
            }
        }]);
    return new workflows_sdk_1.WorkflowResponse({});
});
exports.default = assignInvoiceToOrderWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWludm9pY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2Fzc2lnbi1pbnZvaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBSTBDO0FBQzFDLDREQUEwRjtBQUMxRixxREFBb0Q7QUFDcEQsb0RBQXdEO0FBUXhELE1BQU0sNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUNqRCx5QkFBeUIsRUFDekIsVUFBVSxLQUFnQztJQUV4QyxJQUFBLG9CQUFJLEVBQ0YsS0FBSyxFQUNMLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO0lBQzFDLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixJQUFBLGtDQUFxQixFQUFDLENBQUM7Z0JBQ3JCLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNmLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTztpQkFDeEI7Z0JBQ0QsQ0FBQyw0QkFBZ0IsQ0FBQyxFQUFFO29CQUNsQixtQkFBbUIsRUFBRSxLQUFLLENBQUMsWUFBWTtpQkFDeEM7YUFDRixDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxpQ0FBb0IsRUFBQyxDQUFDO1lBQ3BCLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNmLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTzthQUN4QjtZQUNELENBQUMsNEJBQWdCLENBQUMsRUFBRTtnQkFDbEIsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLFlBQVk7YUFDeEM7U0FDRixDQUFDLENBQUMsQ0FBQTtJQUVILE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQTtBQUVELGtCQUFlLDRCQUE0QixDQUFBIn0=