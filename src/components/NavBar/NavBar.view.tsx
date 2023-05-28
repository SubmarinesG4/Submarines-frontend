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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavBarProps } from "./NavBar.types";
import useNavBar from "./NavBar.logic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store";

export default function View(props: NavBarProps) {
	const navigate = useNavigate();
	const { signOut } = useNavBar(props);

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const user = useAppSelector((state) => state.userSlice.user);
	const showTenantsMenuItem = user?.roles.includes("super-admin");
	const userTenant = user?.attributes["custom:tenantId"];
	const navigateTo = (path: string, nav: boolean) => (event: any) => {
		if (nav) {
			handleCloseNavMenu();
		} else {
			handleCloseUserMenu();
		}
		navigate(path);
	};

	const title = (
		<Typography // PICCOLO
			variant="h5"
			noWrap
			component="a"
			href=""
			sx={{
				mr: 2,
				flexGrow: 1,
				fontFamily: "monospace",
				fontWeight: 700,
				letterSpacing: ".3rem",
				color: "inherit",
				textDecoration: "none",
			}}
		>
			SUBMARINES
		</Typography>
	);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1 }}>
						<IconButton // PICCOLO
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
								display: "block",
							}}
						>
							{showTenantsMenuItem && (
								<MenuItem key={"Tenants"} onClick={navigateTo("/tenants", true)}>
									<Typography textAlign="center">{"Tenants"}</Typography>
								</MenuItem>
							)}
							{!showTenantsMenuItem && (
								<MenuItem key={"Tenant"} onClick={navigateTo(`/tenant/${userTenant}`, true)}>
									<Typography textAlign="center">{`Info ${userTenant}`}</Typography>
								</MenuItem>
							)}
							{!showTenantsMenuItem && (
								<MenuItem key={"Traduzioni"} onClick={navigateTo(`/translations/${userTenant}`, true)}>
									<Typography textAlign="center">{`Traduzioni`}</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
					{title}
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={user?.username || "User"} sx={{ bgcolor: "#1976d2", color: "white" }}>
									<AccountCircleIcon />
								</Avatar>
							</IconButton>
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
							<MenuItem key="Logout" onClick={signOut}>
								<Typography textAlign="center">Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
