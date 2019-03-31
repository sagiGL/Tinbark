import {Link} from "@reach/router";
import React from "react";

class Header extends React.Component{
    render() {
        return(
            <div>
                <Link to="/" className="logo container logo-text">
                    <p className="logo-text">
                        Tinbark
                        <img className="logo-img" src="http://i.imgur.com/1tqBeLA.png" alt="red pow"/>
                    </p>
                </Link>
            </div>
        );
    }
}
export default Header;
