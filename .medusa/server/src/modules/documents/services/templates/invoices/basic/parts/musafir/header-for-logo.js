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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeaderForLogo = generateHeaderForLogo;
const QRCode = __importStar(require("qrcode"));
async function generateHeaderForLogo(doc, y, x, documentSettings, order) {
    doc
        .fillColor("#000000")
        .fontSize(12)
        .font("Bold")
        .text("Musafir Trading", x, y)
        .fontSize(10)
        .font("Regular")
        .text(`Tax Number: `, x, y + 15, { continued: true })
        .font("Bold").text("4120294477")
        .font("Regular").text(`Bank: `, x, y + 30, { continued: true })
        .font("Bold").text("Standard Bank")
        .font("Regular").text(`Account Type: `, x, y + 45, { continued: true })
        .font("Bold").text("Account Type") // Default or placeholder if not in settings
        .font("Regular").text(`Acc.No: `, x, y + 60, { continued: true })
        .font("Bold").text("10 111 45 88 52")
        .font("Regular").text(`Branch: `, x, y + 75, { continued: true })
        .font("Bold").text("1110")
        .font("Regular");
    // QR Code Generation with border
    try {
        const qrData = `WWTR9P`;
        const qrCodeDataUrl = await QRCode.toDataURL(qrData);
        const qrX = x;
        const qrY = y + 95;
        const qrSize = 80;
        // Draw border/rectangle around QR code
        doc.rect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 6)
            .stroke();
        // Draw QR code
        doc.image(qrCodeDataUrl, qrX, qrY, { width: qrSize });
    }
    catch (err) {
        console.error('QR Code generation failed', err);
    }
    return y + 185;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWZvci1sb2dvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvZG9jdW1lbnRzL3NlcnZpY2VzL3RlbXBsYXRlcy9pbnZvaWNlcy9iYXNpYy9wYXJ0cy9tdXNhZmlyL2hlYWRlci1mb3ItbG9nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNSCxzREF1Q0M7QUF6Q0QsK0NBQWlDO0FBRTFCLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxnQkFBcUMsRUFBRSxLQUFlO0lBQzNILEdBQUc7U0FDQSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDN0IsUUFBUSxDQUFDLEVBQUUsQ0FBQztTQUNaLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3BELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDdEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyw0Q0FBNEM7U0FDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFbkIsaUNBQWlDO0lBQ2pDLElBQUksQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUN4QixNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFbEIsdUNBQXVDO1FBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUMvQyxNQUFNLEVBQUUsQ0FBQztRQUVaLGVBQWU7UUFDZixHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakIsQ0FBQyJ9