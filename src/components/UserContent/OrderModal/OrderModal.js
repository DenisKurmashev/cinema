import React from "react";
import Modal from "react-modal";

import OrderForm from "../Forms/OrderForm/OrderForm";
import LoginForm from "../Forms/LoginForm/LoginForm";
import RegisterForm from "../Forms/RegisterForm/RegisterForm";

import "./OrderModal.css";

Modal.setAppElement("#root");

class OrderModal extends React.PureComponent {

    state = {
        // if equal true, then opened login form
        // otherwise register form
        isLoginOpened: true,
    }

    customStyle = {
        overlay: {
            background: "rgba(86,86,86, 0.75)"
        }
    }

    closeModal = () => {
        this.props.close();
    }

    changeOpenedForm = () => {
        this.setState({ isLoginOpened: !this.state.isLoginOpened });
    }

    render() {
        const { order, isAuth, isOpen, filmsActions, userActions, orderActions } = this.props;

        return (
            <Modal
                style={this.customStyle}
                className="order-modal"
                isOpen={isOpen}
                onRequestClose={this.closeModal} >
                
                {
                    isAuth 
                    ? <OrderForm filmsActions={filmsActions} order={order} orderActions={orderActions} />
                    : (
                        <div className="order-modal__login-or-register">
                            {
                                this.state.isLoginOpened 
                                ? <LoginForm userActions={userActions} />
                                : <RegisterForm userActions={userActions} />
                            }

                            <div onClick={this.changeOpenedForm} className="btn-underline">
                                {
                                    this.state.isLoginOpened 
                                    ? "Not have account? Sign up."
                                    : "Already have account? Sign in."
                                }
                            </div>
                            <input disabled={order.fetching} onClick={orderActions.onOrderFormClose} type="button" className="btn text-upper" value="close" />
                        </div>
                    )
                }

            </Modal>
        );
    }

}

export default OrderModal;