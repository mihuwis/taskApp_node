const doPromissesWork = new Promise((resolve, reject) => {
    setTimeout(() =>{
        // resolve('it works')
        reject('ups, sorry')
    }, 2000)
})

doPromissesWork.then((result) => {
    console.log(result)
}).catch((reason) => {
    console.log(reason)
})