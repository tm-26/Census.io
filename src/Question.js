import React, {useEffect} from "react";
import { motion } from "framer-motion";
import TextField from '@material-ui/core/TextField';
import Checkbox from "@material-ui/core/Checkbox";
import { Checkmark } from 'react-checkmark';
import { makeStyles } from '@material-ui/core/styles';

export default function Question(props) {

	const [isActive, setIsActive] = React.useState(false);
	const [playAnimation, setPlayAnimation] = React.useState(false);
	const [ans, setAns] = React.useState(" ");
	useEffect(() => {
		if(props.transcript != null && props.transcript !== "" && props.current_id  === props.question.id )
			setAns(props.transcript)
	}, [props.transcript]);
	useEffect(() => {
		setIsActive(true)


		//If this question has been finished, add the answer to parent component state variable that holds all the answers
		if(props.current_id - 1 === props.question.id ){
			props.setAns([
				...props.all_questions.slice(0,props.question.id- props.initial_id),
				{
					...props.all_questions[props.question.id- props.initial_id],
					answer: ans,
				},
				...props.all_questions.slice(props.question.id- props.initial_id+1),

			])
			setPlayAnimation(true)
			setTimeout(function(){ setPlayAnimation(false); }, 3000);

		}
	}, [props.current_id]);

	const useStyles = makeStyles({
		root: {
			'& label.Mui-focused': {
				color: 'white',
			},
			'& .MuiInput-underline:after': {
				borderBottomColor: 'white',
			},
			'& .MuiOutlinedInput-root': {
				'& fieldset': {
					borderColor: 'white',
				},
				'&:hover fieldset': {
					borderColor: 'white',
				},
				'&.Mui-focused fieldset': {
					borderColor: 'white',
				},
			},
		},
	});

	const classes = useStyles();

	function handleTextInputChange(event) {
		setAns(event.target.value)
	}
	function handleCheckboxChange(event) {
		setAns(event.target.checked)
	}
	const spring = {
		duration: 3,
		type: "tween"
	};

	return (
		<motion.div
			positionTransition={spring}
			//props.initial_id-2 due to the initial 2 cards
			animate={{y: isActive ? -0.7*window.innerHeight * (props.current_id - (props.initial_id -2 )) : 0}}
			transition={spring}
		>
			<div className={"roundedRectangle"}>
				{
					playAnimation &&
						<>
						<Checkmark />
						<div style={{visibility: "hidden", background: "green"}}>
						{props.question.type === "textfield" &&
							<div style={{fontFamily: "Roboto", height:"100%"}}>
								<h2 id={"main"} style={{marginTop:"20px", marginBottom:"30px"}}>{props.question.question}</h2>
								<div className="fieldHolder">
									<TextField id="standard-basic" value={ans} multiline style={{width: "90%"}} className={classes.root} inputProps={{style: {fontSize: 20, fontFamily:"Roboto", lineHeight: 1.6}}}
											   onChange={handleTextInputChange}/>
								</div>
							</div>
						}

						{props.question.type === "checkbox" &&
							<div style={{fontFamily: "Roboto", height:"100%"}}>
								<h2 id={"main"} className={"inline"} style={{marginTop:"20px", marginBottom:"30px"}}>{props.question.question}</h2>
								<Checkbox className={"inline"} checked={ans} onChange={handleCheckboxChange}/>
							</div>
						}
						<br/>
					</div>
					</>
				}
				{!playAnimation &&
				<div style={{height: "100%"}}>
					{props.question.type === "textfield" &&
					<div style={{fontFamily: "Roboto", height:"100%"}}>
						<h2 id={"main"} style={{marginTop:"20px", marginBottom:"30px"}}>{props.question.question}</h2>
						<div className="fieldHolder">
							<TextField id="standard-basic" value={ans} multiline variant="outlined" style={{width: "90%"}} className={classes.root} inputProps={{style: {fontSize: 20, fontFamily:"Roboto", lineHeight: 1.6}}}
									   onChange={handleTextInputChange}/>
						</div>
					</div>
					}

					{props.question.type === "checkbox" &&
					<div style={{fontFamily: "Roboto", height:"100%"}}>
						<h2 id={"main"} className={"inline"} style={{marginTop:"20px", marginBottom:"30px"}}>{props.question.question}</h2>
						<Checkbox className={"inline"} checked={ans} onChange={handleCheckboxChange}/>
					</div>
					}

					<>
						<br/>
					</>
				</div>
				}
			</div>
		</motion.div>

	)


}
