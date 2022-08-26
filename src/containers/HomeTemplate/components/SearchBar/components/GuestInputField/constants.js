const settings = [
    {
        inputName: "Adults",
        subText: "Ages 13 or above",
        link: false,
        divider: true,
    },
    {
        inputName: "Children",
        subText: "Ages 2 - 12",
        link: false,
        divider: true,
    },
    {
        inputName: "Infants",
        subText: "Under 2",
        link: false,
        divider: true,
    },
    {
        inputName: "Pets",
        subText: "Bringing a service animal ?",
        link: true,
    },
];

const minGuest = 1;
const maxGuest = 100;

export { settings, minGuest, maxGuest };
