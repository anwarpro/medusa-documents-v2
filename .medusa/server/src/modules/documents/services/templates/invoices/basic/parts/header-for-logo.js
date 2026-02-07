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
        .fillColor("#444444")
        .fontSize(20)
        .text(documentSettings.storeAddress?.company, 50, 50, { align: "left", width: 250 })
        .moveDown()
        .fontSize(10)
        .text(documentSettings.storeAddress?.company, 50, heightCompany + 65, { align: "left" })
        .text(`${documentSettings.storeAddress?.city} ${documentSettings.storeAddress?.postal_code}`, 50, heightCompany + 80, { align: "left" });
    const heightOfAddress = doc.heightOfString(documentSettings.storeAddress?.address_1, { width: 250 });
    doc.text(documentSettings.storeAddress?.address_1, 50, heightCompany + 95, { align: "left", width: 250 });
    return heightOfAddress + heightCompany + 95;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWZvci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9oZWFkZXItZm9yLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBSUgsc0RBbUJDO0FBbkJELFNBQWdCLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFTLEVBQUUsZ0JBQXFDO0lBQ3pGLEdBQUc7U0FDQSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVmLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRWpHLEdBQUc7U0FDQSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDbkYsUUFBUSxFQUFFO1NBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNaLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ3ZGLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDeEksTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDcEcsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUV6RyxPQUFPLGVBQWUsR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ2hELENBQUMifQ==