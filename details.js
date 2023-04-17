
let fewo  = JSON.parse(localStorage.getItem("fewo"));

console.log( JSON.stringify(fewo))

function test (){
document.getElementById("test").innerHTML=JSON.stringify(fewo)
}