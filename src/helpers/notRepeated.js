
export const noRepeated = ( text,todos ) => {
    const array = []
    array.push(todos)
    const found = array.find((element) => element.text === text);
    return found;
}
