import React, {useEffect} from "react";
import {motion} from "framer-motion";

const EndCard = (props) => {
	const [isActive, setIsActive] = React.useState(false);
	
	useEffect(() => {
		setIsActive(true)
	}, [props.current_id]);
	
	const spring = {
		duration: 3,
		type: "tween"
	};
	return (
		<motion.div
			positionTransition={spring}
			animate={{y: isActive ? -0.7*window.innerHeight * (props.current_id - props.first_id) : 0}}
			transition={spring}
		>
			<div className={"roundedRectangle"}>
				<div style={{height: "100%", display: "flex", alignItems:"center", paddingLeft:"20px", paddingRight:"20px", fontFamily: "Roboto"}}>
					<h2 style = {{margin: "auto"}}>Thank you. Your response has been submitted</h2>
				</div>
			
			</div>
		</motion.div>
	
	)
}

export default EndCard;
