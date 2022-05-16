const doWorkCallback = (callback) => {
    setTimeout(()=>{
        callback(undefined, "success!")
    }, 2000)
}


doWorkCallback((error, result, thc) => {
    if(error) {
        return console.log(error)
    }
    console.log(result)
})