import "./widgetSm.css";

import React, { useEffect, useState } from 'react';
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

const WidgetSm = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await userRequest.get("users/?new=true")
                setUsers(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        getUsers()
    }, []);

    return (
        <div className="widgetsm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <img src={user.img || "https://images.pexels.com/photos/7186214/pexels-photo-7186214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

};

export default WidgetSm;
