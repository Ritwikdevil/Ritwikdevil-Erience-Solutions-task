
const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}
const isValidBody = (reqBody) => {
  return Object.keys(reqBody).length == 0;
}
  const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
  }
  const isValidMobile = (Mobile) => {
    return /([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/.test(Mobile)
  };
  
// const validUrl = (mediaurl)=>{
//   /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/.test(mediaurl)
// }




module.exports = { isValid, isValidBody,isValidName,isValidMobile }