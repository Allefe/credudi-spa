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

    static enumToObject(enumeration: any) {
        return JSON.parse(enumeration.json());
    }

    static mapEnum(enumerable: any, fn: Function) {
        Object.keys(enumerable).map((key,index,array) => {
            return fn(key, enumerable[key]);
        });
    }
}