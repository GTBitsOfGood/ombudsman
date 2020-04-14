import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const image = {
  width: "100%",
  height: "auto",
};

const emphasize = {
  color: "#007BFF",
  fontWeight: "bold",
}

const header = {
  paddingBottom : "10px",
  fontWeight: "bold",

}

const header2 = {
  paddingTop : "20px",
  paddingBottom : "10px",
  fontWeight: "bold",

}

const padding = {
  paddingTop : "10px",
  paddingBottom : "10px",
}

const subHeader = {
  paddingBottom : "10px",
  textDecorationLine: "underline",
}

const HelpPage = () => {
  return (
    <>
      <Row>
        <Col md={{ span: 5, offset: 3 }}>
          <h2 style={header}>
            How do I use the Ombudsman Toolbox?
          </h2>
          <p>
           <span style= {emphasize}> Welcome to your new online Ombudsman toolbox. </span>Home to all things Ombudsman. Below you will find a desciption of the key features on the site and some tips you will need to get started. Good luck searching, keep fighting the good fight!
          </p>
          <h2 style= {subHeader}>
            Search
          </h2>
          <img style = {image} src="/help/search.png"></img>
          {/* <img src="/help/search2.png"></img>
          <img src="/help/categories.png"></img> */}
          <p style = {padding}>
          <span style= {emphasize}> Search is the  most important feature of your toolbox! </span> Type a word into the search bar pictured above to try it out. Hit search and watch as all the articles associated with your keyword pop up for your interactive viewing. Looking for a document in a specific category? You're in luck. <span style= {emphasize}>You can search for a document in a specific category by select it in the category drop down menu!</span>
          </p>
          <h2 style= {subHeader}>
            Frequently Viewed Documents
          </h2>
          <img style = {image} src="/help/fvd.png"></img>
          <p style = {padding}>
          <span style= {emphasize}> Frequently viewed documents is your window into the most used documents by all of Ombudsman. </span> We keep track of which files are used most, so that you don't have to! This section shows the top six documents and lets you access them right from the home page. Click view to give it a shot!
          </p>
          <h2 style= {subHeader}>
            Find By Category
          </h2>
          <img style = {image} src="/help/fbc.png"></img>
          <p style = {padding}>
          <span style= {emphasize}> Find by category is an extension of your toolbox's search abilities. </span> Select the category you want to see a list of documents in that sectin. Click on a file to go directly to its individual page! 
          </p>
          <h2 style={header2}>
            Admin Privledges
          </h2>

          <h2 style= {subHeader}>
            Add, Edit, or Remove Documents
          </h2>
          <img style = {image} src="/help/addButton.png"></img>
          <p style = {padding}>
          <span style= {emphasize}> Start by pressing the add button. </span> This can be found at the footer of every page and starts the process of expanding your ombudsman toolbox!
          </p>
          <img style = {image} src="/help/login.png"></img>
          <p style = {padding}>
          <span style= {emphasize}> Enter your admin user name and password here. </span> Adding and removing documents is an important feature of your ombudsman toolbox. This page is here to make sure that only some people have access to these abilities.
          </p>
          <h2 style= {subHeader}>
            Add Documents
          </h2>
          <img style = {image} src="/help/addDocuments.png"></img>
          <p style = {padding}>
          <span style= {emphasize}> Time to add to your toolbox! </span> This form allows you to expand your toolbox right from the site! Click browse to upload the document you want and fill out the boxes with all relevant information. The site generates the top 20 key words on its own, but feel free to add more in the "Keywords" box if you have some that you think will work well.  
          </p>
          <h2 style= {subHeader}>
            Edit Documents
          </h2>
          <img style = {image} src="/help/manageDocuments.png"></img>
          <span style= {emphasize}> Manage documents is the hub for all things edit and delete </span> Click on the header button to navigate to the manage page. 
          <h2 style= {{color: "red"}}>
            ADD UPDATED EDIT BUTTON IMAGE
          </h2>
          <span style= {emphasize}> Click on the edit button to change a document's information </span> Give it a shot! 
          <h2 style= {{color: "red"}}>
            ADD UPDATED EDIT PAGE IMAGE
          </h2>
          <span style= {emphasize}> Insert text here </span> 
          <h2 style= {subHeader}>
            Remove Documents
          </h2>
          <span style= {emphasize}> Insert text here </span> 

        </Col>
      </Row>
    </>
  );
};

export default HelpPage;
