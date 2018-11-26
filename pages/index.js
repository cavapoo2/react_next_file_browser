import React, { Component } from 'react';
import Clock from '../components/intervalTimer';
import DebugButton from '../components/debugButton';
import ListItems from '../components/itemList'
import axios from 'axios';
import pathUtil from 'path';

class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      validPath: false,
      toggleStopStart: false,
      files: [],
      content: '',
    }
    this.handlePathChange = this.handlePathChange.bind(this);
    this.debugHandler = this.debugHandler.bind(this);
    this.handleListItem = this.handleListItem.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validPath(value) {
    this.setState({ validPath: true })
  }
  debugHandler() {
    console.log(this.state);
  }
  handleListItem(event, file) {
    this.callPostClick('/clickBrowser', { path: this.state.path, file: file }
    )
  }
  handleSubmit(event){
    event.preventDefault();
  }

  handleButtonClick(event) {
    event.preventDefault();
  }
  handlePathChange(event) {
    console.log('path=', event.target.value);
    this.validPath(event.target.value);
    this.setState({ content: '', path: event.target.value, toggleStopStart: true });

  }
  callPost(path, data) {
    axios.post(path, {
      data: data
    })
      .then(response => {
        console.log('resp=', response.data);
        this.setState({ files: response.data })
      })
      .catch(error => {
        console.log(error);
      });
  }
  callPostClick(path, data) {
    axios.post(path, {
      data: data
    })
      .then(response => {
        console.log('resp=', response.data);
        if (response.data.isDir === true) {
          this.setState({
            files: response.data.res,
            path: pathUtil.join(data.path, data.file),
            content: '',
          })
        } else {
          console.log('settign content');
          this.setState({ content: response.data.res })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getElapsedTime(time) {
    if (this.state.toggleStopStart !== false) {
      this.setState({ toggleStopStart: false });
    }
    if (time === 1) {
      this.callPost('/dir', this.state.path);
    }
  }
  render() {
    return (
      <div>
        <div id="page-wrapper" className="clearfix">
          <h1>Simple File Browser</h1>

          <form onSubmit={this.handleSubmit} id="file-form">
            <div className="field">
              <input onChange={this.handlePathChange} value={this.state.path} type="text" name="filename" id="filename" placeholder="Enter a path" />
            </div>
            <div className="field">
              <textarea readOnly={"true"} name="content" id="content" value={this.state.content} />
            </div>
            <div className="field">
              <button onClick={this.handleButtonClick}>Save File</button>
              <div id="messages"></div>
            </div>
          </form>

          <div id="files">
            <h2>File Browser</h2>
            <ul id="file-list">
              <ListItems handler={this.handleListItem} list={this.state.files} />
            </ul>

          </div>
        </div>
        <div><Clock toggleStopStart={this.state.toggleStopStart} elapsedTime={(t) => this.getElapsedTime(t)} /></div>
        <div><DebugButton handler={this.debugHandler} name={"debug"} /></div>
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
        #files ul .directory {
          color: blue;
        }
         #files ul .file {
          color: black;
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