export class Serializable<T> {
    constructor(model?: Partial<T>) {
        if (model)
            Object.assign(this, model);
    }
}
