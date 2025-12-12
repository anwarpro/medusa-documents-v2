import {
  createWorkflow,
  createStep,
  when,
  WorkflowResponse,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { DOCUMENTS_MODULE } from "../modules/documents";

type AssignPackingSlipToOrderInput = {
  orderId: string,
  newPackingSlipId: string,
  oldPackingSlipId?: string
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

const assignPackingSlipToOrderWorkflow = createWorkflow(
  "assign-packing-slip-to-order",
  function (input: AssignPackingSlipToOrderInput) {

    when(
      input,
      (input) => {
        return input.oldPackingSlipId !== undefined;
      }
    ).then(() => {
      dismissRemoteLinkStep([{
        [Modules.ORDER]: {
          order_id: input.orderId
        },
        [DOCUMENTS_MODULE]: {
          document_packing_slip_id: input.oldPackingSlipId!
        }
      }])
    })

    createRemoteLinkStep([{
      [Modules.ORDER]: {
        order_id: input.orderId
      },
      [DOCUMENTS_MODULE]: {
        document_packing_slip_id: input.newPackingSlipId
      }
    }])

    return new WorkflowResponse({})
  }
)

export default assignPackingSlipToOrderWorkflow