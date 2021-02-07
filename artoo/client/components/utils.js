export function cToF(celsius) {
    const cTemp = celsius;
    const cToFahr = cTemp * 9 / 5 + 32;
    const message = `${cTemp}\xB0C is ${cToFahr} \xB0F.`;
    let float = +cToFahr.toPrecision(3)
    return float
}