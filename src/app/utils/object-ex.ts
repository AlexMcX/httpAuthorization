import { FormControl } from '@angular/forms';

export module ObjectEx {
    export function createObject(value: any, slice?: Array<string>) {
        if (value != null) {
            const result = {};

            for (const key in value) {
                if ((slice && slice.indexOf(key) !== -1) || value[key] === 'null') {
                    continue;
                }

                if (value[key] instanceof  FormControl) {
                    result[key] = value[key].value;

                    continue;
                }

                result[key] = value[key];
            }

            if (Object.keys(result).length === 0) {
                return null;
            }

            return result;
        }

        return null;
    }
}
