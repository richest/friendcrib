import React from 'react';
import { BarLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`   
    text-align: center;
    width: 100%;
    position: absolute;
    top: 0%;
    right: 0%;
`;

const Loader = (props) => {
    return (
        <BarLoader color={"#ED702D"} loading={!!props.loading ? true : false} css={override} />
    )
}
export default Loader;