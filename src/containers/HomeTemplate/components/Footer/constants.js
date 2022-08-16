//Material UI
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import EuroIcon from "@mui/icons-material/Euro";

const footerCategories = [
    {
        categoryName: "Support",
        categoryItem: [
            {
                name: "Help Center",
                link: "/",
            },
            {
                name: "AirCover",
                link: "/",
            },
            {
                name: "Safety information",
                link: "/",
            },
            {
                name: "Supporting people with disabilities",
                link: "/",
            },
            {
                name: "Cancellation options",
                link: "/",
            },
            {
                name: "Our COVID-19 Response",
                link: "/",
            },
            {
                name: "Report a neighborhood concern",
                link: "/",
            },
        ],
    },
    {
        categoryName: "Community",
        categoryItem: [
            {
                name: "Airbnb.org: disaster relief housing",
                link: "/",
            },
            {
                name: "Support Afghan refugees",
                link: "/",
            },
            {
                name: "Combating discrimination",
                link: "/",
            },
        ],
    },
    {
        categoryName: "Hosting",
        categoryItem: [
            {
                name: "Try hosting",
                link: "/",
            },
            {
                name: "AirCover for Hosts",
                link: "/",
            },
            {
                name: "Explore hosting resources",
                link: "/",
            },
            {
                name: "Visit our community forum",
                link: "/",
            },
            {
                name: "How to host responsibly",
                link: "/",
            },
        ],
    },
    {
        categoryName: "Airbnb",
        categoryItem: [
            {
                name: "Newsroom",
                link: "/",
            },
            {
                name: "Learn about new features",
                link: "/",
            },
            {
                name: "Letter from our founders",
                link: "/",
            },
            {
                name: "Investors",
                link: "/",
            },
            {
                name: "Gift cards",
                link: "/",
            },
        ],
    },
];

const footerRightList = [
    {
        name: "Privacy",
        link: "/",
    },
    {
        name: "Terms",
        link: "/",
    },
    {
        name: "Sitemap",
        link: "/",
    },
];

const userTools = [
    {
        name: "Language",
        icon: <LanguageIcon className="main-footer__tool-icon" />,
        link: "/",
    },
    {
        name: "Currency",
        icon: <EuroIcon className="main-footer__tool-icon" />,
        link: "/",
    },
];

const socialList = [
    {
        icon: <Facebook className="main-footer__social-item-icon" />,
        link: "/",
    },
    {
        icon: <Twitter className="main-footer__social-item-icon" />,
        link: "/",
    },
    {
        icon: <Instagram className="main-footer__social-item-icon" />,
        link: "/",
    },
];

export { footerCategories, footerRightList, userTools, socialList };
