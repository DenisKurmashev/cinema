import React, { PureComponent } from "react";

import "./ChangeMatrix.css";

class ChangeMatrix extends PureComponent {

    onChangeMatrixValue = (event) => {
        const target = event.target;
    }

    render() {
        const { matrix } = this.props;

        return (
            <div onChange={this.onChangeMatrixValue} className="add-room-schema__matrix">
                {
                    matrix.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex}>
                                {
                                    row.map((item, columnIndex) => (
                                        <input key={columnIndex} type="number" value={item} />
                                    ))
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

}

export default ChangeMatrix;