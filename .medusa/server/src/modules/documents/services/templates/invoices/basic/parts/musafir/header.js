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
function generateHeader(doc, y, documentSettings) {
    doc
        .fillColor("#444444")
        .fontSize(20);
    const heightCompany = doc.heightOfString(documentSettings.storeAddress?.company, { width: 250 });
    doc
        .text(documentSettings.storeAddress?.company, 50, y, { align: "left", width: 250 })
        .fontSize(10)
        .text(documentSettings.storeAddress?.company, 200, y, { align: "right" })
        .text(`${documentSettings.storeAddress?.city} ${documentSettings.storeAddress?.postal_code}`, 200, y + 15, { align: "right" });
    const heightAddress = doc.heightOfString(documentSettings.storeAddress?.address_1, { width: 150 });
    doc
        .text(`${documentSettings.storeAddress?.address_1}`, 390, y + 30, { align: "right", width: 150 });
    if (heightCompany > heightAddress + 30) {
        return heightCompany + y;
    }
    else {
        return heightAddress + y + 30;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9tdXNhZmlyL2hlYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7QUFJSCx3Q0F1QkM7QUF2QkQsU0FBZ0IsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFTLEVBQUUsZ0JBQXFDO0lBQ2xGLEdBQUc7U0FDQSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVmLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pHLEdBQUc7U0FDQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDbEYsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDeEUsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLElBQUksSUFBSSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUVoSSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztJQUVqRyxHQUFHO1NBQ0EsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQTtJQUdsRyxJQUFJLGFBQWEsR0FBRyxhQUFhLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDdkMsT0FBTyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxhQUFhLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQyJ9