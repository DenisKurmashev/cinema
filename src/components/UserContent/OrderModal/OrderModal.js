import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

class OrderModal extends React.PureComponent {

    closeModal = () => {
        // this.props.closeModalAction();
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.closeModal}
            >
                <h2>Modal</h2>
            </Modal>
        );
    }

}

export default OrderModal;