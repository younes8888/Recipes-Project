// const validateEmail = (email) => {
//     const pattern = /^[a-z\d]+[\w.-]@[a-z\d]+[a-z\d-]\.[a-z]{2,63}$/i;
//     if (pattern.test(email)) {
//         return true;
//     } else {
//         return false;
//     }
// };
const validateEmail = (email) => {
    const pattern = /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,63}$/;
    return pattern.test(email)
};

export default validateEmail;
