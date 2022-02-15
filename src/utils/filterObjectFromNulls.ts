export function removeUndefinedFromObject<T>(object: T) {
    const keys = Object.keys(object);
    keys.map((val) => {
        if (typeof object[val] === 'object') {
            if (object[val] === null) {
                delete object[val];
                return;
            }
            if (object[val].length) {
                object[val].map((el, ind) => {
                    if (!el) object[val].splice(ind);
                });
                if (object[val].length === 0) {
                    delete object[val];
                    return;
                }
            }
            removeUndefinedFromObject(object[val]);
        }
        if (object[val] === undefined) delete object[val];
    });
}
