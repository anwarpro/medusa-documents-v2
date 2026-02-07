"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = i18nextLoader;
const i18next_1 = __importDefault(require("i18next"));
const path_1 = __importDefault(require("path"));
async function i18nextLoader({ container, options }) {
    console.info("Starting i18next loader...");
    try {
        const defaultTranslationsPath = path_1.default.resolve(__dirname, `../assets/i18n/locales/en/translation.json`);
        const { default: data } = await import(defaultTranslationsPath, { with: { type: "json" } });
        await i18next_1.default
            .init({
            fallbackLng: 'en',
            defaultNS: 'translation',
            ns: 'translation',
            resources: {
                en: {
                    translation: data
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    catch (error) {
        console.error('Error initializing i18next:', error);
    }
    try {
        const configLanguage = options?.document_language;
        if (configLanguage === undefined) {
            console.info('Language is not configured, using "en" by default.');
        }
        else {
            console.info(`Language is configured as ${configLanguage}`);
            const translationPath = path_1.default.resolve(__dirname, `../assets/i18n/locales/${configLanguage}/translation.json`);
            const translations = await import(translationPath);
            i18next_1.default.addResourceBundle(configLanguage, 'translation', translations);
            i18next_1.default.changeLanguage(configLanguage);
        }
    }
    catch {
        console.error('Error adding language configured in config. Fallback to "en"');
    }
    console.info("Ending i18next loader...");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2RvY3VtZW50cy9sb2FkZXJzL2kxOG5leHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFXQSxnQ0FpREM7QUF4REQsc0RBQStCO0FBQy9CLGdEQUF3QjtBQU1ULEtBQUssVUFBVSxhQUFhLENBQUMsRUFDMUMsU0FBUyxFQUNULE9BQU8sRUFDc0I7SUFDN0IsT0FBTyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO0lBRTFDLElBQUksQ0FBQztRQUNILE1BQU0sdUJBQXVCLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsNENBQTRDLENBQUMsQ0FBQztRQUN0RyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUU1RixNQUFNLGlCQUFPO2FBQ1YsSUFBSSxDQUFDO1lBQ0osV0FBVyxFQUFFLElBQUk7WUFDakIsU0FBUyxFQUFFLGFBQWE7WUFDeEIsRUFBRSxFQUFFLGFBQWE7WUFDakIsU0FBUyxFQUFFO2dCQUNULEVBQUUsRUFBRTtvQkFDRixXQUFXLEVBQUUsSUFBSTtpQkFDbEI7YUFDRjtTQUNGLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFHRCxJQUFJLENBQUM7UUFDSCxNQUFNLGNBQWMsR0FBRyxPQUFPLEVBQUUsaUJBQWlCLENBQUE7UUFDakQsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO1FBQ3BFLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsY0FBYyxFQUFFLENBQUMsQ0FBQTtZQUMzRCxNQUFNLGVBQWUsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsY0FBYyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdHLE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ25ELGlCQUFPLENBQUMsaUJBQWlCLENBQ3ZCLGNBQWMsRUFDZCxhQUFhLEVBQ2IsWUFBWSxDQUNiLENBQUE7WUFDRCxpQkFBTyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztJQUFDLE1BQU0sQ0FBQztRQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsOERBQThELENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzFDLENBQUMifQ==