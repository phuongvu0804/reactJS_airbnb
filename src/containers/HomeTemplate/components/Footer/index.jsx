import React from "react";
import { Link } from "react-router-dom";

//Material UI
import { Grid, IconButton, List, ListItem } from "@mui/material";
import { Container } from "@mui/system";
import { Circle } from "@mui/icons-material";

//others
import "./style.scss";
import { footerCategories, footerRightList, userTools, socialList } from "./constants";

function Footer() {
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
            <Grid item xs={4} sm={5} key={index} className="main-footer__tool-item" href={item.link}>
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
