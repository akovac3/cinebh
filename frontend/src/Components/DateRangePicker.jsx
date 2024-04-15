import { useState } from 'react'
import { DateRange } from 'react-date-range';
import format from "date-fns/format"
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Label from './Label';
import Button from './Button';

import { createClassName } from '../utils/utils';

const DateRangePicker = ({ className, placeholder, onClickApply, onClickCancel, label, rightIcon, leftIcon }) => {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState([
        {
            startDate: null,
            endDate: new Date(""),
            key: 'selection',
            color: '#B22222'
        }
    ]);

    const getDate = () => {
        return format(state[0].startDate, "yyyy/MM/dd") + " - " + format(state[0].endDate, "yyyy/MM/dd")
    }

    return (
        <div className={ createClassName("relative", className) }>
            <div onClick={ () => { setOpen(!open) } }>
                <Label label={ label } value={ state[0].startDate } rightIcon={ rightIcon } leftIcon={ leftIcon } open={ open }>
                    <div className={ `pl-12 ${open ? "!text-neutral-900" : "!text-neutral-500"} ${state[0].startDate ? "!text-neutral-900" : "!text-neutral-500"} cursor-pointer` }>
                        <p>{ state[0].startDate ? getDate() : placeholder }</p>
                    </div>
                </Label>
            </div>
            { open && (
                <div className='flex flex-col absolute top-[110%] h-[415px] bg-neutral-0 rounded-12 z-50 shadow-light-200 border border-neutral-200'>
                    <div className="pt-8">
                        <DateRange className='rounded-8 font-body'
                            editableDateInputs={ true }
                            dateDisplayFormat="yyyy/MM/dd"
                            moveRangeOnFirstSelection={ false }
                            onChange={ item => setState([item.selection]) }
                            minDate={ addDays(new Date(), 10) }
                            ranges={ state } />
                        <Button className="absolute top-[355px] right-16" size='sm' onClick={ () => { onClickApply(state[0].startDate, state[0].endDate); setOpen(false) } }>Apply</Button>
                        <Button className="absolute top-[355px] right-96" variant='secondary' size='sm' onClick={ () => {
                            setState([{
                                startDate: null,
                                endDate: new Date(""),
                                key: "selection",
                                color: "#B22222"
                            }])
                            onClickCancel()
                            setOpen(false)
                        } }>Cancel</Button>
                    </div>
                </div>
            ) }
        </div>
    )
}

export default DateRangePicker;
