
const getNumberWithOrdinal = (n: number): string => {
    var s=["th","st","nd","rd"],
    v=n%100;
    return (s[(v-20)%10]||s[v]||s[0]);
}

export {
    getNumberWithOrdinal
};