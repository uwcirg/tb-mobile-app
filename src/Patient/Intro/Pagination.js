import React from 'react';
import PropTypes from 'prop-types';
import PaginationDot from './PaginationDot';

const styles = {
  root: {
    margin: "auto",
    display: 'flex',
    flexDirection: 'row',
    width: "30%",
    justifyContent: "center"
  },
  container:{
    width: "100%",
    position: "absolute",
    top: "1em",
  }
};

class Pagination extends React.Component {
  handleClick = (event, index) => {
    this.props.onChangeIndex(index);
  };

  render() {
    const { index, dots } = this.props;

    const children = [];

    for (let i = 0; i < dots; i += 1) {
      children.push(
        <PaginationDot key={i} index={i} active={i === index} onClick={this.handleClick} />,
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.root}>
          {children}
        </div>
      </div>);
  }
}

Pagination.propTypes = {
  dots: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  onChangeIndex: PropTypes.func.isRequired,
};

export default Pagination;