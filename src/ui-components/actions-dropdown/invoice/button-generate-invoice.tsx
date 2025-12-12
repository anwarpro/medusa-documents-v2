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

import { FlyingBox } from "@medusajs/icons"
import { DropdownMenu, toast } from "@medusajs/ui"
import { useEffect, useState } from "react";

const GenerateInvoiceDropdownButton = ({ order, updateInvoiceNumber } : {order : any, updateInvoiceNumber: any}) => {

  const [isLoading, setLoading] = useState(false)

  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/invoice`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: order.id
      })
    })
    .then(async (res) => {
      const responseJson = await res.json();
      
      if (!res.ok) {
        throw new Error(responseJson.message || `HTTP error! status: ${res.status}`);
      }
      
      return responseJson;
    })
    .then((responseJson) => {
      if (responseJson && responseJson.message && !responseJson.invoice) {
        setError({
          message: responseJson.message
        });
        toast.error("Invoice", {
          description: `Problem happened when generating invoice. ${responseJson.message}`,
        })
        setLoading(false);
        return;
      }
      
      if (responseJson && responseJson.buffer) {
        updateInvoiceNumber(order.id, responseJson.invoice.displayNumber)
        const anyBuffer = responseJson.buffer as any;
        const blob = new Blob([ new Uint8Array(anyBuffer.data)  ], { type : 'application/pdf'});
        toast.dismiss();
        const pdfURL = URL.createObjectURL(blob);
        window.open(pdfURL, '_blank');
      } else {
        toast.dismiss();
        toast.error("Invoice", {
          description: responseJson?.message || 'Problem happened when generating invoice',
        })
      }
      setLoading(false);
      
    })
    .catch((error) => {
      console.error('Invoice generation error:', error);
      setLoading(false);
      toast.dismiss();
      const errorMessage = error?.message || error?.response?.data?.message || 'An unexpected error occurred while generating the invoice';
      toast.error("Invoice", {
        description: errorMessage,
      })
    }) 
  }, [isLoading])

  return (
    <DropdownMenu.Item className="gap-x-2" onClick={() => setLoading(true)}>
      <FlyingBox/>
        Generate new invoice
    </DropdownMenu.Item>
  )
}

export default GenerateInvoiceDropdownButton