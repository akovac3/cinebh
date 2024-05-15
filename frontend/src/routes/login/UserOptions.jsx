import axios from "axios";

import { Dropdown, DropdownItem } from "../../components/Dropdown";

import { url, logout } from "../../utils/api";

const UserOptions = ({ setUserClick }) => {

    const userRole = localStorage.getItem('userRole')

    const onFinish = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(url + logout, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                localStorage.clear()
                setUserClick(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dropdown className="w-[300px] right-[118px]">
            <DropdownItem>Profile</DropdownItem>
            { userRole === 'ADMIN' && <DropdownItem>Admin</DropdownItem> }
            <DropdownItem className="text-primary-600" onClick={ onFinish }>Log Out</DropdownItem>
        </Dropdown>
    )
}

export default UserOptions;
