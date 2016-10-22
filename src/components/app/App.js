import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import AppActions from '../../actions/AppActions';
import BillActions from '../../actions/BillActions';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import Content from '../content/Content';
import styles from './App.scss';
import {
  MOBILE_WIDTH,
  TABLET_WIDTH
} from '../../constants';

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  getChildContext() {
    return {
      user: this.props.user
    };
  }

  componentWillMount() {
    BillActions.get();
  }

  componentDidMount() {
    setTimeout(() => {
      if (window.requestAnimationFrame) {
        window.cancelAnimationFrame(window._loadTimer);
      } else {
        window.clearInterval(window._loadTimer);
      }
      
      const node = document.querySelector('#loading');
      node.parentNode.removeChild(node);
      this.setState({ loading: false });
    }, 1000);

    const onResize = () => {
      AppActions.setIsMobile(
        window.innerWidth < MOBILE_WIDTH,
        window.innerWidth >= MOBILE_WIDTH && window.innerWidth < TABLET_WIDTH
      );
    };

    window.addEventListener('orientationchange', onResize);
    window.addEventListener('resize', onResize);
  }

  render() {
    const { 
      user,
      message, 
      isMobile,
      isTablet,
      activeTab,
    } = this.props;

    const cssClass = classNames(
      'flex-col',
      'main',
      { 
        mobile: isMobile,
        tablet: isTablet,
        [styles.loading]: this.state.loading 
      }
    );

    const headerProps = {
      user,
      isMobile,
      isTablet,
      activeTab
    };

    return (
      <div className={cssClass}>
        <Header {...headerProps} />
        { message ? (
          <div className={styles.message}>{message}</div>
        ) : null
        }
        <div className="flex-row main">
        <Sidebar isMobile={isMobile} isTablet={isTablet} />
          <Content />
        </div>
      </div>
    );
  }
}

App.childContextTypes = {
  user: React.PropTypes.object
};

const setProps = (state) => {
  return {
    user: state.app.user,
    message: state.app.message,
    isMobile: state.app.isMobile,    
    isTablet: state.app.isTablet,
    activeTab: state.app.activeTab 
  };
};

export default connect(setProps)(App);
