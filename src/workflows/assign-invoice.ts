import {
  createWorkflow,
  createStep,
  when,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { DOCUMENTS_MODULE } from "../modules/documents";

type AssignInvoiceToOrderInput = {
  orderId: string,
  newInvoiceId: string,
  oldInvoiceId?: string
}

// Custom step to create remote link without importing from core-flows
const createRemoteLinkStep = createStep(
  "create-remote-link",
  async (input: Array<Record<string, Record<string, string>>>, { container }) => {
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    for (const linkData of input) {
      await link.create(linkData);
    }
    return new StepResponse(void 0);
  }
);

// Custom step to dismiss remote link without importing from core-flows
const dismissRemoteLinkStep = createStep(
  "dismiss-remote-link",
  async (input: Array<Record<string, Record<string, string>>>, { container }) => {
    const link = container.resolve(ContainerRegistrationKeys.LINK);
    for (const linkData of input) {
      await link.delete(linkData);
    }
    return new StepResponse(void 0);
  }
);

const assignInvoiceToOrderWorkflow = createWorkflow(
  "assign-invoice-to-order",
  function (input: AssignInvoiceToOrderInput) {

    when(
      input,
      (input) => {
        return input.oldInvoiceId !== undefined;
      }
    ).then(() => {
      dismissRemoteLinkStep([{
        [Modules.ORDER]: {
          order_id: input.orderId
        },
        [DOCUMENTS_MODULE]: {
          document_invoice_id: input.oldInvoiceId!
        }
      }])
    })

    createRemoteLinkStep([{
      [Modules.ORDER]: {
        order_id: input.orderId
      },
      [DOCUMENTS_MODULE]: {
        document_invoice_id: input.newInvoiceId
      }
    }])

    return new WorkflowResponse({})
  }
)

export default assignInvoiceToOrderWorkflow