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
exports.generateCustomerInformation = generateCustomerInformation;
function generateCustomerInformation(doc, y, x, order) {
    doc
        .fillColor("#000000")
        .fontSize(12)
        .font("Bold")
        .text(`Shipping Address`, x, y)
        .font("Regular")
        .fontSize(10);
    if (order.shipping_address) {
        const address = order.shipping_address;
        doc
            .text(`${address.first_name} ${address.last_name}`, x, y + 15)
            .text(`${address.address_1}`, x, y + 30, { width: 150 })
            .text(`${address.city}, ${address.province || ''} ${address.postal_code}`, x, y + 45)
            .text(`Contact:`, x, y + 60)
            .text(`${address.phone || order.email}`, x, y + 75);
    }
    return y + 100;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlcy90ZW1wbGF0ZXMvaW52b2ljZXMvYmFzaWMvcGFydHMvbXVzYWZpci9jdXN0b21lci1pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOztBQUlILGtFQW9CQztBQXBCRCxTQUFnQiwyQkFBMkIsQ0FBQyxHQUFHLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxLQUFlO0lBQ2xGLEdBQUc7U0FDRSxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUM7U0FDWixJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNmLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVsQixJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QyxHQUFHO2FBQ0UsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDN0QsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ3ZELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3BGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDM0IsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ25CLENBQUMifQ==