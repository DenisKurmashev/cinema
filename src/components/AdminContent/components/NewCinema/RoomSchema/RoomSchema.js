import React, { PureComponent, Fragment } from "react";
import { bindActionCreators }             from "redux";
import { connect }                        from "react-redux";

import * as CinemaActions from "../../../actions/cinema";

import ChangeMatrix from "./ChangeMatrix/ChangeMatrix";

import "./RoomSchema.css";

class RoomSchema extends PureComponent {

    MAX_TYPE_OF_SEAT_VALUE = 3

    state = {
        rowCount:     0,
        columnCount:  0,
    }

    roomSizeChange = (event) => {
        const target = event.target;

        if (target.value < 0) 
            target.value = 0;

        this.setState({ 
            [target.name]: target.value
        });
    }

    handleAddSizeButton = (event) => {
        const { rowCount, columnCount } = this.state;

        if (rowCount === 0 || columnCount === 0)
            return; 

        let matrix = [];

        for (let i = 0; i < rowCount; i++) {
            matrix[i] = [];
            for (let j = 0; j < columnCount; j++) {
                matrix[i][j] = 1;
            }
        }

        this.props.cinemaActions.onCurrentRoomSchemaChange(matrix);
    }

    render() {
        const { schema, cinemaActions } = this.props;

        return (
            <div className="add-room-schema">
                {
                    schema.placeSchema.length > 0
                    ? <ChangeMatrix 
                        maxValue={this.MAX_TYPE_OF_SEAT_VALUE} 
                        updateMatrix={cinemaActions.onCurrentRoomSchemaUpdate} 
                        matrix={schema.placeSchema} 
                        />
                    : null
                }
                {
                    !schema.placeSchema.length
                    ? (
                        <div className="room-schema__size">
                            <h3>Select the room size</h3>
                            <input type="number" min={0} onChange={this.roomSizeChange} name="rowCount" value={this.state.rowCount} />
                            <input type="number" min={0} onChange={this.roomSizeChange} name="columnCount" value={this.state.columnCount} />
                            <input type="button" onClick={this.handleAddSizeButton} className="btn" value="add" />
                        </div>
                    )
                    : (
                        <Fragment>
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
                        </Fragment>
                    )
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
        cinemaActions: bindActionCreators(CinemaActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSchema);