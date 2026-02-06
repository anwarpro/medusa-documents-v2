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

import { DocumentSettingsDTO } from '../../../../../../types/dto';
import { OrderDTO } from "@medusajs/framework/types";
import * as QRCode from 'qrcode';

export async function generateHeaderForLogo(doc, y: number, x: number, documentSettings: DocumentSettingsDTO, order: OrderDTO): Promise<number> {
  doc
    .fillColor("#000000")
    .fontSize(12)
    .font("Bold")
    .text("Musafir Trading", x, y)
    .fontSize(10)
    .font("Regular")
    .text(`Bank: `, x, y + 15, { continued: true })
    .font("Bold").text("Standard Bank")
    .font("Regular").text(`Account Type: `, x, y + 30, { continued: true })
    .font("Bold").text("Account Type") // Default or placeholder if not in settings
    .font("Regular").text(`Acc.No: `, x, y + 45, { continued: true })
    .font("Bold").text("10 111 45 88 52")
    .font("Regular").text(`Branch: `, x, y + 60, { continued: true })
    .font("Bold").text("1110")
    .font("Regular");

  // QR Code Generation
  try {
    const qrData = `Order: ${order.display_id}\nTotal: ${(order as any).total / 100}`;
    const qrCodeDataUrl = await QRCode.toDataURL(qrData);
    doc.image(qrCodeDataUrl, x, y + 80, { width: 80 });
  } catch (err) {
    console.error('QR Code generation failed', err);
  }

  return y + 170;
}