const ROLE = {
    ADMIN: "ADMIN",
    CLIENT: "CLIENT",
};

const FUNCTIONALITY = {
    ADD: "Add",
    EDIT: "Edit",
    DETAILS: "Details",
};

const calculateTotalGuest = (guestNumber) => {
    let guestTotal = 0;
    for (let guest in guestNumber) {
        guestTotal += guestNumber[guest];
    }
    return guestTotal;
};

export { ROLE, FUNCTIONALITY, calculateTotalGuest };
