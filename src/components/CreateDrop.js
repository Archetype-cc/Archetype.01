import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone'
const Icon = styled.svg`
  width: 21px;
  height: 21px;
  padding-right: 10px;


  &:hover {
    cursor: pointer;
  }
`

class FullScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      files: []
    }
  }

  onDrop = (files) => {
    this.setState({
      files
    });
  }

  render() {
    return (
      <section >
        <div className="dropzone">
        <Icon viewBox="0 0 21 21" version="1.1" >
            <g id="Page-1" stroke="none" strokeWidth="1" >
                <g id="Page-1-Copy" fill='grey'>
                    <path d="M10.5,20.2570667 C5.12003333,20.2570667 0.7427,15.8797333 0.7427,10.5 C0.7427,5.1198 5.12003333,0.7427 10.5,0.7427 C15.8799667,0.7427 20.2570667,5.1198 20.2570667,10.5 C20.2570667,15.8797333 15.8799667,20.2570667 10.5,20.2570667 M10.5,0 C4.7103,0 0,4.7103 0,10.5 C0,16.2897 4.71006667,21 10.5,21 C16.2897,21 21,16.2892333 21,10.5 C21,4.7103 16.2897,0 10.5,0" id="Fill-1"></path>
                    <path d="M14.6403524,10.1404654 L10.8595346,10.1404654 L10.8595346,6.35942167 C10.8595346,6.16084741 10.6984613,6 10.499887,6 C10.3013128,6 10.1404654,6.16084741 10.1404654,6.35942167 L10.1404654,10.1404654 L6.35942167,10.1404654 C6.16084741,10.1404654 6,10.3013128 6,10.499887 C6,10.6984613 6.16084741,10.8595346 6.35942167,10.8595346 L10.1404654,10.8595346 L10.1404654,14.6403524 C10.1404654,14.8389267 10.3013128,15 10.499887,15 C10.6984613,15 10.8595346,14.8389267 10.8595346,14.6403524 L10.8595346,10.8595346 L14.6403524,10.8595346 C14.8389267,10.8595346 15,10.6984613 15,10.499887 C15,10.3013128 14.8389267,10.1404654 14.6403524,10.1404654" id="Fill-3"></path>
                </g>
            </g>
        </Icon>
          <Dropzone className='dropbtn' multiple={true} onDrop={this.props.fileImport} >
            Import files from a folder.
          </Dropzone>
        </div>
      </section>
    );
  }
}



export default FullScreen;
