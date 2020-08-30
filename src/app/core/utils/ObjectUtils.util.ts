export default class ObjectUtils {

    static clone<T>(object: T) {
        return Object.assign({}, object);
    }

}