import { UPDATE } from "../actions/filters/filterActions";
import { initialData } from "../initialData";

export default function(storeData, action) {
    switch (action.type) {
        case UPDATE: 
            return { 
                ...storeData,
                [action.dataType]: storeData[action.dataType].map(p => 
                    p.name === action.payload.name ? action.payload : p)
            }
        default: 
            return storeData || initialData;
    }
}