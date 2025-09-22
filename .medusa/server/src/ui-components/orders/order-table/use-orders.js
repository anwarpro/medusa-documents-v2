"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrderFilters = void 0;
const react_1 = require("react");
const time_1 = require("./utils/time");
const formatDateFilter = (filter) => {
    if (filter === null) {
        return filter;
    }
    const dateFormatted = Object.entries(filter).reduce((acc, [key, value]) => {
        if (value.includes("|")) {
            acc[key] = (0, time_1.relativeDateFormatToTimestamp)(value);
        }
        else {
            acc[key] = value;
        }
        return acc;
    }, {});
    return dateFormatted;
};
const reducer = (state, action) => {
    switch (action.type) {
        case "setFilters": {
            return {
                ...state,
                region: action.payload.region,
                salesChannel: action.payload.salesChannel,
                fulfillment: action.payload.fulfillment,
                payment: action.payload.payment,
                status: action.payload.status,
                date: action.payload.date,
                query: action?.payload?.query,
            };
        }
        case "setQuery": {
            return {
                ...state,
                offset: 0, // reset offset when query changes
                query: action.payload,
            };
        }
        case "setDate": {
            const newDateFilters = state.date;
            return {
                ...state,
                date: newDateFilters,
            };
        }
        case "setOffset": {
            return {
                ...state,
                offset: action.payload,
            };
        }
        case "reset": {
            return action.payload;
        }
        default: {
            return state;
        }
    }
};
const useOrderFilters = (defaultFilters = null) => {
    const initial = (0, react_1.useMemo)(() => parseQueryString(defaultFilters), [defaultFilters]);
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initial);
    const paginate = (direction) => {
        if (direction > 0) {
            const nextOffset = state.offset + state.limit;
            dispatch({ type: "setOffset", payload: nextOffset });
        }
        else {
            const nextOffset = Math.max(state.offset - state.limit, 0);
            dispatch({ type: "setOffset", payload: nextOffset });
        }
    };
    const getQueryObject = () => {
        const toQuery = { ...state.additionalFilters };
        for (const [key, value] of Object.entries(state)) {
            if (key === "query") {
                if (value && typeof value === "string") {
                    toQuery["q"] = value;
                }
            }
            else if (key === "offset" || key === "limit") {
                toQuery[key] = value;
            }
            else if (value.open) {
                if (key === "date") {
                    toQuery[stateFilterMap[key]] = formatDateFilter(value.filter);
                }
                else {
                    toQuery[stateFilterMap[key]] = value.filter;
                }
            }
        }
        return toQuery;
    };
    const queryObject = (0, react_1.useMemo)(() => getQueryObject(), [state]);
    return {
        queryObject,
        paginate,
    };
};
exports.useOrderFilters = useOrderFilters;
const stateFilterMap = {
    region: "region_id",
    salesChannel: "sales_channel_id",
    status: "status",
    fulfillment: "fulfillment_status",
    payment: "payment_status",
    date: "created_at",
};
const parseQueryString = (additionals = null) => {
    const defaultVal = {
        status: {
            open: false,
            filter: null,
        },
        fulfillment: {
            open: false,
            filter: null,
        },
        region: {
            open: false,
            filter: null,
        },
        salesChannel: {
            open: false,
            filter: null,
        },
        payment: {
            open: false,
            filter: null,
        },
        date: {
            open: false,
            filter: null,
        },
        offset: 0,
        limit: 15,
        additionalFilters: additionals,
    };
    return defaultVal;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLW9yZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL29yZGVycy9vcmRlci10YWJsZS91c2Utb3JkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUEyQztBQUMzQyx1Q0FBNEQ7QUFpRDVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxNQUF1QixFQUFFLEVBQUU7SUFDbkQsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDcEIsT0FBTyxNQUFNLENBQUE7SUFDZixDQUFDO0lBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUN4RSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBQSxvQ0FBNkIsRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUNqRCxDQUFDO2FBQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUE7UUFDbEIsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sT0FBTyxhQUFhLENBQUE7QUFDdEIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FDZCxLQUF1QixFQUN2QixNQUF5QixFQUNQLEVBQUU7SUFDcEIsUUFBUSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU87Z0JBQ0wsR0FBRyxLQUFLO2dCQUNSLE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzdCLFlBQVksRUFBRSxNQUFNLENBQUMs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