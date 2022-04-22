import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import './featuredInfo.css';
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {

    const [income, setIncome] = useState([]);
    const [perc, setPerc] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
                setPerc((res.data[1].total * 100) / res.data[0].total - 100);
            } catch (error) {
                console.log(error)
            }
        };
        getIncome();
    }, []);

    console.log(perc)

    return (
        <div className='featured'>
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">Rs.{income[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(perc)}{" "}
                        {perc < 0 ?
                            (
                                <ArrowDownward className='featuredIcon negative' />
                            ) :
                            (
                                <ArrowUpward className='featuredIcon' />
                            )
                        }
                    </span>
                </div>
                <span className="featuredSub">Compared to Last Month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">Rs.20</span>
                    <span className="featuredMoneyRate">
                        -11.4 <ArrowDownward className='featuredIcon negative' />
                    </span>
                </div>
                <span className="featuredSub">Compared to Last Month</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">Rs.30</span>
                    <span className="featuredMoneyRate">
                        2.4 <ArrowUpward className='featuredIcon' />
                    </span>
                </div>
                <span className="featuredSub">Compared to Last Month</span>
            </div>

        </div>
    );
};

export default FeaturedInfo;
