export default class EnumUtils {

    static getEnumKeys(enumObject: any) {
        const keys = Object.keys(enumObject).filter(k => typeof enumObject[k as any] !== "number"); // Example enum: enum E { A, B } /// Example return: ["A", "B"]
        return keys;
    }

    static getEnumValues(enumObject) {
        const keys = this.getEnumKeys(enumObject);
        const values = keys.map(k => enumObject[k as any]);
        return values;
    }

    static getValueOfKey(enumKey, enumType) {
        return enumType[enumKey];
    }

    static getKeyOfValue(enumValue, enumType) {
        const keys = this.getEnumKeys(enumType);
        let found = undefined;
        keys.map(k => {
            if (enumType[k as any] === enumValue) {
                found = k;
            }
        });
        return found;
    }

}