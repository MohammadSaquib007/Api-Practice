//email phone validator
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());

}
function isValidPhone (Phone) {
  const ra = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  if (typeof (Phone) == Number) {
      return re.test(Phone.trim())
  } else {
      return ra.test(Phone)
  } }

module.exports.isValidEmail = isValidEmail
module.exports.isValidPhone = isValidPhone