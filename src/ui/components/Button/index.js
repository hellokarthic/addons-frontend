import classNames from 'classnames';
import { oneLine } from 'common-tags';
import React from 'react';
import PropTypes from 'prop-types';

import Link from 'amo/components/Link';
import log from 'core/logger';


import './Button.scss';

const BUTTON_TYPES = [
  'neutral',
  'light',
  'action',
  'cancel',
  'confirm',
  'alert',
  'report',
];

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.boolean,
    href: PropTypes.string,
    to: PropTypes.string,
    type: PropTypes.string,
  }

  render() {
    const {
      children,
      className,
      href,
      to,
      type,
      ...rest
    } = this.props;
    const props = { ...rest };

    if (!type || BUTTON_TYPES.include(type)) {
      throw new Error(`"${type}" supplied but that is not a valid button type`);
    }

    const setClassName = (...classConfig) => {
      return classNames('Button', `Button--${type}`, className, ...classConfig);
    };

    if (href || to) {
      if (href) {
        props.href = href;
        // If this button should be a link we don't want to prefix the URL.
        props.prependClientApp = false;
        props.prependLang = false;
      } else if (to) {
        props.to = to;
      }

      props.className = setClassName({ disabled: props.disabled });

      if (props.disabled) {
        props.onClick = (event) => {
          event.preventDefault();
          log.warn(oneLine`Not calling onClick() for Button link to
            ${props.href || props.to} because it is disabled`);
        };
      }
      return <Link {...props}>{children}</Link>;
    }

    return <button className={setClassName()} {...props}>{children}</button>;
  }
}
