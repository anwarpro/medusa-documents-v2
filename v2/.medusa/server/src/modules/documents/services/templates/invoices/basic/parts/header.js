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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9oZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBSUgsd0NBdUJDO0FBdkJELFNBQWdCLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBUyxFQUFFLGdCQUFxQztJQUNsRixHQUFHO1NBQ0EsU0FBUyxDQUFDLFNBQVMsQ0FBQztTQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFZixNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNqRyxHQUFHO1NBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ2xGLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQ3hFLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7SUFFaEksTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7SUFFakcsR0FBRztTQUNBLElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUE7SUFHbEcsSUFBSSxhQUFhLEdBQUcsYUFBYSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sYUFBYSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sYUFBYSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FBQztBQUNILENBQUMifQ==