import React, { Component } from 'react';
import style from './category-bar-section.style.js';
import Paper from 'material-ui/Paper';

class CategoryBarSection extends Component {
  constructor(props) {
    super(props);

    this.toggleAction = this.toggleAction.bind(this);
  }

  toggleAction(e) {
    this.props.handleSelectCategory(this.props.categoryId);
  }

  render() {
    const {
      color,
      categoryId,
      selectedCategoryID
    } = this.props;

    let zDepth = 1;
    let colorStyle = { borderColor: color };

    if (categoryId && selectedCategoryID && (categoryId === selectedCategoryID)) {
      zDepth = 0;
      colorStyle = { backgroundColor: color }
    }

    return (
      <Paper style={{...style.root, ...colorStyle}}
        zDepth={zDepth}
        onClick={this.toggleAction}>
        <div style={style.title}>{this.props.title}</div>
        <div style={style.percentage}>{this.props.percentage}</div>
      </Paper>
    )
  }
}

export default CategoryBarSection;
