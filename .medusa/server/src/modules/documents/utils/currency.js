"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimalDigits = getDecimalDigits;
const utils_1 = require("@medusajs/utils");
const DEFAULT_DECIMAL_DIGITS = 2;
function getDecimalDigits(currencyCode) {
    try {
        const decimalDigits = utils_1.defaultCurrencies[currencyCode.toUpperCase()] !== undefined ? utils_1.defaultCurrencies[currencyCode.toUpperCase()].decimal_digits : undefined;
        if (decimalDigits !== undefined) {
            return decimalDigits;
        }
    }
    catch {
        return DEFAULT_DECIMAL_DIGITS;
    }
    return DEFAULT_DECIMAL_DIGITS;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9kb2N1bWVudHMvdXRpbHMvY3VycmVuY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSw0Q0FVQztBQWRELDJDQUFvRDtBQUVwRCxNQUFNLHNCQUFzQixHQUFHLENBQUMsQ0FBQztBQUVqQyxTQUFnQixnQkFBZ0IsQ0FBQyxZQUFvQjtJQUNuRCxJQUFJLENBQUM7UUFDSCxNQUFNLGFBQWEsR0FBRyx5QkFBaUIsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLHlCQUFpQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdKLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsT0FBTyxzQkFBc0IsQ0FBQztBQUNoQyxDQUFDIn0=