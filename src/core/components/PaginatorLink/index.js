import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Button from 'ui/components/Button';

export default class PaginatorLink extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    queryParams: PropTypes.object,
    text: PropTypes.string,
  }

  render() {
    const {
      className,
      currentPage,
      page,
      pageCount,
      pathname,
      queryParams,
      text,
    } = this.props;

    if (currentPage === undefined) {
      throw new Error('The currentPage property cannot be undefined');
    }
    if (pathname === undefined) {
      throw new Error('The pathname property cannot be undefined');
    }
    if (page === undefined) {
      throw new Error('The page property cannot be undefined');
    }
    if (pageCount === undefined) {
      throw new Error('The pageCount property cannot be undefined');
    }

    if (currentPage === page || page < 1 || page > pageCount) {
      return (
        <Button
          key={page}
          className={classNames('Button--light', 'Paginate-item', 'disabled', className)}
        >
          {text || page}
        </Button>
      );
    }

    return (
      <Button
        to={{ pathname, query: { ...queryParams, page } }}
        className={classNames('Button--light', 'Paginate-item', className)}
      >
        {text || page}
      </Button>
    );
  }
}
