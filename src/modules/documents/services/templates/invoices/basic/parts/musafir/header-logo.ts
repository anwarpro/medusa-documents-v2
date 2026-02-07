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

export async function generateHeaderLogo(doc, y: number, logoSource: string): Promise<number> {
    console.log(`Generating logo from: ${logoSource}`);
    try {
        const responseImage = await fetch(logoSource);

        if (responseImage.ok && responseImage.status == 200) {
            const responseImageBuffer = await responseImage.arrayBuffer();
            const responseBuffer = Buffer.from(responseImageBuffer);
            doc.image(responseBuffer, 50, y, { height: 50 });
        } else {
            console.error(`Failed to fetch logo: ${responseImage.status} ${responseImage.statusText}`);
            doc.font("Bold").fontSize(20).text("MUSAFIR", 50, y);
        }
    } catch (error) {
        console.error(`Error fetching logo: ${error}`);
        doc.font("Bold").fontSize(20).text("MUSAFIR", 50, y);
    }

    return y;
}