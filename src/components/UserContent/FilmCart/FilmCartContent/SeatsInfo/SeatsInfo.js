import React from "react";
import "./SeatsInfo.css";

const SeatsInfo = ({ userIsAuth, types }) => {
    return (
        <div className="seance-content__info">
            <div className="seance-content__info-title">Types of seats</div>
            <div className="seance-content__info-list">
                {
                    types.map((type, index) => {
                        const className = type.matrixNumber === 1 
                            ? "room-schema__row-item"
                            :  type.matrixNumber === 2 
                                ? "room-schema__row-item love-seats"
                                : type.matrixNumber === 3
                                    ? "room-schema__row-item vip" 
                                    : "";

                        return (
                            <div key={index} className="info-list__item">
                                <div className="item-logo">
                                    <div className={className}></div>
                                </div>
                                <div className="item-name">{type.name}</div>
                                <div className="item-price"><strong>{type.price}$</strong></div>
                            </div>
                        );
                    })
                }
            </div>

            {
                !userIsAuth 
                ? <div className="seance-content__info-not-auth-warn">You need to authenticate for buy tickets!</div>
                : null
            }
        </div>
    );
};

export default SeatsInfo;