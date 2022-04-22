import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { Remove, Add } from '@material-ui/icons';
import { mobile } from "../../src/responsive"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { userRequest, publicRequest } from '../requestMethods';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div`
`

const Wrapper = styled.div`
padding:50px;
display:flex;
${mobile({ flexDirection: "column", padding: "10px" })}
`

const ImgContainer = styled.div`
flex:1;
`

const Image = styled.img`
width:100%;
height:90vh;
${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
flex:1;
padding: 0 50px;
${mobile({ padding: "10px" })}
`
const Title = styled.h1`
font-weight:200;

`

const Desc = styled.p`
margin:20px 0;
`

const Price = styled.span`
font-weight:100;
font-size:40px;
`

const FilterContainer = styled.div`
width:50%;
margin:30px 0;
display:flex;
justify-content:space-between;
${mobile({ width: "100%" })}

`
const Filter = styled.div`
display:flex;
align-items:center;
`
const FilterTitle = styled.span`
font-weight:200;
font-size:20px;
`

const FilterColor = styled.div`
width:20px;
height:20px;
border-radius:50%;
background-color:${(props) => props.color};
margin:0 5px;
cursor:pointer;
`

const FilterSize = styled.select`
margin-left:10px;
padding:5px;

`
const AddContainer = styled.div`
width:50%;
display:flex;
align-items:center;
justify-content:space-between;
${mobile({ width: "100%" })};
`
const AmountContainer = styled.div`
display:flex;
align-items:center;
font-weight:700;
`
const Amount = styled.span`
width:30px;
height:30px;
border:1px solid teal;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
margin 0 5px;
`
const Button = styled.button`
padding:15px;
border:2px solid teal;
background-color:white;
cursor:pointer;
font-weight:500;

&:hover{
    background-color:#f8f4f4;
}
`

const FilterSizeOption = styled.option``

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
                console.log(res, 'res')
            } catch (error) {

            }
        };
        getProduct();
    }, [id]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    };

    const handleClick = () => {
        //Update cart  
        dispatch(addProduct({ ...product, quantity, color, size }))

    }

    return (
        <Container>
            <Navbar />
            <Announcement />

            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} alt="" />
                </ImgContainer>

                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color?.map((c) => <FilterColor color={c} key={c} onClick={() => setColor(c)} />)}
                        </Filter>

                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onClick={(e) => setSize(e.target.value)}>
                                {product.size?.map((s) => <FilterSizeOption key={s} >{s}</FilterSizeOption>)}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>

                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => handleQuantity("dec")} />
                            <Amount>{quantity}</Amount>
                            <Add onClick={() => handleQuantity("inc")} />
                        </AmountContainer>

                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>

                </InfoContainer>

            </Wrapper>

            <NewsLetter />
            <Footer />
        </Container>
    )
}

export default Product;
