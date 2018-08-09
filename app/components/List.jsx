import React from 'react'

const List = (props) => {
  console.log('pops', props)
  let { items } = props;
  let currName = props.name;
  let dict = {
    genres: {
      fields: ['name', 'percent']
    }
  };

  //if(items && !Array.isArray(items) && (items instanceof Object || typeof items === 'object')) {
  //  items = Object.keys(items).map(key => { 
  //    let i = 0;
  //    let currFields = dict[currName].fields;
  //    let obj = {};
  //    while(i < currFields.length) {
  //      obj[currFields[i]] = items[key];
  //      i++;
  //    }

  //    if (!obj.name) obj.name = key;
  //    return obj;
  //  });
  //}
  return (
    <table>
      <thead>
        <tr>
          <th>{currName}</th>
        </tr>
      </thead>
      <tbody>
        {
          items.length !== 0 ?
            items.map((each, i) => 
              <tr key={`${each.name}${i}`}>
                {
                  currName === 'genres' && dict[currName].fields ?
                  dict[currName].fields.map(field => {
                    return <td key={field}>{each[field]}</td>
                  }) : <td key={each.name}>{each.name}</td>
                }
              </tr>
            ) : 'No data'
        }
      </tbody>
    </table>
  )
};

export default List;
