import React from 'react';
import { connect } from 'react-redux';

import CartItem from './CartItem';
import Notify from './Notify';

function Cart(props) {

    const showElementBody = (items) => {
        let xhtml = null;
        if (items.length > 0) {
            xhtml = items.map((cartItem, index) => {
                return (
                    <CartItem key={index} cartItem={cartItem} index={index} />
                );
            });
        }
        return (
            <tbody id="my-cart-body">
                {xhtml}
            </tbody>
        );
    }

    const showElementFooter = (items) => {
        let xhtml = <tr><th colSpan={6}>Empty product in your cart</th></tr>
        if (items.length > 0) {
            xhtml = <tr>
                <td colSpan={4}>
                    There are <b>{showTotalQuantity(items)}</b> items in your shopping cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                    {showTotalPrice(items)} USD
                </td>
            </tr>
        }
        return (
            <tfoot id="my-cart-footer">
                {xhtml}
            </tfoot>
        );
    }

    const showTotalQuantity = (items) => {
        let totalQuantity = 0;
        items.map((cartItem, index) => {
            totalQuantity += cartItem.quantity;
            return cartItem;
        });
        return totalQuantity;
    }

    const showTotalPrice = (items) => {
        let totalPrice = 0;
        items.map((cartItem, index) => {
            let price = parseInt(cartItem.product.price) * parseInt(cartItem.quantity);
            totalPrice += price;
            return cartItem;
        });
        return totalPrice;
    }

    let { items } = props;
    return (

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-danger">
                <div className="panel-heading">
                    <h1 className="panel-title">Your Cart</h1>
                </div>
                <div className="panel-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th width="4%">#</th>
                                <th>Pokemon</th>
                                <th width="15%">Price</th>
                                <th width="4%">Quantity</th>
                                <th width="20%">Subtotal</th>
                                <th width="25%">Action</th>
                            </tr>
                        </thead>
                        {showElementBody(items)}
                        {showElementFooter(items)}
                    </table>
                </div>
            </div>
            <Notify />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state.carts,
    }
};

export default connect(mapStateToProps, null)(Cart);
