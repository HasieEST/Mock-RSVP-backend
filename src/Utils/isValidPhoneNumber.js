const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(phoneNumber)
};

export default isValidPhoneNumber