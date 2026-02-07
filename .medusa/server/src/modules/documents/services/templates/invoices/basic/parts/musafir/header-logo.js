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
    console.log(`Generating logo from: ${logoSource}`);
    try {
        const responseImage = await fetch(logoSource);
        if (responseImage.ok && responseImage.status == 200) {
            const responseImageBuffer = await responseImage.arrayBuffer();
            const responseBuffer = Buffer.from(responseImageBuffer);
            doc.image(responseBuffer, 50, y, { height: 50 });
        }
        else {
            console.error(`Failed to fetch logo: ${responseImage.status} ${responseImage.statusText}`);
            doc.font("Bold").fontSize(20).text("MUSAFIR", 50, y);
        }
    }
    catch (error) {
        console.error(`Error fetching logo: ${error}`);
        doc.font("Bold").fontSize(20).text("MUSAFIR", 50, y);
    }
    return y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWxvZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL2ludm9pY2VzL2Jhc2ljL3BhcnRzL211c2FmaXIvaGVhZGVyLWxvZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBRUgsZ0RBbUJDO0FBbkJNLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxHQUFHLEVBQUUsQ0FBUyxFQUFFLFVBQWtCO0lBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkQsSUFBSSxDQUFDO1FBQ0QsTUFBTSxhQUFhLEdBQUcsTUFBTSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFOUMsSUFBSSxhQUFhLENBQUMsRUFBRSxJQUFJLGFBQWEsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7WUFDbEQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDeEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsYUFBYSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUMzRixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNiLENBQUMifQ==