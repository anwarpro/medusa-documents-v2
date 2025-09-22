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
exports.generateHeaderLogo = generateHeaderLogo;
async function generateHeaderLogo(doc, y, logoSource) {
    const responseImage = await fetch(logoSource);
    if (responseImage.ok && responseImage.status == 200) {
        const responseImageBuffer = await responseImage.arrayBuffer();
        const responseBuffer = Buffer.from(responseImageBuffer);
        doc
            .image(responseBuffer, 40, y, { align: 'left', height: 40 });
    }
    else {
        doc
            .text("logo"), 50, y, { align: 'left', width: 40 };
    }
    return y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWxvZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL3BhcnRzL211c2FmaXIvaGVhZGVyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBRUgsZ0RBZUM7QUFmTSxLQUFLLFVBQVUsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxVQUFrQjtJQUV2RSxNQUFNLGFBQWEsR0FBRyxNQUFNLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUU5QyxJQUFJLGFBQWEsQ0FBQyxFQUFFLElBQUksYUFBYSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNsRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN4RCxHQUFHO2FBQ0UsS0FBSyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO1NBQU0sQ0FBQztRQUNKLEdBQUc7YUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUMifQ==