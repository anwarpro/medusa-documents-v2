"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceInformation = generateInvoiceInformation;
function generateInvoiceInformation(doc, y, x, invoice, order) {
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
        .text(`${order.total / 100} paid at`, x, y + 70)
        .text(`${new Date(invoice.created_at).toLocaleString()}`, x, y + 85);
    return y + 100;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1pbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9tdXNhZmlyL2ludm9pY2UtaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFNSCxnRUE0QkM7QUE1QkQsU0FBZ0IsMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsT0FBMkIsRUFBRSxLQUFlO0lBQzlHLEdBQUc7U0FDRSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDZixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUUvRCxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2YsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLDZCQUE2QjtTQUNsRCxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQzNDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FFcEIsUUFBUSxDQUFDLEdBQUcsQ0FBQztTQUNiLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDWixRQUFRLENBQUMsRUFBRSxDQUFDO1NBQ1osSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pDLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDZixJQUFJLENBQUMsR0FBSSxLQUFhLENBQUMsS0FBSyxHQUFHLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3hELElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFekUsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ25CLENBQUMifQ==