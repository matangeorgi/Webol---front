import React, {useEffect, useRef, useState} from "react";

import {PaypalDiv} from "./payment.styled";
import {ModalBody, OverlayDiv} from "../../pages/profile/changeImage/ChangeImage.styled";
import useClickOutside from "../../../hooks/useClickOutside";
import {P} from "../commonStyles/General.styled";

const Payment = props => {
    const paypal = useRef();

    const modalRef = useClickOutside(() => {
        props.setVisible(false);
    })

    useEffect(() => {
        props.setVisible(props.visible);
    }, [props.visible])

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                value: 20
                            }
                        }
                    ]
                })
            }
        }).render(paypal.current)
    }, [])

    return (
            <div className={props.visible? null : 'd-none'}>
                <OverlayDiv>
                </OverlayDiv>

                <ModalBody color='white' className="mx-auto" ref={modalRef}>
                    <div className="d-flex justify-content-center">
                        <P><b>Follow {props.username}</b></P>
                    </div>
                    <div className="d-flex justify-content-center">
                        <P>Payment amount: {props.price}$</P>
                    </div>
                    <hr/>
                   <div>
                       <PaypalDiv ref={paypal}></PaypalDiv>
                   </div>
                </ModalBody>
            </div>
    )
}

export default Payment;