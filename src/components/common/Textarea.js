import React, {forwardRef} from 'react';

const Textarea = (props, ref) => {
    return (
        <textarea
            ref={ref}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            className={props.class} />
    )
}
export default forwardRef(Textarea);