let array = [1, 2, 1, 3, 5, 5, 7, 2, 3, 4, 5, 7]

function count(arr, elem) {
    return arr.filter((ele) => ele == elem).length
}
console.log(count(array,5))