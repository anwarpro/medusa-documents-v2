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
            .image(responseBuffer, 350, y, { align: 'right', width: 200 });
    }
    else {
        doc
            .text('Cannot get logo from provided URL'), 390, y, { align: 'right', width: 200 };
    }
    return y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWxvZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL3BhcnRzL2hlYWRlci1sb2dvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQUVILGdEQWVDO0FBZk0sS0FBSyxVQUFVLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFTLEVBQUUsVUFBa0I7SUFFekUsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFOUMsSUFBSSxhQUFhLENBQUMsRUFBRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDcEQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDeEQsR0FBRzthQUNBLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztTQUFNLENBQUM7UUFDTixHQUFHO2FBQ0EsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUMifQ==