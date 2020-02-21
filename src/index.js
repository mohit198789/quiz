import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './assets/style.css';
import quizService from './quizService';
import QuestionBox from './components/QuestionBox';
import Result from './components/Result';
class Quiz extends Component{
    state={
        questionarr:[],
        score:0,
        response:0
    };
    getquestion=()=>{
        quizService().then(question=>{
            this.setState({
                questionarr:question
            });
        });
    };
    componentDidMount(){
        this.getquestion();
    }
computeAnswer=(answer,correctAnswer)=>{
if(answer===correctAnswer)
{
    this.setState({
        score:this.state.score+1
    });
    
}
this.setState({
    response:this.state.response<5?this.state.response+1:5
});
    }
    playAgain=()=>{
        this.getquestion();
        this.setState({
            score:0,
            response:0
        })
    }
    render(){
        return(
            <div>
            <div className="title">Quiz Contest</div>
           {this.state.questionarr.length>0 && this.state.response<5 &&this.state.questionarr.map(({question,answers,correct,questionId})=>
           (
          <QuestionBox question={question} options={answers} key={questionId} 
          selected={answer=>this.computeAnswer(answer,correct)}></QuestionBox>
           )
           )}
           {this.state.response===5?(<Result score={this.state.score} playAgain={this.playAgain}/>):null}
            </div>
            
        )
    }
}

ReactDOM.render(<Quiz/>,document.getElementById("root"));