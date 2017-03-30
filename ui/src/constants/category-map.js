const categoryMap = {
  "Access to Public Information": "Community",
  "Animals in the Community": "Community",
  "Arts & Creative Culture": "Community",
  "Brownfields": "Waste + Pollution",
  "Buy Local Programs": "Business + Development",
  "Caring for Conservation Easements": "Energy + Natural Resources",
  "Citizen Engagement": "Community",
  "Communications": "Governance",
  "Community Partnership & Outreach": "Community",
  "Direct Install": "Energy + Natural Resources",
  "Diversity & Equity": "Governance",
  "Electric Vehicles": "Energy + Natural Resources",
  "Emergency Management and Resiliency": "Governance",
  "Energy Efficiency": "Energy + Natural Resources",
  "Farmland Preservation": "Food",
  "Food Production": "Food",
  "Green Design": "Business + Development",
  "Green Design Municipal Buildings": "Business + Development",
  "Green Design Commercial and Residential Buildings": "Business + Development",
  "Green Fairs": "Community",
  "Green Fleets": "Governance",
  "Green Purchasing Program": "Governance",
  "Grounds & Maintenance": "Governance",
  "Health & Wellness": "Health",
  "High Efficiency Municipal Buildings": "Energy + Natural Resources",
  "Home Performance with ENERGY STAR": "Energy + Natural Resources",
  "Innovation & Demonstration Projects": "Energy + Natural Resources",
  "Land Use & Transportation": "Governance",
  "Local Economies": "Business + Development",
  "Municipal Energy Audits and Upgrades": "Energy + Natural Resources",
  "Natural Resource Protection Ordinances": "Energy + Natural Resources",
  "Natural Resources": "Energy + Natural Resources",
  "Operations & Maintenance": "Governance",
  "Recycling": "Waste + Pollution",
  "Support Local Food": "Food",
  "Sustainability & Climate Planning": "Governance",
  "Sustainability Planning": "Governance",
  "Tree & Woodlands Management": "Energy + Natural Resources",
  "Waste Management": "Waste + Pollution",
  "Waste Reduction": "Waste + Pollution"
};

const CategoryMapper = (category) => {
  return Object.keys(categoryMap).includes(category) ?
    categoryMap[category]
    : '';
}

export default CategoryMapper;
