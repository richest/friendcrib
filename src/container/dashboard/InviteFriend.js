import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { InviteFriendComponent } from '../../components/dashboard';
import { addValidation, getCookie } from '../../functions';
import { handleInviteFriendValidation } from '../../functions/validations';
import { inviteFriend, loading, inviteFriendData, FriendLoadingData } from '../../redux/dashboard/FriendReducer';

const InviteFriend = () => {
  const dispatch = useDispatch();
  const inviteFriendProps = useSelector(inviteFriendData);
  const inviteFriendLoading = useSelector(FriendLoadingData);
  const emailEl = useRef(null);
  const noteEl = useRef(null);
  const emailElValidation = useRef(null);
  const { addToast } = useToasts();

  useEffect(() => {
    emailEl.current.focus();
  }, [])

  const handleChange = (e) => {
    const target = e.target;
    dispatch(inviteFriend({ newState: { ...inviteFriendProps, ...{ [target.name]: target.value } } }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = {
      is_valid_email: { status: false, elm: emailEl, validation: emailElValidation },
    }
    validation = handleInviteFriendValidation(validation, inviteFriendProps)
    let { is_valid_email } = validation;
    addValidation(validation);
    if (is_valid_email.status) {
      dispatch(loading({ is_loading: true }));
      const bodyParameters = {
        session_id: getCookie("session_id"),
        email: inviteFriendProps.email,
        notes: inviteFriendProps.note
      }
      axios.post("http://167.172.209.57/friendcrib/backend/api/sendInvite", bodyParameters)
        .then((response) => {
          if (response.data.status == 200 && response.data.success) {
            const modal = document.getElementById('invite-modal');

            document.querySelector('body').classList.remove('modal-open');
            // document.querySelector("body").style = "";
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.setAttribute('style', 'display: none');
            modal.removeAttribute("aria-modal");
            modal.removeAttribute("role");

            const modalBackdrops = document.getElementsByClassName('modal-backdrop fade show');

            document.body.removeChild(modalBackdrops[0]);

            dispatch(inviteFriend({ newState: null }));
            dispatch(loading({ is_loading: false }));
            addToast(response.data.message, {
              appearance: 'success',
              autoDismiss: true,
            });
          }
          else {
            dispatch(loading({ is_loading: false }));
            addToast(response.data.message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        }, (error) => {
          addToast(error.message, {
            appearance: 'error',
            autoDismiss: true,
          });
          dispatch(loading({ is_loading: false }));
        });
    }
  }
  return (

    <InviteFriendComponent
      allrefs={{ emailEl, noteEl, emailElValidation }}
      inviteFriendProps={inviteFriendProps}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      inviteFriendLoading={inviteFriendLoading}
    />

  )
}
export default InviteFriend;