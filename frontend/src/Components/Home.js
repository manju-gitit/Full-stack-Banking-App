import React from 'react'
import Card from './Common/Card'  
import bank from '../bank.png'

function Home(){
  return (
    <Card
      txtcolor="black"
      header="Better Bank"
      title="Welcome to Better Bank!"
      text="You can explore around using the navigation bar."
      body={(<img src={bank} className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}

export default Home
