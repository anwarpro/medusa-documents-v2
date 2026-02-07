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
exports.generateHeader = generateHeader;
const i18next_1 = require("i18next");
function generateHeader(doc, y, documentSettings) {
    doc
        .fillColor("#444444")
        .fontSize(12);
    doc
        .text((0, i18next_1.t)("packing-slip", "Packing Slip"), 25, y, { align: "left" });
    const heightCompany = doc.heightOfString(documentSettings.storeAddress?.company, { align: "left" });
    doc
        .fontSize(6)
        .text(documentSettings.storeAddress?.company, 25, y + 25, { align: "left" })
        .text(`${documentSettings.storeAddress?.city} ${documentSettings.storeAddress?.postal_code}`, 25, y + 35, { align: "left" });
    const heightAddress = doc.heightOfString(documentSettings.storeAddress?.address_1, { width: 150 });
    doc
        .text(`${documentSettings.storeAddress?.address_1}`, 25, y + 45, { align: "left" });
    if (heightCompany > heightAddress + 45) {
        return heightCompany + y;
    }
    else {
        return heightAddress + y + 45;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXNtYWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9wYWNraW5nLXNsaXBzL2Jhc2ljL3BhcnRzL2hlYWRlci1zbWFsbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFLSCx3Q0F5QkM7QUEzQkQscUNBQTRCO0FBRTVCLFNBQWdCLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBUyxFQUFFLGdCQUFxQztJQUNsRixHQUFHO1NBQ0EsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFZixHQUFHO1NBQ0EsSUFBSSxDQUFDLElBQUEsV0FBQyxFQUFDLGNBQWMsRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFFcEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDcEcsR0FBRztTQUNBLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUMzRSxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLGdCQUFnQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBRTlILE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBRWpHLEdBQUc7U0FDQSxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtJQUdyRixJQUFJLGFBQWEsR0FBRyxhQUFhLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDdkMsT0FBTyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxhQUFhLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQyJ9