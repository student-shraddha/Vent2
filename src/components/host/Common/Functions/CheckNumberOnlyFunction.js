
function CheckNumberOnlyFunction(value) {

    if (/^\d*\.?\d*$/.test(value))
        return true
    return false
}

export default CheckNumberOnlyFunction