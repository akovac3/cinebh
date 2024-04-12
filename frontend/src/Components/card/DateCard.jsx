import Card from "../Card";
import { createClassName } from "../../utils/utils";

const DateCard = ({ className, onClick, ...props }) => {
    const date = props.date;
    const value = props.value;
    const today = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <Card onClick={ onClick } className={ createClassName("flex flex-col items-center justify-center h-[84px] rounded-8 shadow-light-50", className) }>
            <div className="flex">
                <p className="text-body-l font-semibold">{ months[date.getMonth()] }</p>
                &nbsp;
                <p className="text-body-l font-semibold">{ date.getDate() }</p>
            </div>
            <p className={ `${value.getDate() === date.getDate() && value.getMonth() === date.getMonth() ? "text-primary-25" : "text-neutral-500"}` }>{ date.getDate() === today.getDate() && date.getMonth() === today.getMonth() ? "Today" : days[date.getDay()] }</p>
        </Card>
    )
}

export default DateCard;
