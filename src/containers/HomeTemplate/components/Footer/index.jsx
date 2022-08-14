import { Button, Grid, IconButton, List, ListItem, Menu, MenuItem } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import EuroIcon from "@mui/icons-material/Euro";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

//others
import "./style.scss";
import { Circle, Facebook, Instagram, Twitter } from "@mui/icons-material";

function Footer() {
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

    const renderFooterCategories = () => {
        return footerCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className="main-footer__category">
                <h6 className="main-footer__category-title">{category.categoryName}</h6>
                <List className="main-footer__category-list">
                    {category.categoryItem.map((item, index) => (
                        <ListItem key={index} component={Link} to={item.link} className="category-list__item">
                            {item.name}
                        </ListItem>
                    ))}
                </List>
            </Grid>
        ));
    };

    const renderFooterRights = () => {
        return footerRightList.map((item, index) => (
            <Grid
                item
                xs={3}
                sm={2}
                component={Link}
                key={index}
                to={item.link}
                className="main-footer__right-item main-footer__right-item--link"
            >
                <Circle className="main-footer__right-item-icon" />
                {item.name}
            </Grid>
        ));
    };

    const renderUserTools = () => {
        return userTools.map((item, index) => (
            <Grid item xs={4} sm={4} key={index} className="main-footer__tool-item" href={item.link}>
                {item.icon}
                <span className="main-footer__tool-name">{item.name}</span>
            </Grid>
        ));
    };

    const renderSocialList = () => {
        return socialList.map((item, index) => (
            <Grid item xs={2} sm={4} key={index}>
                <IconButton href={item.link} className="main-footer__social-item">
                    {item.icon}
                </IconButton>
            </Grid>
        ));
    };
    return (
        <footer id="main-footer">
            <Container>
                <div className="main-footer__top">
                    <Grid container>{renderFooterCategories()}</Grid>
                </div>
                <div className="main-footer__bottom">
                    <Grid container sx={{ alignItems: "center" }}>
                        <Grid item sm={6} md={6} className="main-footer__right-list">
                            <Grid container>
                                <Grid item xs={12} sm={4} md={3} component="p" className="main-footer__right-item">
                                    © 2022 Airbnb, Inc.
                                </Grid>
                                {renderFooterRights()}
                            </Grid>
                        </Grid>
                        <Grid item sm={6} md={6} container className="main-footer__actions">
                            <Grid item sm={8} md={6} container className="main-footer__tool-list">
                                {renderUserTools()}
                            </Grid>
                            <Grid item sm={3} md={3} container className="main-footer__social-list">
                                {renderSocialList()}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
