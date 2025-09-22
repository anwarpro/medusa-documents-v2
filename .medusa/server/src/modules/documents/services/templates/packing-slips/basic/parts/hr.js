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
exports.generateHr = generateHr;
exports.generateHrInA7 = generateHrInA7;
function generateHr(doc, y, moveTo, lineTo) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(moveTo ? moveTo : 50, y)
        .lineTo(lineTo ? lineTo : 550, y)
        .stroke();
}
function generateHrInA7(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(25, y)
        .lineTo(190, y)
        .stroke();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvc2VydmljZXMvdGVtcGxhdGVzL3BhY2tpbmctc2xpcHMvYmFzaWMvcGFydHMvaHIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7O0dBVUc7O0FBRUgsZ0NBT0M7QUFFRCx3Q0FPQztBQWhCRCxTQUFnQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQVMsRUFBRSxNQUFlLEVBQUUsTUFBZTtJQUN6RSxHQUFHO1NBQ0EsV0FBVyxDQUFDLFNBQVMsQ0FBQztTQUN0QixTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFBLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMvQixNQUFNLEVBQUUsQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFnQixjQUFjLENBQUMsR0FBRyxFQUFFLENBQVM7SUFDM0MsR0FBRztTQUNBLFdBQVcsQ0FBQyxTQUFTLENBQUM7U0FDdEIsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNaLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2IsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDZCxNQUFNLEVBQUUsQ0FBQztBQUNkLENBQUMifQ==