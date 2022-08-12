import { Link } from "react-router-dom";

//Material UI
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "@/components/Image";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//Components
import images from "@/assets/images";

//Others
import "./style.scss";
import { Divider } from "@mui/material";
import SearchBar from "../SearchBar";

const pages = ["Stay", "Experiences", "Online Experiences"];
const settings = [
    {
        label: "Sign up",
        divider: false,
    },
    {
        label: "Log in",
        divider: true,
    },
    {
        label: "Host your home",
        divider: false,
    },
    {
        label: "Host an experience",
        divider: false,
    },
    {
        label: "Help",
        divider: false,
    },
];

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const TabletMobileNavbar = () => {
        return (
            <>
                <Box className="main-header__navbar" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </>
        );
    };

    return (
        <AppBar id="main-header" position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <IconButton
                        className="main-header__logo"
                        component={Link}
                        to="/"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <Image className="main-header__logo-img" src={images.logoWhite} alt="Airbnb logo" />
                    </IconButton>

                    {/* Nabar for tablet + mobile starts */}
                    {TabletMobileNavbar()}
                    {/* Nabar for tablet + mobile ends */}

                    {/* Navbar for PC starts */}
                    <Box className="main-header__navbar" sx={{ display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={Link}
                                to="/"
                                onClick={handleCloseNavMenu}
                                className="main-header__navbar-item"
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {/* Navbar for PC ends */}

                    <Box className="main-header__actions" sx={{ flexGrow: 0 }}>
                        <Button className="actions__btn" component={Link} to="/">
                             Become a host
                        </Button>
                        <IconButton className="actions__btn">
                            <LanguageIcon />
                        </IconButton>
                        <IconButton
                            className="actions__btn actions__btn--user"
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <MenuIcon className="actions__btn-icon" />
                            <AccountCircleIcon className="actions__btn-icon" />
                        </IconButton>
                        {/* Actions' sub nav */}
                        <Menu
                            className="actions__sub-nav"
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <div key={setting.label}>
                                    <MenuItem
                                        className="sub-nav__item"
                                        key={setting.label}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography
                                            className="sub-nav__item-link"
                                            component={Link}
                                            to="/"
                                            textAlign="center"
                                        >
                                            {setting.label}
                                        </Typography>
                                    </MenuItem>
                                    {setting.divider ? <Divider /> : ""}
                                </div>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <SearchBar />
        </AppBar>
    );
};
export default Header;
