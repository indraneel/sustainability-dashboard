import React, {Component} from 'react';
import style from './category-bar.style.js';
import CategoryBarSection from '../../components/category-bar-section';

const categoryData = [
  {
    categoryId: 1,
    title: 'Energy',
    percentage: '10%',
    color: 'yellow'
  },
  {
    categoryId: 2,
    title: 'Water',
    percentage: '30%',
    color: 'blue'
  },
  {
    categoryId: 3,
    title: 'Food',
    percentage: '40%',
    color: 'green'
  },
  {
    categoryId: 4,
    title: 'Waste',
    percentage: '20%',
    color: 'gray'
  },
  {
    categoryId: 5,
    title: 'Tech',
    percentage: '20%',
    color: 'gray'
  },
  {
    categoryId: 6,
    title: 'Soft',
    percentage: '20%',
    color: 'gray'
  },
];

class CategoryBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={style.root}>
        <div style={style.title}>Haddonfield Action Breakdown</div>
        <div style={style.bar}>
          {categoryData.map((category) => (
            <CategoryBarSection
              key={category.categoryId}
              categoryId={category.categoryId}
              title={category.title}
              percentage={category.percentage}
              color={category.color}
              numberOfSections={category.length}
              maxWidth={650}
              handleSelectAction={this.props.handleSelectAction}
              selectedCategoryID={this.props.selectedCategoryID}/>
          ))}
        </div>
      </div>
    );
  }
}

export default CategoryBar;
