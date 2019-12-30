import React, { useState } from 'react';
import { connect } from "react-redux";

import * as actions from './../actions/index';
import * as configs from './../constants/Config';
import Validate from './../libs/Validate';

function ProductItem(props) {
    const [state, setState] = useState({
        value: 1,
    });

    const showAreaBuy = (product) => {
        if (product.canBuy === false) {
            return (<span className="price">{product.price} USD</span>);
        } else {
            return (
                <p>
                    <input
                        name="value"
                        type="number"
                        value={state.value}
                        onChange={handleChange}
                        min={1}
                    />
                    <button data-product={1} className="price" onClick={() => handleClick(product)}>
                        {product.price} USD
                    </button>
                </p>
            )
        }
    };

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            [name]: value
        })
    };

    const handleClick = (product) => {
        let quantity = state.value; 
        if (Validate.checkQuantity(quantity) === false ) {
            props.changeNotify(configs.NOTI_GREATER_THAN_ONE);
        } else {
            props.buyProduct(product, quantity);
            props.changeNotify(configs.NOTI_ACT_ADD);
        }
        setState({
            value: 1
        });
    };

    let { product } = props;
    return (
        <div className="media product">
            <div className="media-left">
                <button>
                    <img
                        className="media-object"
                        src={`images/${product.image}`}
                        alt="{product.name}"
                    />
                </button>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{product.name}</h4>
                <p>{product.summary}</p>
                {showAreaBuy(product)}
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        buyProduct: (product, quantity) => {
            dispatch(actions.actBuyProduct(product, quantity));
        },
        changeNotify: (value) => {
            dispatch(actions.actChangeNotify(value));
        },
    };
};

export default connect(null, mapDispatchToProps)(ProductItem);
