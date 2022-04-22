import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from "../../../components/chart/Chart";
import { productData } from "../../../dummyData";
import { Publish } from '@material-ui/icons';
import { useSelector } from "react-redux";
import { useState, useMemo, useEffect } from 'react';
import { userRequest } from "../../../requestMethods";

const Product = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);

    const product = useSelector(state => state.product.products.find(product => product._id === productId));


    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest("orders/income?pid=" + productId);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total }
                    ])
                );
            } catch (error) {
                console.log(error)
            }
        };
        getStats()
    }, [productId, MONTHS])


    return <div className='product'>
        <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newProduct">
                <button className="productAddButton">Create</button>
            </Link>
        </div>

        <div className="productTop">
            <div className="productTopLeft">
                <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </div>
            <div className="productTopRight">
                <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                </div>
                <div className="productInfoBottom">
                    <div className="productInfoItem">
                        <span className="productInfoKey">{product._id}</span>
                        <span className="productInfoValue">123</span>
                    </div>

                    <div className="productInfoItem">
                        <span className="productInfoKey">Sales:</span>
                        <span className="productInfoValue">5123</span>
                    </div>

                    <div className="productInfoItem">
                        <span className="productInfoKey">In Stock:</span>
                        <span className="productInfoValue">{product.inStock}</span>
                    </div>

                </div>
            </div>
        </div>

        <div className="productBottom">
            <form className="productForm">
                <div action="" className="productFormLeft">
                    <label>Product Name</label>
                    <input type="text" placeholder={product.title} />

                    <label>Product Description</label>
                    <input type="text" placeholder={product.desc} />

                    <label>Price</label>
                    <input type="text" placeholder={product.price} />

                    <label>In Stock</label>
                    <select name="instock" id="instock">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                </div>

                <div action="" className="productFormRight">
                    <div className="productUpload">
                        <img src={product.img} alt="" className="productUploadImg" />
                        <label for="file">
                            <Publish />
                            <input type="file" id='file' style={{ display: "none" }} />
                        </label>
                    </div>

                    <button className='productButton'>Update</button>

                </div>
            </form>
        </div>
    </div>;
};

export default Product;
