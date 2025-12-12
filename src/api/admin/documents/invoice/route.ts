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

import type { 
  MedusaRequest, 
  MedusaResponse,
} from "@medusajs/framework/http"
import { IOrderModuleService, OrderDTO } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/utils"
import DocumentsModuleService from "../../../../modules/documents/service"
import { DOCUMENTS_MODULE } from "../../../../modules/documents"
import { Modules } from "@medusajs/framework/utils";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";


export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  const documentsModuleService: DocumentsModuleService = req.scope.resolve(DOCUMENTS_MODULE)
  const orderModuleService: IOrderModuleService  = req.scope.resolve(
    Modules.ORDER
  );

  try {
    const body: any = req.body as any;
    
    if (!body || !body.order_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Order ID is required'
      );
    }

    const order: OrderDTO = await orderModuleService.retrieveOrder(body.order_id, {
      select: ['*', 'item_total', 'shipping_total', 'tax_total'],
      relations: ['shipping_address', 'billing_address', 'items']
    })
    
    if (!order) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        'Order not found'
      );
    }

    // Fetch variant data for items using query
    const queryService = req.scope.resolve(ContainerRegistrationKeys.QUERY);
    if (order.items && order.items.length > 0) {
      const variantIds = order.items
        .map(item => item.variant_id)
        .filter((id): id is string => !!id);
      
      if (variantIds.length > 0) {
        const { data: variants } = await queryService.graph({
          entity: "product_variant",
          fields: ["id", "sku", "barcode"],
          filters: {
            id: variantIds
          }
        });

        // Map variants to items
        const variantMap = new Map(variants.map((v: any) => [v.id, v]));
        order.items = order.items.map((item: any) => ({
          ...item,
          variant: variantMap.get(item.variant_id) || null
        }));
      }
    }

    const result = await documentsModuleService.generateInvoiceForOrder(order)
    
    if (!result || !result.invoice) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Invoice not generated'
      );
    }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    const { 
      data: [orderWithInvoice],
    } = await query.graph({
      entity: "order",
      filters: {
        id: [
          order.id
        ]
      },
      fields: [
        "document_invoice.*",
      ],
    });
    
    // Use link service directly instead of workflow to avoid container issues
    const link = req.scope.resolve(ContainerRegistrationKeys.LINK);
    
    // Delete old invoice link if it exists
    if (orderWithInvoice.document_invoice && orderWithInvoice.document_invoice.id) {
      try {
        await link.delete({
          [Modules.ORDER]: {
            order_id: order.id
          },
          [DOCUMENTS_MODULE]: {
            document_invoice_id: orderWithInvoice.document_invoice.id
          }
        });
      } catch (error) {
        // Ignore errors when deleting non-existent link
        console.warn('Error deleting old invoice link:', error);
      }
    }
    
    // Create new invoice link
    await link.create({
      [Modules.ORDER]: {
        order_id: order.id
      },
      [DOCUMENTS_MODULE]: {
        document_invoice_id: result.invoice.id
      }
    });

    res.status(201).json(result);
  } catch (e: any) {
    const errorMessage = e?.message || e?.toString() || 'An error occurred while generating the invoice';
    res.status(400).json({
      message: errorMessage
    })
  }
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  const documentsModuleService: DocumentsModuleService = req.scope.resolve(DOCUMENTS_MODULE)

  const orderId = req.query.orderId as string;
  const includeBuffer = req.query.includeBuffer;

  try {
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
    const { 
      data: [orderWithInvoice],
    } = await query.graph({
      entity: "order",
      filters: {
        id: [
          orderId
        ]
      },
      fields: [
        "document_invoice.*",
      ],
    });
    if (orderWithInvoice.document_invoice && orderId) {
      const orderModuleService: IOrderModuleService  = req.scope.resolve(
        Modules.ORDER
      );
      const orderDto = await orderModuleService.retrieveOrder(orderId, 
        {
          select: ['*', 'item_total', 'shipping_total', 'tax_total'],
          relations: ['shipping_address', 'billing_address', 'items']
        }
      );
      const result = await documentsModuleService.getInvoice(orderDto, orderWithInvoice.document_invoice.id, includeBuffer !== undefined);
      res.status(200).json(result);
    } else {
      const result = {
        invoice: undefined
      }
      res.status(200).json(result);
    }
  } catch (e) {
    res.status(400).json({
        message: e.message
    })
  }
}