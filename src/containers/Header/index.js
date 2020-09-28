import React, { useState, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Search from '@material-ui/icons/Search';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AppsIcon from '@material-ui/icons/Apps';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { isMobileOnly } from 'react-device-detect';

import {
  StyledAppBar,
  StyledToolbar,
  Container,
  DrawerContentContainer
} from './styles';

const APP_NAME = "Meal Planner"

/**
 * ListItem with NavLink
 */
function ListItemLink({ icon, primary, to, onClick, divider }) {
  const selected = useRouteMatch( to );

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => <NavLink to={ to } ref={ ref } { ...itemProps } />),
    [to],
  );

  return (
    <li>
      <ListItem
        button
        component={ renderLink }
        onClick={ onClick }
        divider={ divider }
        selected={ Boolean(selected) }
      >
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText primary={ primary } />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element.isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  divider: PropTypes.bool
};

ListItemLink.defaultProps = {
  divider: false
};

/**
 * Header for mobile devices
 */
function MobileHeader({ redirectTo }) {
  const [drawerStatus, setDrawerStatus] = useState(false);
  const theme = useTheme();

  /**
   * Handles drawer toggle
   * @param {Boolean} [state] - State of drawer
   * @returns {Function}
   */
  function handleToggleDrawer(state) {
    return function() {
      setDrawerStatus(!!state);
    }
  }

  const drawerItems = [
    {
      icon: <RestaurantIcon />,
      primary: "Recipes",
      to: "/recipes"
    },
    {
      icon: <AppsIcon />,
      primary: "Categories",
      divider: true,
      to: "/categories"
    },
    {
      icon: <DateRangeIcon />,
      primary: "Plan Meals",
      to: "/plan"
    },
    {
      icon: <AddCircleIcon />,
      primary: "Add a Recipe",
      to: "/recipe/add"
    }
  ]

  return (
    <>
      <IconButton color="inherit" aria-label="Menu" onClick={ handleToggleDrawer(true) }>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap>
        { APP_NAME }
      </Typography>
      <div className="grow" />
      <IconButton color="inherit" aria-label="Search" onClick={ redirectTo('/search') }>
        <Search />
      </IconButton>
      <Drawer
        open={ drawerStatus }
        onClose={ handleToggleDrawer(false) }
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <DrawerContentContainer>
          <div style={{ minHeight: `${theme.mixins.toolbar.minHeight}px` }} />
          <List>
            { drawerItems.map((itemProps) => (
              <ListItemLink key={ itemProps.primary } onClick={ handleToggleDrawer(false) } { ...itemProps } />
            )) }
          </List>
        </DrawerContentContainer>
      </Drawer>
    </>
  );
}

MobileHeader.propTypes = {
  redirectTo: PropTypes.func.isRequired
};

/**
 * Header for desktop
 */
function DesktopHeader({ redirectTo }) {
  return (
    <>
      <Typography variant="h6" noWrap>
        { APP_NAME }
      </Typography>
      <Container>
        <Button onClick={ redirectTo( '/recipes' ) }>
          Recipes
        </Button>
        <Button onClick={ redirectTo( '/categories' ) }>
          Categories
        </Button>
      </Container>
      <Button onClick={ redirectTo( '/recipe/add'  )}>
        Add a Recipe
      </Button>
    </>
  );
}

DesktopHeader.propTypes = {
  redirectTo: PropTypes.func.isRequired
};

/**
 * Header componnent
 */
function Header() {
  const location = useLocation();
  const history = useHistory();

  /**
   * Handles redirecting of route
   * @param {string} route - Route URL
   * @param {function} callback
   */
  function handleRedirectRoute(route, callback) {
    return function () {
      callback && callback();
      if (location.pathname !== route) {
        history.push(route);
      }
    }
  }

  return (
    <StyledAppBar position="fixed" component="nav">
      <StyledToolbar>
        {isMobileOnly
          ? <MobileHeader redirectTo={ handleRedirectRoute } />
          : <DesktopHeader redirectTo={ handleRedirectRoute } />
        }
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;
