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

import { OrderDTO } from "@medusajs/framework/types"

export function generateCustomerInformation(doc, y: number, x: number, order: OrderDTO): number {
    doc
        .fillColor("#000000")
        .fontSize(12)
        .font("Bold")
        .text(`Shipping Address`, x, y)
        .font("Regular")
        .fontSize(10);

    if (order.shipping_address) {
        const address = order.shipping_address;
        doc
            .text(`${address.first_name} ${address.last_name}`, x, y + 15)
            .text(`${address.address_1}`, x, y + 30, { width: 150 })
            .text(`${address.city}, ${address.province || ''} ${address.postal_code}`, x, y + 45)
            .text(`Contact:`, x, y + 60)
            .text(`${address.phone || order.email}`, x, y + 75);
    }

    return y + 100;
}