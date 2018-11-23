import React,{Component} from 'react';
import Link from 'next/link';
import Clock from '../components/intervalTimer';
import DebugButton from '../components/debugButton';
import axios from 'axios';


class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
     path:'', 
     validPath:false,
     toggleStopStart:false,
     files:[],
    }
    this.handlePathChange = this.handlePathChange.bind(this);
    this.debugHandler = this.debugHandler.bind(this);
  }
  validPath(value){
    this.setState({validPath:true})
  }
  debugHandler() {
    console.log(this.state);
  }
  handleListItem(event,file) {
    console.log('file clicked is=', file);
  }
  handlePathChange(event) {
  
    console.log(event.target.value);
    this.validPath(event.target.value);
    this.setState({path:event.target.value,toggleStopStart:!this.state.toggleStopStart});

  }
  callPost() {
    axios.post('/dir', {
      data: this.state.path
    })
      .then(response => {
        console.log('resp=',response.data);
        this.setState({ files: response.data })
      })
      .catch(error => {
        console.log(error);
      });
  }

  getElapsedTime(time) {
    //console.log(time,typeof time);
    if(time === 1) {
      console.log('yes one');
      this.callPost();
    } 
  }
  render() {
    return (
      <div>
        <body>
          <div id="page-wrapper" className="clearfix">
            <h1>HTML5 Text Editor</h1>
            <p>Powered by the FileSystem APIs.</p>

            <form action="#" method="POST" id="file-form">
              <div className="field">
                <input onChange={this.handlePathChange} type="text" name="filename" id="filename" placeholder="Filename (e.g. treehouse.txt)" />
              </div>
              <div className="field">
                <textarea name="content" id="content" placeholder="Type your content here..."></textarea>
              </div>
              <div className="field">
                <button type="submit">Save File</button>
                <div id="messages"></div>
              </div>
            </form>

            <div id="files">
              <h2>File Browser</h2>
              <ul id="file-list">
              {this.state.files.map(file => <li onClick={e => this.handleListItem(e,file)} key={file}>{file}</li>)}
              </ul>

            </div>
          </div>
            <div><Clock toggleStopStart={this.state.toggleStopStart} elapsedTime={(t) => this.getElapsedTime(t)}/></div>
            <div><DebugButton handler={this.debugHandler} name={"debug"} /></div>
        </body>
        <style jsx>{`
        *, *:before, *:after {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        
        html {
          font-family: Helvetica, Arial, sans-serif;
          font-size: 100%;
          background: #333;
          color: #33383D;
          -webkit-font-smoothing: antialiased;
        }
        
        #page-wrapper {
          width: 960px;
          background: #FFF;
          padding: 1.25rem;
          margin: 1rem auto;
          min-height: 300px;
          border-top: 5px solid #69c773;
          box-shadow: 0 2px 10px rgba(0,0,0,0.8);
        }
        
        h1 {
          margin: 0;
        }
        
        h2 {
          margin-top: 0;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
        }
        
        p {
          font-size: 0.9rem;
          margin: 0.5rem 0 1.5rem 0;
        }
        
        a,
        a:visited {
          color: #08C;
          text-decoration: none;
        }
        
        a:hover,
        a:focus {
          color: #69c773;
          cursor: pointer;
        }
        
        a.delete-file,
        a.delete-file:visited {
          color: #CC0000;
          margin-left: 0.5rem;
        }
        
        #file-form {
          width: 650px;
          float: left;
        }
        
        .field {
          margin-bottom: 1rem;
        }
        
        input,
        textarea {
          width: 100%;
          padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #D9D9D9;
          border-radius: 3px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
        }
        
        textarea {
          min-height: 300px;
        }
        
        button {
          display: inline-block;
          border-radius: 3px;
          border: none;
          font-size: 0.9rem;
          padding: 0.6rem 1em;
          background: #86b32d;
          border-bottom: 1px solid #5d7d1f;
          color: white;
          margin: 0 0.25rem;
          text-align: center;
        }
        
        button:hover {
          opacity: 0.75;
          cursor: pointer;
        }
        
        #files {
          width: 230px;
          float: right;
        }
        
        #files ul {
          margin: 0;
          padding: 0.5rem 1rem;
          height: 330px;
          overflow-y: auto;
          list-style: none;
          background: #F7F7F7;
          border: 1px solid #D9D9D9;
          border-radius: 3px;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);
        }
        
        #files li {
          padding: 0.5rem 0;
        }
        
        #messages {
          display: inline-block;
          font-weight: bold;
          color: #69c773;
          margin-left: 1rem;
        }
        
        /* Clearfix Utils */
        
        .clearfix {
          *zoom: 1;
        }
        
        .clearfix:before,
        .clearfix:after {
          display: table;
          line-height: 0;
          content: "";
        }
        
        .clearfix:after {
          clear: both;
        }
        
        `}</style>
      </div>
    )
  }
  }
  export default FileBrowser;