import React from 'react'

const List = (props) => {
  let { items } = props;
  let currName = props.name;
  return (
    <table>
      <thead>
        <tr>
        </tr>
      </thead>
      <tbody>
        {
          items.length !== 0 ?
            items.map((each, i) => 
              <tr key={`${each.name}${i}`}>
                <td key={`${each.name}${i}`}>{each.name}</td>
              {/*
                {
                  Object.keys(each).map((key, j) => <td key={`${each.name}${i}${j}`}>{each[key]}</td>)
                }
                */}
              </tr>
            ) : 'No data'
        }
      </tbody>
    </table>
  )
};

export default List;
