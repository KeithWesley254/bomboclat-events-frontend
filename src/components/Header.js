import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import { useLocation, useNavigate } from "react-router-dom";
import DayNightToggle from 'react-day-and-night-toggle'
import { ThemeState } from "../ThemeContext";
import { UserState } from "../UserContext";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, userProfile, logOut } = UserState();
  const { isDarkMode, accent, subTitles, textColor, bgColor, setIsDarkMode } = ThemeState();

  const navigate = useNavigate();
  const location = useLocation();
  
  function handleLogoutClick() {
    logOut();
  }

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

  return (
    <AppBar position="sticky" sx={{ bgcolor: bgColor }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="headerLogo" onClick={() => navigate("/")}>
            <p
              style={{
                fontWeight: "bolder",
                fontSize: 14,
                color: textColor,
                cursor: "pointer",
              }}
            >
              Events
              <br />
              <span style={{ color: accent, cursor: "pointer" }}>
                Bomboclat
              </span>
            </p>
          </div>

          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: textColor }}
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
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/");
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "black",
                  }}
                  textAlign="center"
                >
                  Home
                </Typography>
              </MenuItem>

              {user?.role === ("admin" || "organizer") ? (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/create-an-event");
                  }}
                >
                  <Typography
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "black",
                    }}
                    textAlign="center"
                  >
                    Create An Event
                  </Typography>
                </MenuItem>
              ) : (
                " "
              )}

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/about-us");
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "black",
                  }}
                  textAlign="center"
                >
                  About Us
                </Typography>
              </MenuItem>
              {"error" in user ? (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/login", { state: location.pathname });
                  }}
                >
                  <Typography
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "black",
                    }}
                    textAlign="center"
                  >
                    Log In
                  </Typography>
                </MenuItem>
              ) : (
                " "
              )}
            </Menu>
          </Box>
          <TheaterComedyIcon
            sx={{
              display: { xs: "flex", md: "none" },
              color: accent,
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "nunito",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: textColor,
              textDecoration: "none",
              flexWrap: "wrap",
              fontSize: 13
            }}
          >
            Events
            <br />
            <span style={{ color: accent }}>Bomboclat</span>
          </Typography>
          
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{
                my: 2,
                textTransform: "none",
                display: "block",
                fontSize: 15,
                fontWeight: 600,
                color: subTitles,
              }}
            >
              Home
            </Button>
            &nbsp; &nbsp; &nbsp;
            {user?.role === ("admin" || "organizer") ? (
              <>
                <Button
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/create-an-event");
                  }}
                  sx={{
                    my: 2,
                    textTransform: "none",
                    display: "block",
                    fontSize: 15,
                    fontWeight: 600,
                    color: accent,
                  }}
                >
                  Create An Event
                </Button>
                &nbsp; &nbsp; &nbsp;
              </>
            ) : (
              ""
            )}
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/about-us");
              }}
              sx={{
                my: 2,
                textTransform: "none",
                display: "regular",
                fontSize: 15,
                fontWeight: 600,
                color: subTitles,
              }}
            >
              About Us
            </Button>
            &nbsp; &nbsp; &nbsp;
            {"error" in user ? (
              <>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/login", { state: location.pathname });
                }}
                sx={{
                  my: 2,
                  textTransform: "none",
                  display: "block",
                  fontSize: 15,
                  fontWeight: 600,
                  color: subTitles,
                }}
              >
                Log In
              </Button>
              &nbsp; &nbsp; &nbsp;
              </>
            ) : (
              " "
            )}
          </Box>
            <Box 
            sx={{
              my: 2,
              textTransform: "none",
              display: "block",
              fontSize: 15,
            }}
            >
              <DayNightToggle
                onChange={() => setIsDarkMode(!isDarkMode)}
                checked={isDarkMode}
              />
            </Box>
            &nbsp; &nbsp; &nbsp;
          <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open settings">
              
              {"error" in user ? 
              (
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, mr: { md: 7 } }}
                >
                  <Avatar
                    alt={""}
                    src={""}
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, mr: { md: 7 } }}
                >
                  <Avatar
                    alt={userProfile?.full_name || ""}
                    src={userProfile?.image_upload || ""}
                  />
                </IconButton>
              )
              }
                  
            </Tooltip>
            <Menu
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
              {"role" in user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(`/user-profiles/${user?.id}`)}
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/login", { state: location.pathname });
                  }}
                >
                  <Typography
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "black",
                    }}
                    textAlign="center"
                  >
                    Log In / Sign Up
                  </Typography>
                </MenuItem>
              )}

              {"role" in user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={handleLogoutClick}
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "black",
                    }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                " "
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
