import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js'
import ChooseForm from './components/ChooseForm/ChooseForm.js'
import CelebDetect from './components/CelebDetect/CelebDetect.js'
import Rank from './components/Rank/Rank.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Logo from './components/Logo/Logo.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Particles from 'react-particles-js';
import './App.css';
 
//Settings for particle background javascript
const particleOp = 
  {
    particles :{
      number: {
        value:110,
        density:{
          enable:true,
          value_area:850, 
        }
      },
      
    }
}

//Setting the Initial State
const initialState = {
      input:'',
      call:'',
      imgUrl:'',
      box: {},
      celebrity:'',
      route: 'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined: ''
      }
}
class App extends Component {

  //Default Constructore
  constructor(){
    super();
    this.state = initialState
  };

  componentDidMount(){
    document.title = "Smart Brain App"
  }
  // Setting the state of user using the app
  loadUser = (data) => {
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined: data.joined
    }});
  }

  //Calculation Location of Face on picture
  calculateFaceLocation = (data1) => {
    console.log(data1)
    const clarifaiFace = data1.outputs[0].data.regions[0].region_info.bounding_box 
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  //Setting state of box
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onSubmit = () => {
    this.setState({imgUrl: this.state.input})
    fetch('https://ziyaad-smartbrain-api.herokuapp.com/imageurl', {
      method:'post',
        headers: {'Content-Type':'application/json; charset=utf-8'},
        body: JSON.stringify({
            input:this.state.input,
            call:this.state.call
        })
    })
    .then(response => response.json())
    .then(response => {
      if(response){ //Updating image count
        fetch('https://ziyaad-smartbrain-api.herokuapp.com/image', {
          method:'put',
            headers: {'Content-Type':'application/json; charset=utf-8'},
            body: JSON.stringify({
                id:this.state.user.id,
            })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
        .catch(console.log)
      }

      if(this.state.call === 'Face'){
        this.displayFaceBox(this.calculateFaceLocation(response))
      }
      else{
        console.log(this.state.celebrity)
      }
        
    })
    //catching error
    .catch(err => console.log(err));
    
  }

  // Changing Route call
  onRouteChange = (route) => {

    this.setState({route:route});

    if(route === 'signout'){
      this.setState(initialState)
      this.setState({route:'signin'})
    }
     else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
  }

  // Choosing which api to use
  onChoose = (call) => {
    this.setState({call:call})
  }

  render(){
    const {imgUrl, isSignedIn,route,box,user,call,celebrity} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOp} />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onChoose={this.onChoose}/>
          {route === 'home' 
              ? ( call === ''

                  ? <div className="ChooseAPI">
                      <ChooseForm 
                        onRouteChange={this.onRouteChange}
                        onChoose={this.onChoose}
                      />
                    </div>

                    :( call === 'Face'

                        ?<div className="FaceDetect"> 
                          <Rank name={user.name} entries={user.entries}/>
                          <Logo />
                          <h1>Face Detection App</h1>
                          <p className='f6'>
                              {'This Magic Brain will let you upload any image and it will draw a box around the Face'}
                            </p>
                          <ImageLinkForm 
                            onInputChange={this.onInputChange} 
                            onSubmit= {this.onSubmit}
                          />
                          <FaceRecognition box={box} imgUrl = {imgUrl}/>
                        </div>

                        :<div className="CelebDetect">
                        <Rank name={user.name} entries={user.entries}/>
                        <Logo />
                          <h1>Celebrity Look Alike App (COMING SOON)</h1>
                          {/* <p className='f6'>
                              {'This Magic Brain will let you upload any image and it will detect which celebrity it mostly resembles'}
                            </p>
                            <ImageLinkForm 
                              onInputChange={this.onInputChange} 
                              onSubmit= {this.onSubmit}
                            />
                            <CelebDetect celebrity={celebrity}/> */}
                        </div>
                      )
              )
              :(
                route === 'signin' 
                    ?<SignIn 
                      onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
                      />
                    :<Register 
                      onRouteChange={this.onRouteChange}
                      loadUser={this.loadUser}
                      />
              )
          }
      </div>
    );
  }
}

export default App