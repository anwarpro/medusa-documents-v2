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
const assignInvoiceToOrderWorkflow = (0, workflows_sdk_1.createWorkflow)("assign-invoice-to-order", function (input) {
    (0, workflows_sdk_1.when)(input, (input) => {
        return input.oldInvoiceId !== undefined;
    }).then(() => {
        dismissRemoteLinkStep([{
                [utils_1.Modules.ORDER]: {
                    order_id: input.orderId
                },
                [documents_1.DOCUMENTS_MODULE]: {
                    document_invoice_id: input.oldInvoiceId
                }
            }]);
    });
    createRemoteLinkStep([{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWludm9pY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2Fzc2lnbi1pbnZvaWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBTTBDO0FBQzFDLHFEQUErRTtBQUMvRSxvREFBd0Q7QUFReEQsc0VBQXNFO0FBQ3RFLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSwwQkFBVSxFQUNyQyxvQkFBb0IsRUFDcEIsS0FBSyxFQUFFLEtBQW9ELEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQzVFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsS0FBSyxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUM3QixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNELE9BQU8sSUFBSSw0QkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUNGLENBQUM7QUFFRix1RUFBdUU7QUFDdkUsTUFBTSxxQkFBcUIsR0FBRyxJQUFBLDBCQUFVLEVBQ3RDLHFCQUFxQixFQUNyQixLQUFLLEVBQUUsS0FBb0QsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDNUUsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvRCxLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0QsT0FBTyxJQUFJLDRCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQ0YsQ0FBQztBQUVGLE1BQU0sNEJBQTRCLEdBQUcsSUFBQSw4QkFBYyxFQUNqRCx5QkFBeUIsRUFDekIsVUFBVSxLQUFnQztJQUV4QyxJQUFBLG9CQUFJLEVBQ0YsS0FBSyxFQUNMLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixPQUFPLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxDQUFDO0lBQzFDLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixxQkFBcUIsQ0FBQyxDQUFDO2dCQUNyQixDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDZixRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU87aUJBQ3hCO2dCQUNELENBQUMsNEJBQWdCLENBQUMsRUFBRTtvQkFDbEIsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLFlBQWE7aUJBQ3pDO2FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUVGLG9CQUFvQixDQUFDLENBQUM7WUFDcEIsQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3hCO1lBQ0QsQ0FBQyw0QkFBZ0IsQ0FBQyxFQUFFO2dCQUNsQixtQkFBbUIsRUFBRSxLQUFLLENBQUMsWUFBWTthQUN4QztTQUNGLENBQUMsQ0FBQyxDQUFBO0lBRUgsT0FBTyxJQUFJLGdDQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ2pDLENBQUMsQ0FDRixDQUFBO0FBRUQsa0JBQWUsNEJBQTRCLENBQUEifQ==