import React from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import styled from 'styled-components';
import { Add, Remove, StayPrimaryLandscapeOutlined } from '@material-ui/icons';
import { mobile } from "../../src/responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState } from 'react';
import { useEffect } from 'react';
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router-dom"

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
`

const Wrapper = styled.div`
padding:20px;
${mobile({ padding: "10px" })}
`

const Title = styled.h1`
font-weight:300;
text-align:center;
`

const Top = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
padding:20px;
`

const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border:${(props) => props.type === "filled" && "none"};
background-color:${(props) => props.type === "filled" ? "black" : "transparent"};
color:${(props) => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
${mobile({ display: "none" })}
`
const TopText = styled.span`
text-decoration:underline;
cursor:pointer;
margin:0 10px;
`

const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })}
`

const Info = styled.div`
flex:3;
`

const Product = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })};
margin-bottom:20px;
`
const ProductDetail = styled.div`
flex:2;
display:flex;
`

const Image = styled.img`
 width:200px;
`

const Details = styled.div`
padding:20px;
display:flex;
flex-direction:column;
justify-content:space-around;
`

const ProductName = styled.span`

`

const ProductId = styled.span`

`

const ProductColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${props => props.color}
`

const ProductSize = styled.span`

`

const PriceDetail = styled.div`
flex:1;
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`

const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`

const ProductAmount = styled.div`
font-size:24px;
margin:5px;
${mobile({ margin: "5px 15px" })}
`

const ProductPrice = styled.div`
font-size:24px;
font-weight:200;
${mobile({ marginBottom: "20px" })}
`

const Hr = styled.hr`
background-color:#eee;
border:none;
height:1px;
margin:20px 0;
`


const Summary = styled.div`
flex: 1;
border:1px solid lightgray;
border-radius:10px;
padding:20px;
height:50vh;
`

const SummaryTitle = styled.h1`
font-weight:200;
`

const SummaryItem = styled.div`
margin:30px 0;
display:flex;
justify-content:space-between;
font-weight:${(props) => props.type === "total" && "500"};
font-size:${(props) => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`

`

const Button = styled.button`
width:100%;
padding:10px;
background-color:black;
color:white;
font-weight:600;
`

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                })
                console.log(res, 'res');
                history.push("/success", { data: res.data });
            } catch (error) {
                console.log(error);
            }
        };
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history]);

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Bag</Title>
                <Top>
                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your WhishList (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">Checkout Now</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product key={product.id}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product :</b> {product.title}</ProductName>
                                        <ProductId><b>ID :</b> {product._id}</ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>SIZE :</b> {product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Add />
                                        <ProductAmount > {product.quantity}</ProductAmount>
                                        <Remove />
                                    </ProductAmountContainer>
                                    <ProductPrice>Rs. {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>

                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>

                        <SummaryItem>
                            <SummaryItemText>SubTotal </SummaryItemText>
                            <SummaryItemPrice> Rs. {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping </SummaryItemText>
                            <SummaryItemPrice> Rs. 5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem>
                            <SummaryItemText>Shipping Discount </SummaryItemText>
                            <SummaryItemPrice> Rs. -5.90</SummaryItemPrice>
                        </SummaryItem>

                        <SummaryItem type="total">
                            <SummaryItemText >Total </SummaryItemText>
                            <SummaryItemPrice> Rs. {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        <StripeCheckout
                            name="Aditya"
                            img="https://images.pexels.com/photos/3419841/pexels-photo-3419841.png?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            billingAddress
                            shippingAddress
                            description={`Your total is Rs. ${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>check Out Now</Button>
                        </StripeCheckout>

                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container >
    )
}

export default Cart
