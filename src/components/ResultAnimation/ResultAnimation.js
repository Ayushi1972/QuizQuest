import React from 'react';
import $ from 'jquery';
import './ResultAnimation.css';

class ResultModal extends React.Component {
  componentDidMount() {
    // Use jQuery to animate the modal's appearance
    $('.modal-content').hide().fadeIn(300);
  }

  handleClose = () => {
    // Use jQuery to animate the modal's disappearance
    $('.modal-content').fadeOut(300, this.props.onClose);
  };

  copyToClipboard = () => {
    const { score, totalQuestions } = this.props;
    const shareUrl = window.location.href; // Get the current page URL
    const message = `I scored ${score} out of ${totalQuestions}! Check it out here: ${shareUrl}`;
    
    navigator.clipboard.writeText(message)
      .then(() => {
        alert('Results and link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  render() {
    const { score, totalQuestions } = this.props;
    const percentage = (score / totalQuestions) * 100;
    let message = '';

    if (percentage >= 80) {
      message = 'Great Job!';
    } else if (percentage >= 50) {
      message = 'Almost There!';
    } else {
      message = 'Nice Try!';
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{message}</h2>
          <p>Your score: {score} / {totalQuestions}</p>
          <button onClick={this.handleClose}>Close</button>
          <button onClick={this.copyToClipboard}>Copy Results to Clipboard</button>
        </div>
      </div>
    );
  }
}

export default ResultModal;