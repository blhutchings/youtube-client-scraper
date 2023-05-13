export function getNumber(value) {
    if (!value)
        return undefined;
    value = value.replace(/[^0-9]/g, '');
    const num = parseInt(value);
    return isNaN(num) ? undefined : num;
}
export function hmsToSeconds(text) {
    if (!text)
        return undefined;
    let p = text.split(':'), s = 0, m = 1;
    while (p.length > 0) {
        s += m * getNumber(p.pop());
        m *= 60;
    }
    return s;
}
export function getChannelHandle(handle) {
    return handle?.match(/@.*/)?.[0];
}
export function getFirstNumberInRuns(runs) {
    const numberString = runs?.find(obj => getNumber(obj.text) !== undefined);
    return getNumber(numberString?.text);
}
export function getUrlNoQuery(url) {
    return url?.split('=')?.[0];
}
export function abbreviatedNumberToNumber(text) {
}
