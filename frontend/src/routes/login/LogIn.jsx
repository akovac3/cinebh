import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

import Button from "../../components/Button";
import Logo from "../../components/Logo";
import SignUp from "./SignUp";
import Input from "../../components/Input"
import Checkbox from "../../components/Checkbox";

const LogIn = ({ toggleSidebar }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState(false);


    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    const handleRememberMeChange = () => setRememberMe(!rememberMe);

    return (
        <div className="flex flex-col items-center justify-center text-neutral-25 pt-80">
            <Logo />
            <p className="py-40 text-heading-h5 text-neutral-300">Welcome Back</p>
            <div className="w-[70%] pb-24">
                <Input
                    label="Email"
                    text="Email Address"
                    open={ focused }
                    placeholder={ email }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEnvelope } /> }
                    className="w-full pb-16"
                    onChange={ handleEmailChange }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                />

                <Input
                    label="Password"
                    text="Password"
                    open={ focused }
                    placeholder={ password }
                    leftIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faLock } /> }
                    rightIcon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faEyeSlash } /> }
                    className="w-full pb-24"
                    onChange={ handlePasswordChange }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                />

                <Checkbox label="Remember me" icon={ <FontAwesomeIcon className="w-5 h-5" icon={ fas.faCheck } /> }></Checkbox>
                <label htmlFor="rememberMe">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={ rememberMe }
                        onChange={ handleRememberMeChange }
                    />
                    Remember Me
                </label>

                <Button className="w-full">Sign In</Button>
            </div>

            <div className="text-body-l flex items-center justify-center pb-80">
                Don't have an account yet?
                <Button variant="tertiary" className="!text-neutral-25" onClick={ () => toggleSidebar(<SignUp toggleSidebar={ toggleSidebar } />) } >Sign Up</Button>
            </div>
        </div>
    )
}

export default LogIn;
