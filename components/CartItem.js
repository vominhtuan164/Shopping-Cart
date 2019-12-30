import React, {useState} from 'react';
import {connect} from "react-redux";

import * as actions from './../actions/index';
import * as configs from './../constants/Config';
function CartItem(props) {
    const [state, setState] = useState({
        value: 0,
    });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            [name]: value
        })
    }

    const showPriceTotal = (product, quantity) => {
        return product.price * quantity;
    }

    const handleUpdate = (product, quantity) => {
        props.updateProduct(product, quantity);
        props.changeNotify(configs.NOTI_ACT_UPDATE);
    }

    const handleDelete = (product) => {
        props.deleteProduct(product);
        props.changeNotify(configs.NOTI_ACT_DELETE);
    }

    let {cartItem, index} = props;
    return (
        <tr>
            <th scope="row">{index+1}</th>
            <td>{cartItem.product.name}</td>
            <td>{cartItem.product.price} USD</td>
            <td>
                <input
                    name="value"
                    type="number"
                    value={cartItem.quantity}
                    onChange={handleChange}
                    min={1}
                />
            </td>
            <td>
                <strong>{showPriceTotal(cartItem.product, cartItem.quantity)} USD</strong>
            </td>
            <td>
                <button
                    className="label label-info update-cart-item"
                    data-product
                    onClick={() => {
                        handleUpdate(cartItem.product, cartItem.quantity);
                    }}
                >
                    Update
                </button>
                <button
                    className="label label-danger delete-cart-item"
                    data-product
                    onClick={ () => {
                        handleDelete(cartItem.product)
                    }}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProduct: (product, quantity) => {
            dispatch(actions.actUpdateProduct(product, quantity));
        },
        deleteProduct: (product) => {
            dispatch(actions.actRemoveProduct(product));
        },
        changeNotify: (value) => {
            dispatch(actions.actChangeNotify(value));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
