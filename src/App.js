import { BrowserRouter as Router, Switch } from 'react-router-dom';
import $ from 'jquery'
import { ToastProvider } from 'react-toast-notifications';
import { Login, Register } from './container/account';
import ProtectedRoute from './routes/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { userAuth } from "./redux/account/authReducer";
import { PrivateComponent } from './components/dashboard/PrivateComponent';
import { useEffect } from 'react';
import { toggleLoading } from './redux/dashboard/FeedReducer';

function App() {
  const isauth = useSelector(userAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isauth) {
      dispatch(toggleLoading(true))
      window.setTimeout(() => {
        dispatch(toggleLoading(false))
        $(".toggle-menu").on("click", function () {
          $(".sidebar").toggleClass("toggle-sidebar");
          $(this).toggleClass("toggle-active");
          $(".content-wrapper").toggleClass("content-spacer")
          $(".topbar").toggleClass("topbar-collapse")
        });
      }, 1200)
    }
    else {
      dispatch(toggleLoading(false))
    }

  }, [isauth])
  return (
    <ToastProvider>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={Login} />
          <ProtectedRoute path="/register" component={Register} />
          <PrivateComponent isauth={isauth} />
        </Switch>
      </Router>
    </ToastProvider>
  )
}

export default App;
