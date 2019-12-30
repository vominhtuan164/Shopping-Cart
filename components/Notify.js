import React from 'react';
import {connect} from "react-redux";

function Notify(props) {
    return (
        <div className="alert alert-success" role="alert" id="mnotification">
            <b>{props.notify}</b>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        notify: state.notify
    };
};

export default connect(mapStateToProps, null)(Notify);
