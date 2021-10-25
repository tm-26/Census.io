import Button from '@material-ui/core/Button';
import "./App.css";
import "./Body.css";
import Question from './Question'
import React, {useEffect} from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import tts from "basic-tts"
import Logo from "./Logo";
import Example_Card from "./Example_Card";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import EndCard from "./EndCard";

// TODO: This can be changed from the admin settings (optional)
const speaker = tts.createSpeaker({
	voice: "Google US English",
	lang: "en-US",
	volume: 1,
	pitch: 1,
	rate: 1
});
// // Global variable declaration
//
// const tts = require("basic-tts");

let currentTime = 0;
let changed = false;
let numberOfTimesChanged = 0;
let index = 0;



function Body() {

	const handle = useFullScreenHandle();

	// Variable Declaration
	const [isSpeaking, setIsSpeaking] = React.useState(false);
	const { transcript, resetTranscript } = useSpeechRecognition();
	const [questions_ans, setQuestionsAns] = React.useState([
		{id: 2, question: "What is your age?", answer: null, type: "textfield"},
		{id: 3, question: "Do you have high fever or a dry cough?", answer: null, type: "textfield"},
		{id: 4, question: "Have you travelled abroad within the past 14 days?", answer: null, type: "textfield"},
	]);
	// -2 since we start with the logo, then the help
	const [current_question_id, setCurrentQuestionId] = React.useState(questions_ans[0].id-2);

	const intro = () => {
		setCurrentQuestionId(current_question_id + 1);
		setTimeout(function(){
			speaker.speak("Welcome to Census.io! The survey will begin after this briefing. I will start reading out the questions and will then listen to your response.").then(() => {
			speaker.speak("As you are speaking, you will see your answers being filled in. At the bottom right of the screen, you will see a speaker icon when I am talking and a microphone icon when you are answering the question.").then(() => {
				setCurrentQuestionId(current_question_id + 2);
				ask(current_question_id+2, questions_ans);
			})

			})},
		3000);
	};

	const ask = (current_question_id, questions) => {
		//Check if current question ID is smaller than the ID of the first question + the length (so the id of the last question)
		if(current_question_id <= questions_ans.length+questions_ans[0].id) {
			setTimeout(function(){
			speaker.speak(questions[index]["question"]).then(()=>{
				
				setIsSpeaking(true);
				//Reset Transcript
				resetTranscript()
				SpeechRecognition.startListening({continuous: true});

				let x = setInterval(function () {
					if ((currentTime < new Date(Date.now() - 2200)) && changed) {
						
						SpeechRecognition.stopListening();
						setIsSpeaking(false);
						changed = false;
						numberOfTimesChanged = 2;
						index++;
						
						// //Reset Transcript
						// resetTranscript()

						console.log("CURRENT QUESTION ID: ", current_question_id)
						if (index === questions.length) {
							setCurrentQuestionId(current_question_id + 1)
							speaker.speak("Thank you. Your response has been submitted!")
						} else {
							setCurrentQuestionId(current_question_id + 1)
						}

						clearInterval(x);
					}
				}, 2200);
			});}, 3000);

		}
	}



	useEffect(() => {
		if(transcript == null || transcript === ""){
			numberOfTimesChanged = 1;
			changed = false;
		}else {
			numberOfTimesChanged++;
			currentTime = new Date();
			if (numberOfTimesChanged === 2) {
				changed = true;
			}
		}
	}, [transcript]);

	useEffect(() => {
		console.log("CURRENT QUESTION ID: ", current_question_id, current_question_id <= questions_ans.length +1, current_question_id !== questions_ans[0].id, current_question_id >= questions_ans[0].id)
		if(current_question_id <= questions_ans.length +1 && current_question_id !== questions_ans[0].id && current_question_id >= questions_ans[0].id)
			ask(current_question_id, questions_ans)
	}, [current_question_id]);


	if (!SpeechRecognition.browserSupportsSpeechRecognition() || !tts.isSupported()) {

		return (
			<div>
				<p>{"This browser is not supported"}</p>
			</div>
		)
	}
	return (
		<FullScreen handle={handle}>
			<div className="paper_background">
				<Logo current_id = {current_question_id} first_id = {questions_ans[0].id-2} intro = {intro} handle={handle}/>
				<Example_Card  current_id = {current_question_id} first_id = {questions_ans[0].id-2}/>
				{/*Create as many Question functions as we have in the array*/}
				{(questions_ans).map((question, index) => (
					<>
						<Question key = {index} setCurrentQuestionId = {setCurrentQuestionId} initial_id={questions_ans[0].id} current_id = {current_question_id} all_questions= {questions_ans} setAns={setQuestionsAns} question = {question} transcript={transcript}/>
					</>
				))}
				
				<EndCard current_id = {current_question_id} first_id = {questions_ans[0].id-2}/>
			</div>
			<div className="bottomRight">
				{isSpeaking && current_question_id > 0 &&
				<div className="icondiv moveicondiv">
					<i className="fas fas fa-microphone fa-3x"></i>
				</div>
				}
				{!isSpeaking && current_question_id > 0 &&
				<div className="icondiv">
					<i className="fas fa-volume-up fa-3x"></i>
				</div>
				}
			</div>
		</FullScreen>
	)
}

export default Body;
