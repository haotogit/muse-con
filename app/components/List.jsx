import React from 'react'

const List = (props) => {
  console.log('pops', props)
  let { items } = props;
  let currName = props.name;
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
                  Object.keys(each).map((key, j) => {
                    return <td key={`${each.name}${i}${j}`}>{each[key]}</td>
                  })
                }
              </tr>
            ) : 'No data'
        }
      </tbody>
    </table>
  )
};

export default List;
