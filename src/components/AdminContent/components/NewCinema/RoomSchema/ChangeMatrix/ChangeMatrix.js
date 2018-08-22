import React, { PureComponent } from "react";

import "./ChangeMatrix.css";

class ChangeMatrix extends PureComponent {

    validateChangedValue = (x, y, value) => {
        const { maxValue } = this.props;

        if (value > maxValue || value < 0) 
            return false;

        return true;
    }

    onChangeMatrixValue = (x, y, event) => {
        const value = parseInt(event.target.value, 10);

        if (!this.validateChangedValue(x, y, value))
            return;

        const { matrix, updateMatrix, maxValue } = this.props;

        // Algorithm for compare values
        //
        // if value equal 2, then it loveSeats
        // add next element in line should be equal 2 too
        //
        // if value equal 3, then it VIP
        // add next two elements in line should be equals 3 too
        for (let i = 0; i <= maxValue; i++) {
            if (value === i) {  
                // if next element not exist
                // not update value
                if (i > 1 && matrix[x].length < (y + i))
                    return; 

                updateMatrix(x, y, value);

                if ((matrix[x][y + i] === (value + 1)) && (value + 1) !== 1) 
                    updateMatrix(x, y + i, 1);

                if (matrix[x].length < (y + i)) 
                    return;

                for (let j = 1; j < i; j++) 
                    updateMatrix(x, y + j, value);

            }
        }

    }

    render() {
        const { matrix } = this.props;

        return (
            <div className="add-room-schema__matrix">
                {
                    matrix.map((row, rowIndex) => {
                        return (
                            <div key={rowIndex} className="matrix-row" >
                                {
                                    row.map((item, columnIndex) => (
                                        <div key={columnIndex} className="matrix-row__item" >
                                            <input onChange={(event) => this.onChangeMatrixValue(rowIndex, columnIndex, event)} type="number" value={item} />
                                        </div>
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