import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import { userData } from "../../dummyData";
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useState, useMemo, useEffect } from 'react';
import { userRequest } from '../../requestMethods';


const Home = () => {

    const [userStat, setUserStat] = useState([]);

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
        const getStat = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                res.data.map((item) =>
                    setUserStat(prev => [
                        ...prev,
                        { name: MONTHS[item._id - 1], "Active User": item.total },
                    ])
                );
            } catch (error) {
                console.log(error)
            }
        };
        getStat()
    }, [MONTHS]);


    return (
        <div className='home'>
            <FeaturedInfo />
            <Chart data={userStat} title="User Analytics" grid dataKey="Active User" />
            <div className='homeWidgets'>
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
};

export default Home;
