import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo.png'

function ElevationScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});
	
	return React.cloneElement(children, {
		elevation: trigger ? 7 : 0,
	});
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

function Header() {
	const classes = useStyles();
	return (
		<div className="header">
			<CssBaseline />
			<ElevationScroll >
			<AppBar >
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<img src={Logo} alt="Logo" className="logo_header"/>
					</Typography>
					<Typography variant="h5" >
						By Team Blank
					</Typography>
				</Toolbar>
			</AppBar>
			
			</ElevationScroll>
			
		</div>
	);
}

export default Header;