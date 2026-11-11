import { useState, useEffect } from 'react';

export default function App() {

  const [tasks,setTasks] = useState(()=>{

    const saved = localStorage.getItem("tasks");

    if(saved != null){
      return JSON.parse(saved);
    }
    else{
      return ['OK','Done'];
    }
    
  });


  useEffect(()=>{
    localStorage.setItem("my_practise_tasks",JSON.stringify(tasks));
    console.log("tasks updated");
  },[tasks]);


  

 
    return (
      <>
      
      
      </>
    )
 

  
  

    
     
  
}