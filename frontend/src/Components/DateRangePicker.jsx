import { useState, cloneElement } from "react"
import { DateRange } from "react-date-range"
import { addDays } from "date-fns"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import Button from "./Button"

import { createClassName } from "../utils/utils"

const DateRangePicker = ({ className, onClickApply, onClickCancel, label }) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState([
        {
            startDate: null,
            endDate: new Date(""),
            key: "selection",
            color: "#B22222"
        }
    ])

    return (
        <div className={ createClassName("relative", className) }>
            <div onClick={ () => { setOpen(!open) } }>
                { cloneElement(label, { active: open, value: state[0].startDate }) }
            </div>
            { open && (
                <div className="flex flex-col absolute top-[110%] h-[415px] bg-neutral-0 rounded-12 z-50 shadow-light-200 border border-neutral-200">
                    <div className="pt-8">
                        <DateRange className="rounded-8 font-body"
                            editableDateInputs={ true }
                            dateDisplayFormat="yyyy/MM/dd"
                            moveRangeOnFirstSelection={ false }
                            onChange={ item => setState([item.selection]) }
                            minDate={ addDays(new Date(), 10) }
                            ranges={ state }
                        />
                        <Button
                            className="absolute top-[355px] right-16"
                            size="sm"
                            onClick={ () => { onClickApply(state[0].startDate, state[0].endDate); setOpen(false) } }
                        >
                            Apply
                        </Button>
                        <Button
                            className="absolute top-[355px] right-96"
                            variant="secondary"
                            size="sm"
                            onClick={ () => {
                                setState([{
                                    startDate: null,
                                    endDate: new Date(""),
                                    key: "selection",
                                    color: "#B22222"
                                }])
                                onClickCancel()
                                setOpen(false)
                            } }
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default DateRangePicker;
