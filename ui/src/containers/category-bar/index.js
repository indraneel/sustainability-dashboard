import React, {Component} from 'react';
import style from './category-bar.style.js';
import CategoryBarSection from '../../components/category-bar-section';
import COLORS from '../../constants/colors';

class CategoryBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  getColor(color) {
    let output = color;

    if (COLORS[color]) {
      output = COLORS[color].rgba ?
        COLORS[color].rgba
        : COLORS[color].hex ?
          COLORS[color].hex
          : color
    }
    return output;
  }

  render() {
    return (
      <div style={style.root}>
        <div style={style.title}>Action Breakdown</div>
        <div style={style.bar}>
          {this.props.categories.map((category) => (
            <CategoryBarSection
              key={category.categoryId}
              categoryId={category.categoryId}
              title={category.title}
              percentage={category.percentage}
              color={this.getColor(category.color)}
              numberOfSections={category.length}
              maxWidth={650}
              handleSelectCategory={this.props.handleSelectCategory}
              selectedCategoryID={this.props.selectedCategoryID}/>
          ))}
        </div>
      </div>
    );
  }
}

export default CategoryBar;
