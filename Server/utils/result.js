function createResult(err,data){
    const result = {}
    if(data){
        result.status = 'success'
        result.data = data
    }else {
        result.status = 'error'
        result.error = err
    }
    return result
}

module.exports = { createResult }