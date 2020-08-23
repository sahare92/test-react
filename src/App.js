import React from 'react';
import logo from './logo.svg';
import './App.css';
import Peer from 'peerjs';

const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// const peer = new Peer('caller-123123');
const peer = new Peer('callee-123123');

function getReadyForCall() {
	console.log('Getting ready for call');
	peer.on('call', function(call) {
		getUserMedia({video: { width: 1280, height: 720 }, audio: true}, function(stream) {
		  call.answer(stream);

		  call.on('stream', function(stream) {
	         var video = document.querySelector('video');
	         video.srcObject = stream;
	         video.onloadedmetadata = function(e) {
	           video.play();
	         };
		  });
		}, function(err) {
		  console.log('Failed to get local stream' ,err);
		});
	});
}

function App() {
	function startSession() {
    	console.log('Starting a call session');

		getUserMedia({video: { width: 1280, height: 720 }, audio: true}, function(stream) {
		  var call = peer.call('callee-123123', stream);
		  call.on('stream', function(stream) {
	         var video = document.querySelector('video');
	         video.srcObject = stream;
	         video.onloadedmetadata = function(e) {
	           video.play();
	         };
		  });
		}, function(err) {
		  console.log('Failed to get local stream' ,err);
		});
	}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello
        </p>
	<button onClick={startSession}>
		lalala
	</button>
	<video controls>
	</video>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
