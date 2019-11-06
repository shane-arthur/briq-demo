import { Injectable } from '@angular/core';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: any[];
  constructor() {
  }

  filterAndTransformData(data: any[]) {
    // grab item a 0 index which will be the data headings
    const headings = data.shift();

    // set min sq feet to filter by
    const minSqFeet = 50000;

    // the data comes back from the excel sheet in an array. index = 0 is sq feet and index = 13 is description.
    // well filter out the data for descriptions contianing residential and square feet less than 50K.
    const sqFeetIndex = 0;
    const descriptionIndex = 13;
    const keyword = 'residential';

    // before we transform the data to a hash, lets get rid of small projects < 60K sq feet. Lets also sort the data descending by sq footage
    let filteredData: any[] = data.filter(item => item[sqFeetIndex] >= minSqFeet);
    filteredData = filteredData.filter(item => !item[descriptionIndex] || !item[descriptionIndex].includes(keyword)).sort((item1, item2) => {
      return item1.OBJECTID > item2.OBJECTID ? 1 : -1
    });


    const formattedData = this.transformDataForTable(filteredData, headings);
    this.data = formattedData;
    return [formattedData, headings];
  }

  transformDataForTable(data: any[], headers: string[]) {
    return data.map((item) => {
      let data = {};
      headers.forEach((header, i) => {
        data[header] = item[i]
      });
      return data;
    });
  }

  returnRelevencyScore() {

    // approx items;
    const items = 1700;
    const delta = items - this.data.length;
    // we have already filtered the data removing what we can for residential, and sorted by size.
    // this data is technically already sorted by 'relevence' we just need to generate a value

    return this.data.map((data, i) => {
      return { index: i, score: `${(((delta - i) / items) * 100).toFixed(2)}%`};
    });
  }
}
