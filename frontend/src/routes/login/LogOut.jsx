import axios from "axios";

import Button from "../../components/Button";
import Logo from "../../components/Logo";
import Success from "../../components/Success"

import { url, logout } from "../../utils/api";

const LogOut = ({ toggleSidebar }) => {
    const name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")

    const success = () => {
        toggleSidebar(<Success text={ "Successfully logged out!" } toggleSidebar={ toggleSidebar } />)
    }

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
                success();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center text-neutral-25 pt-80 pb-64">
            <Logo />
            <p className="py-32 text-heading-h5 text-neutral-300">{ name }</p>
            <Button className="w-[70%]" onClick={ onFinish }>Log out</Button>
        </div>
    )
}

export default LogOut;
