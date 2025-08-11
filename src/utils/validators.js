export const validatePhone = (num) => /^(0|\+84)[3-9][0-9]{8}$/.test(num);
export const validatePlate = (val) => /^[0-9]{2}[A-Z]{1}[0-9]{5}$/i.test(val);
