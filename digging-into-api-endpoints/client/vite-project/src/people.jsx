import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './index.css'
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import image1 from "./images/datas-circle.png";
import image2 from "./images/datas-logo.png";

// component code for the right end of the navigation bar
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

// component code for any first name input
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

// component code for any last name input, props govern whether the input will be required (red asterisk)
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

// component code for any grade input, props govern whether the input will be required (red asterisk)
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

// component code for any email input, props govern whether the input will be required (red asterisk)
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

// component code for any status input, props govern whether the input will be required (red asterisk)
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

// component code for any review team input, props govern whether the input will be required (red asterisk)
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

// component code for any photo input, props govern whether the input will be required (red asterisk)
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

// creates the react object for the people page
class MemberDisplay extends React.Component {
  constructor(props){
    super(props)
    // houses all the members with each of their properties in an array
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
    this.onFilterClick = this.onFilterClick.bind(this);
  }
  
  // function that clears all parts of the state
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

  // function that performs a get request from the backend and updates the state
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
  
  // function that clears the forms when the page loads and performs a get request
  componentDidMount(){
    document.getElementById("addForm").reset()
    this.getRequest()
    console.log("component did mount")
  }

  // function that runs when a user presses the add member button
  onAddClick(event) {
    event.preventDefault()
    console.log(event)
    this.clearState()

    // adds the user-uploaded photo to to the state as a string object
    let photoToUpload = undefined
    try {
      console.log(event.target[6].files[0])
      if (event.target[6].files[0] !== undefined){
        photoToUpload = URL.createObjectURL(event.target[6].files[0])
        console.log(photoToUpload) 
        console.log(this.state.photos)
      } 
    } catch (err){
      console.error(err)        
    }

    // checks if the required fields were filled when the form was submitted and otherwise sends an alert
    if (event.target[0].value == "" || event.target[1].value == "" || event.target[3].value == "" ){
      alert("Please make sure all required fields are filled")
      this.getRequest()
      this.renderMembers()
      document.getElementById("addForm").reset()
    }

    // adds the member to the backend based on the form input
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

  // deletes the member to the backend based on the email input
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

  // code to create a form to change a member (incomplete)
  // onChangeClick(event){
  //   if (event.target[0].value == ""){
  //     alert("Please make sure all required fields are filled")
  //     this.getRequest()
  //     this.renderMembers()
  //     document.getElementById("deleteForm").reset()
  //   }
  //   event.preventDefault()
  //   axios.put()

  // }

  // code to create a form to filter the members alphabetically by first name on the front end (incomplete)
  // onFilterClick(event){
  //   event.preventDefault()
  //   console.log(event)

  //   let updatedFirstNames = this.state.firstNames.slice()
  //   let sortedFirstNames = updatedFirstNames.slice().sort()

  //   let indexArray = []
  //   for(const name of updatedFirstNames){
  //     indexArray.push(sortedFirstNames.indexOf(name))
  //   }

  //   let updatedLastNames = this.state.lastNames.slice()
  //   let sortedLastNames = []
  //   for(const index of indexArray){
  //     sortedLastNames.push(updatedLastNames[index])
  //   }
    
  //   let updatedGrades = this.state.grades.slice()
  //   let sortedGrades = []
  //   for(const index of indexArray){
  //     sortedGrades.push(updatedGrades[index])
  //   }
    
  //   let updatedEmails = this.state.emails.slice()
  //   let sortedEmails = []
  //   for(const index of indexArray){
  //     sortedEmails.push(updatedEmails[index])
  //   }

  //   let updatedStatuses = this.state.statuses.slice()
  //   let sortedStatuses = []
  //   for(const index of indexArray){
  //     sortedStatuses.push(updatedStatuses[index])
  //   }

  //   let updatedReviewTeams = this.state.reviewTeams.slice()
  //   let sortedReviewTeams = []
  //   for(const index of indexArray){
  //     sortedReviewTeams.push(updatedReviewTeams[index])
  //   }

  //   let updatedPhotos = this.state.photos.slice()
  //   let sortedPhotos = []
  //   for(const index of indexArray){
  //     sortedPhotos.push(updatedPhotos[index])
  //   }
  
  //   this.setState({
  //     firstNames: sortedFirstNames,
  //     lastNames: sortedLastNames,
  //     grades: sortedGrades,
  //     emails: sortedEmails,
  //     statuses: sortedStatuses,
  //     reviewTeams: sortedReviewTeams,
  //     photos: sortedPhotos
  //   })
  // }

  // function to render the members on the page from state
  renderMembers() {
    // houses all the content to return
    const contentToReturn = [];
    // houses all the images to return
    const photosToReturn = [];

    for(let i = 0; i < this.state.firstNames.length; i++){
      // houses the image string to return for one member
      let imgToReturn = [];
      // houses all the member info for one member
      let memberInfo = [];
      // adds the image from state to the image to return array
      imgToReturn.push(
        <div>
          <img width="120px" src={this.state.photos[i]}/>
        </div>
      )
      //  adds the first and last name of the member to the content to return (with CSS formatting)
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
      // the member grade is not required so this conditional checks if the value of the form input for grade was 0 (corresponding to no selection). if the value does not equal 0, then the grade will be added to the member info
      if(this.state.grades[i] !== 0){
        memberInfo.push(
          <div>
            Grade: {this.state.grades[i]}
          </div>
        )
      }
      // adds the member email to the content to return for the member
      memberInfo.push(
        <div>
          Email: {this.state.emails[i]}
        </div>
      )
      // same idea as the grade input (the status is not a required field)
      if(this.state.statuses[i] !== "empty"){
        memberInfo.push(
          <div>
            Status: {this.state.statuses[i]}
          </div>
        )  
      }
      // same idea as the grade and status input
      if(this.state.reviewTeams[i] !== 0){
        memberInfo.push(
          <div>
            Review team: {this.state.reviewTeams[i]}
          </div>
        )
      }
      // formats the member to return for each value of i (with CSS formatting)
      let memberToReturn = <div className="member-content">
        <div>
          {imgToReturn}
        </div>
        <div className="member-text">
          {memberInfo}
        </div>
      </div>
      // adds the member to the content to return for the whole members display
      contentToReturn.push(memberToReturn)
    }
    // returns all the members to display
    return(
      <div className="member">
        {contentToReturn}
      </div>
    )
  } 

  // renders the page
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
                {/* the form to add a member (components are at the top of the file) */}
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
                {/* the delete form */}
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
              {/* <div className="second-row">
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
              </div> */}
            </div>
            <div className="members-container">
              <div className="bold-title">
                Meet the team!
              </div>
              {/* form to sort the members alphabetically by first name (incomplete) */}
              {/* <form id="sortForm" method="post" onSubmit={this.onFilterClick}>
                Sort by:&nbsp;
                <select id="filterForm" key={"filter"} type="text">
                  <option className="inputs" value={"Alphabetical, first name"}>Alphabetical, first name</option>
                  <option className="inputs" value={"Alphabetical, last name"}>Alphabetical, last name</option>
                  <option className="inputs" value={"Grade"}>Grade</option>
                  <option className="inputs" value={"Review team"}>Review team</option>
                </select>
                <button className="sort-button" type="submit">Go!</button>
              </form> */}
              {/* executes the renderMembers function */}
              <div>
                {this.renderMembers()}
              </div>
            </div> 
          </div>
        </body>
      </div>


)}}

export default MemberDisplay;
