import React, {useState, useEffect} from "react";
import {QUESTIONS} from "./questions";
import Questions from "./QuestionsComp"


function App () {
  const [selectedData, setSelectedData] = useState({})
  const [score, setScore] = useState(0)
  const [allRunScores, setAllRunScores] = useState([]) 

  useEffect(()=>{
    const getPrevStoredScores = JSON.parse(localStorage.getItem('allRunScores'));
    if (getPrevStoredScores) {
      setAllRunScores(getPrevStoredScores);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('allRunScores', JSON.stringify(allRunScores));
  }, [allRunScores]);

  const handleChange = (e) =>{
    const {id, name, value} = e.target
    const tmpSelectedData = {...selectedData} ;
    const tmpObj = {}
    tmpObj["id"] = id;
    tmpObj["question"] = name;
    tmpObj["res"] = value;

    tmpSelectedData[id] = tmpObj;
    setSelectedData(tmpSelectedData)

  }

  const getScore = () =>{
      let noOfQuestions = 0, noOfYesAns = 0;
      Object.keys(selectedData).map((ele)=>{
        noOfQuestions ++; 
        if(selectedData[ele].res==="Yes"){
          noOfYesAns ++;
        }
      })

      if(noOfQuestions > 0 ){
        const scoreV = 100*noOfYesAns/noOfQuestions
        setScore(scoreV.toFixed(2));
        setAllRunScores([...allRunScores, scoreV.toFixed(2)]);
      }



      
              
      console.log(noOfQuestions, noOfYesAns)
  }

  const averageScore = (
    allRunScores.reduce((acc, score) => acc + parseFloat(score), 0) / allRunScores.length
  ).toFixed(2);

  console.log(selectedData)
    return (
      <div className="main__wrap">
        <main className="container">
          <div>
            TODO
            {Object.keys(QUESTIONS).map((ques)=>{
              console.log(ques)
              return (
                <Questions handleChange={handleChange} key={ques} id={ques} question={QUESTIONS[ques]}/>
              )
            })}
          </div>
          <button onClick={getScore}>Get Score</button>
          { score!==0  ? <h2>Your score is {score} </h2>  : "" }
          { allRunScores!==0  ? <h2>Your Avg score is {averageScore} </h2>  : "" }
        </main>
      </div>
    );
  }


export default App;
