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

    const responseImage = await fetch(logoSource);

    if (responseImage.ok && responseImage.status == 200) {
        const responseImageBuffer = await responseImage.arrayBuffer();
        const responseBuffer = Buffer.from(responseImageBuffer);
        doc
            .image(responseBuffer, 40, y, {align: 'left', height: 40});
    } else {
        doc
            .text("logo"), 50, y, {align: 'left', width: 40};
    }

    return y;
}