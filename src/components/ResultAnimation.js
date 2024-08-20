import React from 'react';
import './ResultAnimation.css'; // CSS file for modal styles

// ResultModal class component to display a popup with the result animation
class ResultModal extends React.Component {
  render() {
    const { score, totalQuestions, onClose } = this.props;
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
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
}

export default ResultModal;