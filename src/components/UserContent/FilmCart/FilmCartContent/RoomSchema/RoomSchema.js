import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as OrderActions from "../../../../../actions/order-form";
import * as UserActions from "../../../../../actions/user";

import OrderModal from "../../../OrderModal/OrderModal";

import "./RoomSchema.css";

class RoomSchema extends React.Component {

    openOrderModal = (event) => {
        this.props.orderActions.onOrderFormOpen({});
    }

    isSelected = (x, y) => {
        const { pendingPlaces, selectedPlaces } = this.props.currentSeance;

        for (let i = 0; i < pendingPlaces.length; i++)
            if (pendingPlaces[i].x === x && pendingPlaces[i].y === y)
                return true;

        for (let i = 0; i < selectedPlaces.length; i++)
            if (selectedPlaces[i].x === x && selectedPlaces[i].y === y)
                return true;

    }

    render() {
        const schema = this.props.currentSeance.cinema.roomSchema;
    
        return (
            <div className="room-schema">

                <OrderModal 
                    userActions={this.props.userActions}
                    close={this.props.orderActions.onOrderFormClose}
                    isOpen={this.props.order.isOpened} 
                    isAuth={this.props.user.isAuth} />

                <div className="room-schema__screen">Screen</div>
                {
                    schema.map((row, rowIndex) => (
                        <div key={rowIndex} className="room-schema__row">
                            <div className="row-index">{rowIndex}</div>
                            {
                                row.map((item, columnIndex) => {
                                    if (item === 2 && row[columnIndex - 1] === 2) 
                                        return null;
    
                                    if (item === 3 && (row[columnIndex - 1] === 3 || row[columnIndex - 2] === 3)) 
                                        return null;
    
                                    // save additionally class name
                                    // [ none, love-seats, vip ]
                                    let additionally = "";
    
                                    if (item === 0) additionally = "none";
                                    if (item === 1) additionally = "";
                                    if (item === 2) additionally = "love-seats"
                                    if (item === 3) additionally = "vip"

                                    if (item === 1 && this.isSelected(rowIndex, columnIndex)) 
                                        additionally += "selected";
                                    if (item === 2 && this.isSelected(rowIndex, columnIndex)) 
                                        additionally += "selected-love-seats";
                                    if (item === 3 && this.isSelected(rowIndex, columnIndex)) 
                                        additionally += "selected-vip";
    
                                    return (
                                        <div key={columnIndex} onClick={this.openOrderModal} className={"room-schema__row-item " + additionally}></div>
                                    );
                                })
                            }
                            <div className="row-index">{rowIndex}</div>
                        </div>
                    ))
                }
            </div>
        );
    };

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        orderActions: bindActionCreators(OrderActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSchema);