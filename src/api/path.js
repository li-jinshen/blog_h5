const files = require.context("./path",false,/\.js$/);
let path = {}
files.keys().forEach(key=>{
	Object.assign(path,files(key).route)
})
export default path 