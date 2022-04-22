import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './user.css';

const User = () => {
    return (
        <div className='user'>
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">  Create</button>
                </Link>
            </div>

            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src="https://images.pexels.com/photos/10936639/pexels-photo-10936639.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className="userShowImg" />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Aditya</span>
                            <span className="userShowUserTitle">Engineer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className='userShowIcon' />
                            <span className="userShowInfoTitle">adi99  </span>
                        </div>

                        <div className="userShowInfo">
                            <CalendarToday className='userShowIcon' />
                            <span className="userShowInfoTitle">01.07.1996 </span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>

                        <div className="userShowInfo">
                            <PhoneAndroid className='userShowIcon' />
                            <span className="userShowInfoTitle">9873437411 </span>
                        </div>

                        <div className="userShowInfo">
                            <MailOutline className='userShowIcon' />
                            <span className="userShowInfoTitle">adi@gmail.com</span>
                        </div>

                        <div className="userShowInfo">
                            <LocationSearching className='userShowIcon' />
                            <span className="userShowInfoTitle">Mumbai | Maharashtra </span>
                        </div>

                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdatetitle">Edit</span>
                    <form action="" className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label >UserName</label>
                                <input type="text" placeholder='Adi' className='userUpdateInput' />
                            </div>
                            <div className="userUpdateItem">
                                <label >Full Name</label>
                                <input type="text" placeholder='Aditya Pathak' className='userUpdateInput' />
                            </div>

                            <div className="userUpdateItem">
                                <label >Email</label>
                                <input type="email" placeholder='adi@gmail.com' className='userUpdateInput' />
                            </div>

                            <div className="userUpdateItem">
                                <label >Phone</label>
                                <input type="text" placeholder='9873437411' className='userUpdateInput' />
                            </div>

                            <div className="userUpdateItem">
                                <label >Address</label>
                                <input type="text" placeholder='Mumbai | Maharashtra' className='userUpdateInput' />
                            </div>

                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img src="https://images.pexels.com/photos/10936639/pexels-photo-10936639.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className='userUpdateimg' />
                                <label htmlFor="file"><Publish className='userUpdateIcon' /> </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default User;
