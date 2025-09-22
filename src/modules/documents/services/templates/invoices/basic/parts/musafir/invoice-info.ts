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

import {DocumentInvoiceDTO} from "../../../../../../../../modules/documents/types/dto";
import {t} from "i18next";
import {OrderDTO} from "@medusajs/framework/types";

export function generateInvoiceInformation(doc, y: number, invoice: DocumentInvoiceDTO, order: OrderDTO): number {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text(t("invoice", "Invoice"), 350, y);

    const invoiceInformationTop = y + 40;

    doc
        .fontSize(10)
        .text(`${t("invoice-number", "Invoice number")}:`, 350, invoiceInformationTop)
        .font("Bold")
        .text(invoice.displayNumber, 450, invoiceInformationTop)
        .font("Regular")
        .text(`${t("invoice-date", "Invoice date")}:`, 350, invoiceInformationTop + 15)
        .text(invoice.created_at.toLocaleDateString(), 450, invoiceInformationTop + 15)
        .text("Order:", 350, invoiceInformationTop + 15 + 15)
        .font("Bold")
        .text(`#${order.display_id}`, 450, invoiceInformationTop + 15 + 15)
        .moveDown();

    return invoiceInformationTop + 30;
}