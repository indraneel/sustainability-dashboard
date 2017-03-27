import VISUALIZATION_ENTRY_FIELDS from './visualization-entry-fields';

export default [
  {
    id: 1,
    title: "Create Green Team",
    category: "Waste",
    description: "this is about env",
    visualization: {
      type: 'line',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { x: new Date('2015-01-01T00:00:00-08:00'), y: 1 },
      	{ x: new Date('2015-01-02T00:00:00-08:00'), y: 0 },
      	{ x: new Date('2015-01-03T00:00:00-08:00'), y: 3 },
      	{ x: new Date('2015-01-04T00:00:00-08:00'), y: 5 },
      ],
    }
  },
  {
    id: 2,
    title: "Education for Sustainability Programs",
    category: "Waste",
    description: "this is about env",
    visualization: {
      type: 'pie',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { label: 'Leslie', value: 80 },
        { label: 'Tom', value: 20 },
        { label: 'Ron', value: 10 },
        { label: 'Ann', value: 30 },
      ],
    }
  },
  {
    id: 3,
    title: "Green Challenges and Community Programs",
    category: "Governance",
    description: "this is about env",
    visualization: {
      type: 'text',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { line: "June 27" },
        { line: "8-10am" },
        { line: "35 people" },
      ],
    }
  },
  {
    id: 4,
    title: "Complete Streets Program",
    category: "Governance",
    description: "this is about env",
    visualization: {}
  },
  {
    id: 5,
    title: "emissions",
    category: "Environment",
    description: "this is about env",
    visualization: {
      type: 'pie',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { label: 'Leslie', value: 80 },
        { label: 'Tom', value: 20 },
        { label: 'Ron', value: 10 },
        { label: 'Ann', value: 30 },
      ],
    }
  },
  {
    id: 6,
    title: "emissions",
    category: "Environment",
    description: "this is about env",
    visualization: {
      type: 'pie',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { label: 'Leslie', value: 80 },
        { label: 'Tom', value: 20 },
        { label: 'Ron', value: 10 },
        { label: 'Ann', value: 30 },
      ],
    }
  },
  {
    id: 7,
    title: "emissions",
    category: "Environment",
    description: "this is about env",
    visualization: {
      type: 'pie',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { label: 'Leslie', value: 80 },
        { label: 'Tom', value: 20 },
        { label: 'Ron', value: 10 },
        { label: 'Ann', value: 30 },
      ],
    }
  },
  {
    id: 8,
    title: "emissions",
    category: "Environment",
    description: "this is about env",
    visualization: {
      type: 'pie',
      entryFields: VISUALIZATION_ENTRY_FIELDS,
      data: [
        { label: 'Leslie', value: 80 },
        { label: 'Tom', value: 20 },
        { label: 'Ron', value: 10 },
        { label: 'Ann', value: 30 },
      ],
    }
  },
];
