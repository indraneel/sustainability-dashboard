const categoryMap = {
  "ANIMALS IN THE COMMUNITY": 'Community',
  "ARTS & CREATIVE CULTURE": 'Community',
  "BROWNFIELDS": 'Business & Development',
  "COMMUNTY PARTNERSHIP & OUTREACH": 'Community',
  "DIVERSITY & EQUITY": 'Governance',
  "EMERGENCY MANAGEMENT AND RESILIENCY": 'Governance',
  "ENERGY EFFICIENCY": 'Energy & Natural Resources',
  "FOOD":		"Food",
"GREEN DESIGN":		"Business & Development",
"HEALTH & WELLNESS":		"Health",
"INNOVATION & DEMONSTRATION PROJECTS":		"Energy & Natural Resources",
"LAND USE & TRANSPORTATION":		"Governance",
"LOCAL ECONOMIES":		"Business & Development",
"NATURAL RESOURCES"	:	"Energy & Natural Resources",
"OPERATIONS & MAINTENANCE":		"Governance",
"PUBLIC INFORMATION & ENGAGEMENT":		"Community",
"SUSTAINABILITY PLANNING"	:	"Waste & Pollution",
"WASTE MANAGEMENT"	:	"Waste & Pollution"
};

export default (category) => {
  return categoryMap[category.toUpperCase()] ?
    categoryMap[category.toUpperCase()]
    : '';
};
