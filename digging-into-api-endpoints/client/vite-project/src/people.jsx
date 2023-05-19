import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './index.css'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import image1 from "./images/datas-circle.png";
import image2 from "./images/datas-logo.png";

function HomeRightEnd(){
  return(
    <div className="right-end">
      <div className='about'>
        <Link className="link-formatting" to="/about">About</Link>
      </div>
      <div className='people'>
        <Link class="link-formatting" to="/people">People</Link>
      </div>
      <div className="resources">
        <Link className="link-formatting" to="/resources">Resources</Link>
      </div>
      <div className='contact'>
        <Link className="link-formatting" to="/contact">Contact</Link>
      </div>
    </div>
  
  )

}

function FirstNameInput(props){
  return(
    <div className="input-container">
      <input
        className="inputs"
        id="firstNameInput"
        key={"firstName"}
        type="text"
        placeholder={props.placeholder}
      />
      <div className="red-asterisk">
        {props.redAsterisk}
      </div>
    </div>
  )
}

function LastNameInput(props){
  return(
    <div className="input-container">
      <input
        className="inputs"
        id="lastNameInput"
        key={"lastName"}
        type="text"
        placeholder={props.placeholder}
      />
      <div className="red-asterisk">
        {props.redAsterisk}
      </div>
    </div> 
  )
}

function GradeInput(props){
  return(
    <select className="inputs" id="gradeInput" key={"grade"} type="number" placeholder={props.placeholder}>
      <option value={0}>{props.placeholder}</option>
      <option value={9}>9</option>
      <option value={10}>10</option>
      <option value={11}>11</option>
      <option value={12}>12</option>
    </select>
  )
}

function EmailInput(props){
  return(
    <div className="input-container">
      <input
        className="inputs"
        id="emailInput"
        key={"email"}
        type="text"
        placeholder={props.placeholder}
      />
      <div className="red-asterisk">
        {props.redAsterisk}
      </div>
    </div>
  )
}

function StatusInput(props){
  return(
    <div className="input-container">
      <select className="inputs" id="statusNameInput" key={"status"} type="text" placeholder={props.placeholder}>
        <option value="empty">{props.placeholder}</option>
        <option value="Pre-training">Pre-training</option>
        <option value="Training">Training</option>
        <option value="Review team member">Review team member</option>
        <option value="Head">Head</option>
        <option value="Off-boarded">Off-boarded</option>
        <option value="Faculty advisor">Faculty advisor</option>
      </select>
    </div>
  )

}

function ReviewTeamInput(props){
  return(
    <select className="inputs" id="reviewTeamInput" key={"reviewTeam"} type="number" placeholder={props.placeholder}>
      <option value={0}>{props.placeholder}</option>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
    </select>
  )

}

function PhotoInput(props){
  return(
    <input
      className="inputs"
      key={"photo"}
      type="file"
      placeholder={props.placeholder}
      accept="image/*"
    /> 
  )

}

class MemberDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      grades: [],
      emails: [],
      statuses: [],
      reviewTeams: [],
      photos: []

    }
    this.onAddClick = this.onAddClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  clearState(){
    this.setState({
      firstNames: [],
      lastNames: [],
      grades: [],
      emails: [],
      statuses: [],
      reviewTeams: [],
      photos: []
    })
  }

  getRequest(){
    axios.get("http://localhost:3000/members")
    .then(res => {
      console.log("received all members")
      
      this.clearState()

      let updatedFirstNames = this.state.firstNames.slice()
      let updatedLastNames = this.state.lastNames.slice()
      let updatedGrades = this.state.grades.slice()
      let updatedEmails = this.state.emails.slice()
      let updatedStatuses = this.state.statuses.slice()
      let updatedReviewTeams = this.state.reviewTeams.slice()
      let updatedPhotos = this.state.photos.slice()

      for(let i = 0; i < res.data.length; i++){
        updatedFirstNames.push(res.data[i].firstName) 
        updatedLastNames.push(res.data[i].lastName)
        updatedGrades.push(res.data[i].grade)
        updatedEmails.push(res.data[i].email)
        updatedStatuses.push(res.data[i].status)
        updatedReviewTeams.push(res.data[i].reviewTeam)
        updatedPhotos.push(res.data[i].photo)
      }
      
      this.setState({
        firstNames: updatedFirstNames,
        lastNames: updatedLastNames,
        grades: updatedGrades,
        emails: updatedEmails,
        statuses: updatedStatuses,
        reviewTeams: updatedReviewTeams,
        photos: updatedPhotos
      })
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  componentDidMount(){
    document.getElementById("addForm").reset()
    this.getRequest()
    console.log("component did mount")
  }

  onAddClick(event) {
    event.preventDefault()
    console.log(event)
    this.clearState()

    // const resizeImage = (imageFile) => {
    //   try {
    //     Resizer.imageFileResizer(
    //       imageFile,
    //       10,
    //       10,
    //       "JPEG",
    //       100,
    //       0
    //     )
    //   } catch(err){
    //     console.log(err)
    //   }
    // }
    
    let photoToUpload = undefined
    try {
      // let resizedImage = resizeImage(event.target[6].files[0])
      console.log(event.target[6].files[0])
      // console.log(resizedImage)
      photoToUpload = URL.createObjectURL(event.target[6].files[0])
      // photoToUpload = URL.createObjectURL(resizedImage)
      console.log(photoToUpload) 
      console.log(this.state.photos)
    } catch (err){
      console.log(err)
    } 
    
    
    if (event.target[0].value == "" || event.target[1].value == "" || event.target[3].value == "" ){
      alert("Please make sure all required fields are filled")
      this.getRequest()
      this.renderMembers()
      document.getElementById("addForm").reset()
    }
    axios.post("http://localhost:3000/add-member", {
      "firstName": event.target[0].value,
      "lastName": event.target[1].value,
      "grade": event.target[2].value,
      "email": event.target[3].value,
      "status": event.target[4].value,
      "reviewTeam": event.target[5].value,
      "photo": photoToUpload
      })
      .then(res => {
        console.log("successfully added member!")
        this.getRequest()
        this.renderMembers()
        document.getElementById("addForm").reset()
      })
      .catch(err => {
        console.error(err)
      })
  }

  onDeleteClick(event){
    if (event.target[0].value == ""){
      alert("Please make sure all required fields are filled")
      this.getRequest()
      this.renderMembers()
      document.getElementById("deleteForm").reset()
    }

    event.preventDefault()
    console.log(event)
    axios.delete("http://localhost:3000/member/" + event.target[0].value)
    .then(res => {
      console.log("successfully deleted person!")
      console.log(this.state.firstNames)
      this.clearState()
      this.getRequest()
      this.renderMembers()
      document.getElementById("deleteForm").reset()
    })
    .catch(err => {
      console.error(err)
    })
  }

  onChangeClick(event){
    if (event.target[0].value == ""){
      alert("Please make sure all required fields are filled")
      this.getRequest()
      this.renderMembers()
      document.getElementById("deleteForm").reset()
    }
    event.preventDefault()
    axios.put()

  }

  renderMembers() {
    const contentToReturn = [];
    const photosToReturn = [];
    console.log()

    for(let i = 0; i < this.state.firstNames.length; i++){
      let memberInfo = [];
      memberInfo.push(
        <div className="name-container">
          <div className="names">
            {this.state.firstNames[i]}
          </div>
          <div className="names">
            &nbsp;{this.state.lastNames[i]}
          </div>
        </div>
      )
      if(this.state.grades[i] !== 0){
        memberInfo.push(
          <div>
            Grade: {this.state.grades[i]}
          </div>
        )
      }
      memberInfo.push(
        <div>
          Email: {this.state.emails[i]}
        </div>
      )
      if(this.state.statuses[i] !== "empty"){
        memberInfo.push(
          <div>
            Status: {this.state.statuses[i]}
          </div>
        )  
      }
      if(this.state.reviewTeams[i] !== 0){
        memberInfo.push(
          <div>
            Review team: {this.state.reviewTeams[i]}
          </div>
        )
      }
      memberInfo.push(
        <div>
          <img src={this.state.photos[i]}/>
        </div>
      )
      
      let memberToReturn = <div className="member">
        {memberInfo}
      </div>

      contentToReturn.push(memberToReturn)

    }
    return(
      <div className="member">
        {contentToReturn}
      </div>

    )

  } 

  render() {
    return(
      <div>
        <head>
          <meta charset='UTF-8'/>
          <title>DATAS Website</title>
          <link rel='stylesheet' href='/src/index.css'/>
          <link rel="icon" href="images/datas-logo.png"/>
        </head>
        <body>
          <div className='menu-container'>
            <div className='menu'>      
              <div className="home">
                <Link className="link-formatting" to="/">
                  <img className="home-image" src={image1}/>
                </Link>
              </div>
              <HomeRightEnd/> 
            </div>
          </div>
          <div className="member-container">
            <div className="form-container">
              <div className="first-row">
                <div className="add-container">
                  <label htmlFor="delete an item">Add a person:</label>
                  <form id="addForm" method="post" onSubmit={this.onAddClick}>
                    <div className="member-form">
                      <FirstNameInput placeholder="Add first name" redAsterisk="*"/>
                      <LastNameInput placeholder="Add last name" redAsterisk="*"/>
                      <GradeInput placeholder="Add grade"/>
                      <EmailInput placeholder="Add email" redAsterisk="*"/>
                      <StatusInput placeholder="Add status"/>
                      <ReviewTeamInput placeholder="Add review team"/>
                      <PhotoInput placeholder="Add profile photo"/>
                      <button className="submit-button" type="submit">Add member</button>
                    </div>
                  </form>
                </div>
                <div className="delete-container">
                  <label htmlFor="delete an item">Delete a person: &nbsp;</label>
                  <form method="post" id="deleteForm" onSubmit={this.onDeleteClick}>
                    <div className="member-form">
                      <div className="input-container">
                        <input
                          className="inputs"
                          key={"email"}
                          type="text"
                          placeholder={"Add email"}
                        />
                        <div className="red-asterisk">
                          *
                        </div>
                      </div>
                      <button className="submit-button" type="submit">Delete</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="second-row">
                <label htmlFor="delete an item">Change a person: &nbsp;</label>
                <form method="post" id="changeForm" onSubmit={this.onChangeClick}>
                  <div className="member-form">
                    <EmailInput placeholder="Add email of person to change" redAsterisk="*"/>
                    <FirstNameInput placeholder="Enter new first name" redAsterisk="*"/>
                    <LastNameInput placeholder="Enter new last name" redAsterisk="*"/>
                    <GradeInput placeholder="Enter new grade"/>
                    <EmailInput placeholder="Enter new email" redAsterisk="*"/>
                    <StatusInput placeholder="Enter new status"/>
                    <ReviewTeamInput placeholder="Enter new review team"/>
                    <PhotoInput placeholder="Upload new profile photo"/>
                    <button className="submit-button" type="submit"> &nbsp;Delete&nbsp; </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="members-container">
              <div className="bold-title">
                Meet the team!
              </div>
              <div>
                {this.renderMembers()}
              </div>
            </div> 
        </div>
      </body>
    </div>


)}}

export default MemberDisplay;
