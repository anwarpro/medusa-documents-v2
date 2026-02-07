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

import { DocumentInvoiceDTO } from "../../../../../../../../modules/documents/types/dto";
import { t } from "i18next";
import { OrderDTO } from "@medusajs/framework/types";

export function generateInvoiceInformation(doc, y: number, x: number, invoice: DocumentInvoiceDTO, order: OrderDTO): number {
    doc
        .fillColor("#000000")
        .fontSize(10)
        .font("Bold")
        .text(`Order date:`, x, y)
        .font("Regular")
        .text(`${new Date(order.created_at).toDateString()}`, x + 60, y)

        .font("Bold")
        .text(`Order number:`, x, y + 15)
        .font("Regular")
        .fillColor("#3b82f6") // Blue for order number link
        .text(`${order.display_id}`, x + 75, y + 15)
        .fillColor("#000000")

        .moveDown(0.5)
        .font("Bold")
        .fontSize(12)
        .text(`Payment method`, x, y + 40)
        .fontSize(10)
        .font("Bold")
        .text(`Payment details`, x, y + 55)
        .font("Regular")
        .text(`${(order as any).total / 100} paid at`, x, y + 70)
        .text(`${new Date(invoice.created_at).toLocaleString()}`, x, y + 85);

    return y + 100;
}