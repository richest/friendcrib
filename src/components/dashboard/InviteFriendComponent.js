import React, { forwardRef } from 'react';
import { Input, Spinner, Textarea } from '../common';

const InviteFriendComponent = forwardRef((props) => {
    return (
        <div className="modal fade" id="invite-modal">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header border-0 p-0">
                        <h2 className="modal-title mb-3">Invite a Friend!</h2>
                        <button type="button" className="close" data-dismiss="modal"><img src="/assets/images/close-btn.png" alt="close" /></button>
                    </div>
                    <div className="modal-body p-0">
                        <form onSubmit={props.handleSubmit} noValidate={true} >
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="d-block">Email</label>
                                        <Input
                                            id="invite-input-val"
                                            type="email"
                                            name="email"
                                            class="form-control"
                                            ref={props.allrefs.emailEl}
                                            value={props.inviteFriendProps.email}
                                            onChange={props.handleChange}
                                            placeholder="Enter your email"/>
                                    </div>
                                    <p id="invite-error" style={{ display: "none" }} ref={props.allrefs.emailElValidation} className="error-message">Please enter your email.</p>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="d-block">Note</label>
                                        <Textarea
                                            ref={props.allrefs.noteEl}
                                            name="note"
                                            class="form-control w-100 thought-msg"
                                            value={props.inviteFriendProps.note}
                                            onChange={props.handleChange}
                                            placeholder="Enter your notes.."/>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group position-relative btn-loader">
                                        <Input type="submit" disabled={props.inviteFriendLoading ? true : false} value="Submit" defaultValue="Add Addition" class="btn" />
                                        <Spinner loading={props.inviteFriendLoading} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default InviteFriendComponent;