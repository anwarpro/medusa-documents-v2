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

import PDFDocument from 'pdfkit';
import { OrderDTO } from "@medusajs/framework/types"
import { generateCustomerInformation } from "./parts/musafir/customer-info";
import { generateInvoiceTable } from "./parts/musafir/table";
import { generateInvoiceInformation } from "./parts/musafir/invoice-info";
import { generateHeaderForLogo } from "./parts/musafir/header-for-logo";
import { generateHeaderLogo } from "./parts/musafir/header-logo";
import path from "path";
import { DocumentInvoiceDTO, DocumentSettingsDTO } from '../../../../types/dto';

export function validateInput(settings?: DocumentSettingsDTO): ([boolean, string]) {
  return [true, ''];
}

export default async (settings: DocumentSettingsDTO, invoice: DocumentInvoiceDTO, order: OrderDTO): Promise<Buffer> => {
  var doc = new PDFDocument();
  doc.registerFont('Regular', path.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Regular.ttf'))
  doc.registerFont('Bold', path.resolve(__dirname, '../../../../assets/fonts/IBMPlexSans-Bold.ttf'))
  doc.font('Regular');

  const buffers = []
  doc.on("data", buffers.push.bind(buffers))

  // Header section starts at Y=30
  const startY = 100;

  // Three columns for the header information
  const leftColX = 50;
  const midColX = 230;
  const rightColX = 410;

  const endLeft = generateInvoiceInformation(doc, startY, leftColX, invoice, order);
  const endMid = generateCustomerInformation(doc, startY, midColX, order);
  const endRight = await generateHeaderForLogo(doc, startY, rightColX, settings, order);

  const tableStartY = Math.max(endLeft, endMid, endRight) + 20;

  generateInvoiceTable(doc, tableStartY, order, order.items || []);

  doc.end();

  const bufferPromise = new Promise<Buffer>(resolve => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })
  })

  return await bufferPromise;
};