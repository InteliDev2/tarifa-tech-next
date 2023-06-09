import { FieldErrors } from "react-hook-form";

export function isEmpty(obj: FieldErrors<any> | undefined) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}