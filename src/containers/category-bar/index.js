import React, {Component} from 'react';
import style from './category-bar.style.js';
import CategoryBarSection from '../../components/category-bar-section';

class CategoryBar extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div style={style.root}>
        <div style={style.title}>Haddonfield Action Breakdown</div>
        <div style={style.bar}>
          {this.props.categories.map((category) => (
            <CategoryBarSection
              key={category.categoryId}
              categoryId={category.categoryId}
              title={category.title}
              percentage={category.percentage}
              color={category.color}
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
