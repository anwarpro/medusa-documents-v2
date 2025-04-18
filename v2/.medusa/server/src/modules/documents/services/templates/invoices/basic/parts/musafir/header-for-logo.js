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
exports.generateHeaderForLogo = generateHeaderForLogo;
function generateHeaderForLogo(doc, y, documentSettings) {
    doc
        .fillColor("#444444")
        .fontSize(20);
    const heightCompany = doc.heightOfString(documentSettings.storeAddress?.company, { width: 250 });
    doc
        .moveDown()
        .fontSize(10)
        .text(documentSettings.storeAddress?.company, 50, heightCompany + 65, { align: "left" })
        .text(`${documentSettings.storeAddress?.city} ${documentSettings.storeAddress?.postal_code}`, 50, heightCompany + 80, { align: "left" });
    const heightOfAddress = doc.heightOfString(documentSettings.storeAddress?.address_1, { width: 250 });
    doc.text(documentSettings.storeAddress?.address_1, 50, heightCompany + 95, { align: "left", width: 250 });
    return heightOfAddress + heightCompany + 95;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWZvci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9tdXNhZmlyL2hlYWRlci1mb3ItbG9nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFJSCxzREFnQkM7QUFoQkQsU0FBZ0IscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxnQkFBcUM7SUFDekYsR0FBRztTQUNBLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRWYsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFakcsR0FBRztTQUNBLFFBQVEsRUFBRTtTQUNWLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztTQUN2RixJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLGdCQUFnQixDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ3hJLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO0lBQ3BHLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsYUFBYSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFFekcsT0FBTyxlQUFlLEdBQUcsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUNoRCxDQUFDIn0=