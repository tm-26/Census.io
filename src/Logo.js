import React, {useEffect} from "react";
import { motion } from "framer-motion";
import Logo from './Logo.png'
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';

export default function Question(props) {

	const useStyles = makeStyles({
		root: {
			background: 'rgba(102,153,255)',
			border: 0,
			borderRadius: 3,
			boxShadow: '0 3px 5px 2px rgba(102,153,255, .3)',
			color: 'white',
			height: 48,
			padding: '0 30px',
			width: "50%"
		},
	});

	const [isActive, setIsActive] = React.useState(false);

	useEffect(() => {
		setIsActive(true)
	}, [props.current_id]);

	const spring = {
		duration: 3,
		type: "tween"
	};

	const classes = useStyles();

	return (
		<motion.div
			positionTransition={spring}
			animate={{y: isActive ? -0.7*window.innerHeight * (props.current_id - props.first_id) : 0}}
			transition={spring}
		>
			<div className={"roundedRectangle"}>

				<div className="mainmenu">
					<div>
						<img src={Logo} alt="Logo" className="logo_header"/>
					</div>
					<div style={{width: "100%", display:"flex", flex:"wrap"}}>
						<div style={{width: "100%"}}>
							<Button className={classes.root} variant="contained" color="primary" disableElevation  onClick={props.intro} >
								Start Survey
							</Button>
						</div>
						<div style={{width: "100%"}}>
							<Button className={classes.root} variant="contained" color="primary" disableElevation  onClick={props.handle.enter} >
								Switch to Fullscreen
							</Button>
						</div>
					</div>
				</div>

			</div>
		</motion.div>

	)


}
