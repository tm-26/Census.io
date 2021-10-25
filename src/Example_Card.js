import React, {useEffect} from "react";
import { motion } from "framer-motion";

export default function Question(props) {

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
					<h2 className="briefing">Welcome to Census.io! The survey will begin after this briefing. I will start reading out the questions and will then listen to your response. As you are speaking, you will see your answers being filled in. At the bottom right of the screen, you will see a speaker icon when I am talking and a microphone icon when you are answering the question.</h2>
				</div>

			</div>
		</motion.div>

	)


}
