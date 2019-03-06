import React, { Component } from 'react';

export default class Modal extends Component {
    render() {
        const { isOpen } = this.props;

        if (isOpen === false) {
            return null;
        } else {
            return (
                <div className='modal-window' modal-name={this.props.name}>
                    <div
                        className='modal-window__bg'
                        onClick={e => {
                            this.closeModalWindow(e);
                        }}
                    />
                    <div className='modal-window__body'>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }

    closeModalWindow(e) {
        e.preventDefault();

        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}
