export class BaseVO {
    pareseFromJson(value: object) {
        for (const key in value) {
            this[key] = value[key];
        }
    }
}
