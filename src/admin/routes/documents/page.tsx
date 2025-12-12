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

import React, { useState } from "react";
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Tabs, Toaster, Input } from "@medusajs/ui"
import { DocumentText, MagnifyingGlass } from "@medusajs/icons"
import { Box, Grid } from "@mui/material";
import { OrdersTab } from "../../../ui-components/tabs/orders-tab";
import { TemplatesTab } from "../../../ui-components/tabs/templates-tab/templates-tab";
import { SettingsTab } from "../../../ui-components/tabs/settings-tab";
import { ProTab } from "../../../ui-components/tabs/pro-tab";

const DocumentsPage = () => {
  const [orderSearch, setOrderSearch] = useState<string>("");
  
  // Access Vite env variable - Vite replaces import.meta.env at build time
  // @ts-expect-error - import.meta is available in Vite's ESM build output, not in TypeScript's CommonJS check
  const hidePro = typeof (import.meta as any)?.env !== 'undefined' && 
    // @ts-expect-error - import.meta is available in Vite's ESM build output
    (import.meta as any).env?.VITE_MEDUSA_ADMIN_MEDUSA_DOCUMENTS_HIDE_PRO;
  
  return (
    <Tabs defaultValue='orders'>
      <Toaster position="top-right"/>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2, gap: 2 }}>
        <Tabs.List style={{ flex: 1 }}>
          <Tabs.Trigger value='orders'>Orders</Tabs.Trigger>
          <Tabs.Trigger value='templates'>Templates</Tabs.Trigger>
          <Tabs.Trigger value='settings'>Settings</Tabs.Trigger>
          {!hidePro && (
            <Tabs.Trigger value='pro' style={{ color: 'purple' }}>Pro version</Tabs.Trigger>
          )}
        </Tabs.List>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: '300px' }}>
          <MagnifyingGlass className="text-ui-fg-muted" style={{ width: '16px', height: '16px' }} />
          <Input
            type="text"
            placeholder="Search by order number..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            style={{ width: '100%', minWidth: '250px' }}
          />
        </Box>
      </Box>
      <Tabs.Content value='orders'>
        <Box height={20}></Box>
        <OrdersTab searchTerm={orderSearch} />
      </Tabs.Content>
      <Tabs.Content value='templates'>
        <Box height={20}></Box>
        <TemplatesTab/>
      </Tabs.Content>
      <Tabs.Content value='settings'>
        <Box height={20}></Box>
        <SettingsTab/>
      </Tabs.Content>
      {!hidePro && (
        <Tabs.Content value='pro'>
          <Box height={20}></Box>
          <ProTab/>
        </Tabs.Content>
      )}
    </Tabs>
  )
}

export const config = defineRouteConfig({
  label: "Invoices",
  icon: DocumentText,
})

export default DocumentsPage