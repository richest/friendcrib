import React from 'react';
import { Input } from '../common';

const ConfirmModelComponent = (props) => {
    return(
        <div className="modal fade" id="confirm-modal">
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                   <form>
                    <div className="modal-body p-0 text-center">
                      <p>{props.myFavProps.message}</p>
                    <div className="form-group position-relative">
                        <Input type="submit" value="Yes" onClick={props.handleConfirmSumbit} class="btn btn-success mr-3" dataDismiss="modal" />
                        <Input type="submit" value="NO" onClick={props.handleCancel} class="btn btn-danger" dataDismiss="modal"/>
                     </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ConfirmModelComponent;