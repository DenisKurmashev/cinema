import React, { PureComponent, Fragment } from "react";
import { bindActionCreators }             from "redux";
import { connect }                        from "react-redux";

import * as CinemaActions from "../../../actions/cinema";

import "./RoomSchema.css";

class RoomSchema extends PureComponent {

    render() {
        const { schema } = this.props;

        return (
            <div className="add-room-schema">
            <div className="room-schema__screen">Screen</div>
                {
                    schema.placeSchema.map((row, rowIndex) => (
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
    
                                    return (
                                        <div key={columnIndex} data-column={columnIndex} data-row={rowIndex} className={"room-schema__row-item " + additionally}></div>
                                    );
                                })
                            }
                            <div className="row-index">{rowIndex}</div>
                        </div>
                    ))
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    const cinema = state.admin.cinema;
    return {
        schema:     cinema.currentRoomSchema,
        error:      cinema.loadSeatsError,
        seatsTypes: cinema.seatsTypes
    };
};
const mapDispatchToProps = dispatch => {
    return {
        cinemaActions: bindActionCreators(dispatch, CinemaActions),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSchema);