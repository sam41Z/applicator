export default function changeByPath(path, target, value) {
    const keys = path.split(".");
    const property = keys.pop();
    let sub = target;
    let key;
    for (key of keys) {
        sub = sub[key];
    }
    sub[property] = value;
    return target;
};