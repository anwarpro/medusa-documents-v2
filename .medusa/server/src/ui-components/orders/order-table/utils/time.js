"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateFilter = exports.relativeDateFormatToTimestamp = exports.addHours = exports.atMidnight = void 0;
const moment_1 = __importDefault(require("moment"));
const atMidnight = (date) => {
    const result = (0, moment_1.default)(date);
    if (!moment_1.default.isMoment(result)) {
        console.log("date is not instance of Moment: ", date);
        return null;
    }
    result.hour(0);
    result.minute(0);
    result.second(0);
    result.millisecond(0);
    return result;
};
exports.atMidnight = atMidnight;
const addHours = (date, hours) => {
    return (0, moment_1.default)(date)?.add(hours, "hours");
};
exports.addHours = addHours;
/**
 * The format is: [gt]=number|option
 * e.g: [gt]=2|days
 * @param {*} value
 */
const relativeDateFormatToTimestamp = (value) => {
    const [count, option] = value.split("|");
    // relative days are always subtract
    let date = (0, moment_1.default)();
    date.subtract(parseInt(count), option);
    date = (0, exports.atMidnight)(date);
    const result = `${date.format("X")}`;
    return result;
};
exports.relativeDateFormatToTimestamp = relativeDateFormatToTimestamp;
// Takes in a value from the date picker e.g. 42|days or a timestamp
const formatDateFilter = (filter) => {
    return Object.entries(filter).reduce((acc, [key, value]) => {
        if (typeof value === 'string' && value.includes("|")) {
            acc[key] = (0, exports.relativeDateFormatToTimestamp)(value);
        }
        else {
            acc[key] = value;
        }
        return acc;
    }, {});
};
exports.formatDateFilter = formatDateFilter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS91dGlscy90aW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUEyQjtBQUVwQixNQUFNLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixJQUFJLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3JELE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUVyQixPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQVpZLFFBQUEsVUFBVSxjQVl0QjtBQUVNLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3RDLE9BQU8sSUFBQSxnQkFBTSxFQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBO0FBRlksUUFBQSxRQUFRLFlBRXBCO0FBRUQ7Ozs7R0FJRztBQUVJLE1BQU0sNkJBQTZCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUNyRCxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFeEMsb0NBQW9DO0lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFBO0lBRW5CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3RDLElBQUksR0FBRyxJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFFLENBQUE7SUFFeEIsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUE7SUFFcEMsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUE7QUFaWSxRQUFBLDZCQUE2QixpQ0FZekM7QUFFRCxvRUFBb0U7QUFDN0QsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3pDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUN6RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUEscUNBQTZCLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFDakQsQ0FBQzthQUFNLENBQUM7WUFDTixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUNSLENBQUMsQ0FBQTtBQVRZLFFBQUEsZ0JBQWdCLG9CQVM1QiJ9