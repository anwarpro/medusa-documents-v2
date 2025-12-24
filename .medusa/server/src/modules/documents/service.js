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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
const utils_2 = require("@medusajs/framework/utils");
const document_invoice_1 = __importDefault(require("./models/document-invoice"));
const document_packing_slip_1 = __importDefault(require("./models/document-packing-slip"));
const document_settings_1 = __importDefault(require("./models/document-settings"));
const document_invoice_settings_1 = __importDefault(require("./models/document-invoice-settings"));
const document_packing_slip_settings_1 = __importDefault(require("./models/document-packing-slip-settings"));
const template_kind_1 = require("./types/template-kind");
const constants_1 = require("./types/constants");
const invoice_generator_1 = require("./services/generators/invoice-generator");
const packing_slip_generator_1 = require("./services/generators/packing-slip-generator");
class DocumentsModuleService extends (0, utils_2.MedusaService)({
    DocumentInvoice: document_invoice_1.default,
    DocumentPackingSlip: document_packing_slip_1.default,
    DocumentSettings: document_settings_1.default,
    DocumentInvoiceSettings: document_invoice_settings_1.default,
    DocumentPackingSlipSettings: document_packing_slip_settings_1.default
}) {
    constructor({}, options) {
        super(...arguments);
        this.options_ = options;
    }
    async resetForcedNumberByCreatingNewSettings() {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const result = await this.createDocumentInvoiceSettings({
                forcedNumber: undefined,
                numberFormat: lastDocumentInvoiceSettings[0].numberFormat,
                template: lastDocumentInvoiceSettings[0].template
            });
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                forcedNumber: undefined
            });
            return result;
        }
    }
    async getInvoiceForcedNumber() {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length && lastDocumentInvoiceSettings[0].forcedNumber) {
            const nextNumber = lastDocumentInvoiceSettings[0].forcedNumber.toString();
            return nextNumber;
        }
        return undefined;
    }
    async getNextInvoiceNumber(resetForcedNumber) {
        const forcedNumber = await this.getInvoiceForcedNumber();
        if (forcedNumber !== undefined) {
            if (resetForcedNumber) {
                await this.resetForcedNumberByCreatingNewSettings();
            }
            return forcedNumber;
        }
        const lastInvoice = await this.listDocumentInvoices({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastInvoice && lastInvoice.length) {
            return (lastInvoice[0].number + 1).toString();
        }
        return '1';
    }
    async getNextPackingSlipNumber() {
        const lastPackingSlip = await this.listDocumentPackingSlips({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastPackingSlip && lastPackingSlip.length) {
            return (lastPackingSlip[0].number + 1).toString();
        }
        return '1';
    }
    async getInvoice(order, invoiceId, includeBuffer = false) {
        if (includeBuffer) {
            const invoice = await this.retrieveDocumentInvoice(invoiceId, {
                relations: ['invoiceSettings', 'settings']
            });
            if (invoice) {
                const calculatedTemplateKind = this.calculateTemplateKind(invoice.invoiceSettings);
                const buffer = await (0, invoice_generator_1.generateInvoice)(calculatedTemplateKind, invoice.settings, invoice, order);
                return {
                    invoice: invoice,
                    buffer: buffer
                };
            }
        }
        else {
            const invoice = await this.retrieveDocumentInvoice(invoiceId);
            return {
                invoice: invoice,
                buffer: undefined
            };
        }
    }
    async getPackingSlip(order, packingSlipId, includeBuffer = false) {
        if (includeBuffer) {
            const packingSlip = await this.retrieveDocumentPackingSlip(packingSlipId, {
                relations: ['packingSlipSettings', 'settings']
            });
            if (packingSlip) {
                const calculatedTemplateKind = this.calculatePackingSlipTemplateKind(packingSlip.packingSlipSettings);
                const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(calculatedTemplateKind, packingSlip.settings, packingSlip, order);
                return {
                    packingSlip: packingSlip,
                    buffer: buffer
                };
            }
        }
        else {
            const packingSlip = await this.retrieveDocumentPackingSlip(packingSlipId);
            return {
                packingSlip: packingSlip,
                buffer: undefined
            };
        }
    }
    async generateTestPackingSlip(order, templateKind) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const nextNumber = await this.getNextPackingSlipNumber();
            const [validationPassed, info] = (0, packing_slip_generator_1.validateInputForProvidedKind)(templateKind, lastDocumentSettings[0]);
            if (validationPassed) {
                const testPackingSlip = {
                    number: parseInt(nextNumber),
                    displayNumber: nextNumber,
                    created_at: new Date(Date.now())
                };
                const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(templateKind, lastDocumentSettings[0], testPackingSlip, order);
                return {
                    packingSlip: testPackingSlip,
                    buffer: buffer
                };
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    async generateTestInvoice(order, templateKind) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const lastInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastInvoiceSettings && lastInvoiceSettings.length) {
                const invoiceSettings = lastInvoiceSettings[0];
                const nextNumber = await this.getNextInvoiceNumber();
                const [validationPassed, info] = (0, invoice_generator_1.validateInputForProvidedKind)(templateKind, lastDocumentSettings[0]);
                if (validationPassed) {
                    const testInvoice = {
                        number: parseInt(nextNumber),
                        displayNumber: invoiceSettings.numberFormat ? invoiceSettings.numberFormat.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                        created_at: new Date(Date.now())
                    };
                    const buffer = await (0, invoice_generator_1.generateInvoice)(templateKind, lastDocumentSettings[0], testInvoice, order);
                    return {
                        invoice: testInvoice,
                        buffer: buffer
                    };
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice settings are not defined');
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    calculateTemplateKind(documentInvoiceSettings) {
        if (documentInvoiceSettings && documentInvoiceSettings.template) {
            return documentInvoiceSettings.template;
        }
        return template_kind_1.InvoiceTemplateKind.BASIC;
    }
    async generateInvoiceForOrder(order) {
        if (order) {
            const lastDocumentSettings = await this.listDocumentSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastDocumentSettings && lastDocumentSettings.length) {
                const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
                    order: {
                        created_at: "DESC"
                    },
                    take: 1
                });
                if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
                    const invoiceSettings = lastDocumentInvoiceSettings[0];
                    const calculatedTemplateKind = this.calculateTemplateKind(lastDocumentInvoiceSettings[0]);
                    const [validationPassed, info] = (0, invoice_generator_1.validateInputForProvidedKind)(calculatedTemplateKind, lastDocumentSettings[0]);
                    if (validationPassed) {
                        const RESET_FORCED_NUMBER = true;
                        const nextNumber = await this.getNextInvoiceNumber(RESET_FORCED_NUMBER);
                        const entryInvoice = {
                            number: parseInt(nextNumber),
                            displayNumber: invoiceSettings.numberFormat ? invoiceSettings.numberFormat.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                            created_at: new Date(Date.now()),
                            invoice_settings_id: invoiceSettings.id,
                            settings_id: lastDocumentSettings[0].id
                        };
                        const invoiceResult = await this.createDocumentInvoices(entryInvoice);
                        const buffer = await (0, invoice_generator_1.generateInvoice)(calculatedTemplateKind, lastDocumentSettings[0], invoiceResult, order);
                        return {
                            invoice: invoiceResult,
                            buffer: buffer
                        };
                    }
                    else {
                        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                    }
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Invoice settings are not defined');
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
            }
        }
        return undefined;
    }
    calculatePackingSlipTemplateKind(documentPackingSlipSettings) {
        if (documentPackingSlipSettings && documentPackingSlipSettings.template) {
            return documentPackingSlipSettings.template;
        }
        return template_kind_1.PackingSlipTemplateKind.BASIC;
    }
    async generatePackingSlipForOrder(order) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
                order: {
                    created_at: "DESC"
                },
                take: 1
            });
            if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
                const packingSlipSettings = lastDocumentPackingSlipSettings[0];
                const calculatedTemplateKind = this.calculatePackingSlipTemplateKind(lastDocumentPackingSlipSettings[0]);
                const [validationPassed, info] = (0, packing_slip_generator_1.validateInputForProvidedKind)(calculatedTemplateKind, lastDocumentSettings[0]);
                if (validationPassed) {
                    const nextNumber = await this.getNextPackingSlipNumber();
                    const entryPackingSlip = {
                        number: parseInt(nextNumber),
                        displayNumber: packingSlipSettings.numberFormat ? packingSlipSettings.numberFormat.replace(constants_1.PACKING_SLIP_NUMBER_PLACEHOLDER, nextNumber) : nextNumber,
                        created_at: new Date(Date.now()),
                        packing_slip_settings_id: packingSlipSettings.id,
                        settings_id: lastDocumentSettings[0].id
                    };
                    const packingSlipResult = await this.createDocumentPackingSlips(entryPackingSlip);
                    const buffer = await (0, packing_slip_generator_1.generatePackingSlip)(calculatedTemplateKind, lastDocumentSettings[0], packingSlipResult, order);
                    return {
                        packingSlip: packingSlipResult,
                        buffer: buffer
                    };
                }
                else {
                    throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, info);
                }
            }
            else {
                throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Retrieve packing slip settings failed. Please check if they are set - e.g. if you set template or other settings.');
            }
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Document settings are not defined');
        }
    }
    async updateInvoiceTemplate(invoiceTemplate) {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const newDocumentSettings = {
                template: invoiceTemplate ?? lastDocumentInvoiceSettings[0].template,
            };
            const result = await this.createDocumentInvoiceSettings(newDocumentSettings);
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                template: invoiceTemplate
            });
            return result;
        }
    }
    async updatePackingSlipTemplate(packingSlipTemplate) {
        const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
            const newDocumentSettings = {
                template: packingSlipTemplate ?? lastDocumentPackingSlipSettings[0].template,
            };
            const result = await this.createDocumentPackingSlipSettings(newDocumentSettings);
            return result;
        }
        else {
            const result = await this.createDocumentPackingSlipSettings({
                template: packingSlipTemplate
            });
            return result;
        }
    }
    async updatePackingSlipSettings(newFormatNumber, forcedNumber, template) {
        const lastDocumentPackingSlipSettings = await this.listDocumentPackingSlipSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentPackingSlipSettings && lastDocumentPackingSlipSettings.length) {
            const result = await this.createDocumentPackingSlipSettings({
                numberFormat: newFormatNumber ?? lastDocumentPackingSlipSettings[0].numberFormat,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : lastDocumentPackingSlipSettings[0].forcedNumber,
                template: template ?? lastDocumentPackingSlipSettings[0].template,
            });
            return result;
        }
        else {
            const result = await this.createDocumentPackingSlipSettings({
                numberFormat: newFormatNumber,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : undefined,
                template: template
            });
            return result;
        }
    }
    async updateInvoiceSettings(newFormatNumber, forcedNumber, invoiceTemplate) {
        const lastDocumentInvoiceSettings = await this.listDocumentInvoiceSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentInvoiceSettings && lastDocumentInvoiceSettings.length) {
            const result = await this.createDocumentInvoiceSettings({
                numberFormat: newFormatNumber ?? lastDocumentInvoiceSettings[0].numberFormat,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : lastDocumentInvoiceSettings[0].forcedNumber,
                template: invoiceTemplate ?? lastDocumentInvoiceSettings[0].template,
            });
            return result;
        }
        else {
            const result = await this.createDocumentInvoiceSettings({
                numberFormat: newFormatNumber,
                forcedNumber: forcedNumber ? parseInt(forcedNumber) : undefined,
                template: invoiceTemplate
            });
            return result;
        }
    }
    async updateStoreLogo(logoSource) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const result = await this.createDocumentSettings({
                id: undefined,
                storeAddress: lastDocumentSettings[0].storeAddress,
                storeLogoSource: logoSource,
            });
            return result;
        }
        else {
            const result = await this.createDocumentSettings({
                storeLogoSource: logoSource,
            });
            return result;
        }
    }
    async updateStoreDocumentAddress(address) {
        const lastDocumentSettings = await this.listDocumentSettings({}, {
            order: {
                created_at: "DESC"
            },
            take: 1,
            relations: ["documentInvoice", "documentPackingSlip"]
        });
        if (lastDocumentSettings && lastDocumentSettings.length) {
            const result = await this.createDocumentSettings({
                id: undefined,
                // created_at: undefined,
                // updated_at: undefined,
                // deleted_at: undefined,
                storeAddress: address,
                storeLogoSource: lastDocumentSettings[0].storeLogoSource,
                // documentInvoice: lastDocumentSettings[0].documentInvoice,
                // documentInvoice: lastDocumentSettings[0].documentInvoice,
                // documentPackingSlip: lastDocumentSettings[0].documentPackingSlip
            });
            return result;
        }
        else {
            const result = await this.createDocumentSettings({
                storeAddress: address,
            });
            return result;
        }
    }
    async getTestDisplayNumber(formatNumber, forcedNumber) {
        const nextNumber = forcedNumber !== undefined ? forcedNumber : await this.getNextInvoiceNumber();
        if (nextNumber) {
            return formatNumber ? formatNumber.replace(constants_1.INVOICE_NUMBER_PLACEHOLDER, nextNumber) : nextNumber;
        }
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, 'Neither forced number is set or any order present');
    }
}
exports.default = DocumentsModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7OztHQVVHOzs7OztBQUVILDJDQUErRDtBQUMvRCxxREFBeUQ7QUFHekQsaUZBQXdEO0FBQ3hELDJGQUFpRTtBQUNqRSxtRkFBMEQ7QUFDMUQsbUdBQXlFO0FBQ3pFLDZHQUFrRjtBQUVsRix5REFBcUY7QUFDckYsaURBQWdHO0FBQ2hHLCtFQUF3RztBQUN4Ryx5RkFBNEo7QUFXNUosTUFBTSxzQkFBdUIsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDakQsZUFBZSxFQUFmLDBCQUFlO0lBQ2YsbUJBQW1CLEVBQW5CLCtCQUFtQjtJQUNuQixnQkFBZ0IsRUFBaEIsMkJBQWdCO0lBQ2hCLHVCQUF1QixFQUF2QixtQ0FBdUI7SUFDdkIsMkJBQTJCLEVBQTNCLHdDQUEyQjtDQUM1QixDQUFDO0lBTUEsWUFBWSxFQUNXLEVBQUUsT0FBdUI7UUFDOUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVPLEtBQUssQ0FBQyxzQ0FBc0M7UUFDbEQsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLEVBQUU7WUFDN0UsS0FBSyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxNQUFNO2FBQ25CO1lBQ0QsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDLENBQUE7UUFDRixJQUFJLDJCQUEyQixJQUFJLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLDZCQUE2QixDQUFDO2dCQUN0RCxZQUFZLEVBQUUsU0FBUztnQkFDdkIsWUFBWSxFQUFFLDJCQUEyQixDQUFDLENBQUMsQ0FB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