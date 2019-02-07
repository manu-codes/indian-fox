import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Textarea value="This is a test" maxLength={500}/>
      </div>
    );
  }
}

class Textarea extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
        ? this.props.maxLength && this.props.maxLength > 0
          ? this.props.value.length < this.props.maxLength
            ? this.props.value
            : this.props.value.substring(0, this.props.maxLength)
          : this.props.value
        : '',
      remaining: this.props.value
        ? this.props.value.length < this.props.maxLength
          ? this.props.maxLength - this.props.value.length
          : 0
        : this.props.maxLength
    };

    this.textAreaRef = React.createRef();
    
    this.textAreaHeight = null;
    this.textAreaoffSetHeight = null;
  }
  
  
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }
  
  handleChange = event => {
    const target = event.target || event.srcElement;

    this.setState({
      value: target.value,
      remaining: target.value
        ? target.value.length < this.props.maxLength
          ? this.props.maxLength - target.value.length
          : 0
        : this.props.maxLength
    });

    this.resize();
  };
  
  resize = () => {
    const node = this.textAreaRef.current;

    node.style.height = '';

    const style = window.getComputedStyle(node, null);

    let heightOffset =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

    this.textAreaoffSetHeight = node.offsetTop;

    this.textAreaHeight = node.scrollHeight + heightOffset;

    node.style.height = this.textAreaHeight + 'px';

    this.resizeBorder();
    this.resizeParentNode();
  };

  resizeBorder = () => {
    const textAreaSize = this.textAreaHeight;
    const node = this.textAreaRef.current;
    const borderNode = node.parentNode.querySelector(
      '.textarea__border'
    );
    
    if (borderNode !== null) {
      borderNode.style.top =
        this.textAreaoffSetHeight + textAreaSize - 1 + 'px';
    }
  };

  resizeParentNode = () => {
    const node = this.textAreaRef.current;
    const parentNode = node.parentNode;
    
    if (parentNode !== null) {
      parentNode.style.height = this.textAreaHeight + 40 + 'px';
    }
  };

	render() {
    return (
      <div className={'textarea'}>
        <textarea
          ref={this.textAreaRef}
          className={
            !this.state.value
              ? 'textarea__input'
              : 'textarea__input active'
          }
          value={this.state.value}
          maxLength={
            this.props.maxLength && this.props.maxLength > 0 ? this.props.maxLength : null
          }
          onChange={this.handleChange}
        />
        <div className={'textarea__message'}>
            {this.state.remaining <= 0
              ? `You've reached ${this.props.maxLength} characters`
              : `${this.state.remaining} characters remaining`}
          </div>
      </div>
    );
	}
}

export default App;
