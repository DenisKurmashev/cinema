import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

class Header extends PureComponent {

    render() {
        const { items } = this.props;

        return (
            <div className="admin-header">
                {
                    items.map((el, index) => (
                        <div key={index} className="admin-header-item">
                            <Link className="btn-underline text-upper" to={el.path}>{el.title}</Link>
                        </div>
                    ))
                }
            </div>
        );
    }

}

export default Header;