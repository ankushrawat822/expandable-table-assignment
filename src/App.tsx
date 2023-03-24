import React, { useState } from 'react';
import ts from 'typescript';
let data = require('./blocks.json');


function App() {

  // data array 
  const [dataArr, setDataArr] = useState(data)

  // useStates for expanding and collapsing table
  const [toggelDAtaQ1, setToggelDAtaQ1] = useState(false)
  const [toggelDAtaQ2, setToggelDAtaQ2] = useState(false)


  // row click functionality 
  const handleRowClick = (e) => {
    // updating toggle
    setToggelDAtaQ1(prev => !prev)

    if (e === "January" || e === "February" || e === "March" || e === "Q1") {
      // code to modify data arr such that starting 3 months should change to q1 and add  total revenue and total expense
      console.log("close jan feb mar")

      const filterData = data.filter((item) => item.month !== "January" && item.month !== "February" && item.month !== "March")

      // console.log(filterData)

      // code to add q1 object with added revenue and expenses
      //  code to calculate revenue of q1
      let sumRQ1 = data.map((item) => (item.indicators[0].value))

      for (let k = 2; k >= 0; k--) {
        sumRQ1.pop()
      }
      let TSumRQ1 = sumRQ1.reduce((partialSum, a) => partialSum + a, 0)




      //  code to calculate expenses of q1
      let sumEQ1 = data.map((item) => (item.indicators[1].value))

      for (let k = 2; k >= 0; k--) {
        sumEQ1.pop()
      }
      let TSumEQ1 = sumEQ1.reduce((partialSum, a) => partialSum + a, 0)

      //  console.log(TSumEQ1)


      // inserting Q1 object at the starting of array
      filterData.unshift({ "month": "Q1", "indicators": [{ "name": "revenue", "value": `${TSumRQ1}` }, { "name": "expenses", "value": `${TSumEQ1}` }] })

      // logic for expanding and collapsing table
      if (toggelDAtaQ1) {
        setDataArr(data)
      } else {
        setDataArr(filterData)
      }



    } else {
      // console.log("close apr may jun")
      // updating toggle state
      setToggelDAtaQ2(prev => !prev)
      console.log("e is : " + e)
      if (e === "April" || e === "May" || e === "June" || e === "Q2") {
        // code to modify data arr such that starting 3 months should change to q2 and add total revenue and total expense

        const filterSecondData = data.filter((item) => item.month !== "April" && item.month !== "May" && item.month !== "June")

        // console.log(filterSecondData)

        // code to add q2 object with added revenue and expenses
        //  code to calculate revenue of q2
        let sumRQ2 = data.map((item) => (item.indicators[0].value))

        for (let k = 2; k >= 0; k--) {
          sumRQ2.shift()
        }
        let TSumRQ2 = sumRQ2.reduce((partialSum, a) => partialSum + a, 0)




        //  code to calculate expenses of q2
        let sumEQ2 = data.map((item) => (item.indicators[1].value))

        for (let k = 2; k >= 0; k--) {
          sumEQ2.shift()
        }
        let TSumEQ2 = sumEQ2.reduce((partialSum, a) => partialSum + a, 0)




        // inserting Q2 object at the ending of array
        filterSecondData.push({ "month": "Q2", "indicators": [{ "name": "revenue", "value": `${TSumRQ2}` }, { "name": "expenses", "value": `${TSumEQ2}` }] })

        // logic for expanding and collapsing table
        if (toggelDAtaQ2) {
          setDataArr(data)
        } else {
          setDataArr(filterSecondData)
        }
      }
    }
  }

  return (
    <>
      <div className='container'>

        <table>
          <thead>


            <tr>
              <th className='data-style-th'>data</th>
              {dataArr.map((item, i) => (
                <th onClick={() => handleRowClick(item.month)} className='table-row'>{item.month}</th>
              ))}

            </tr>
          </thead>
          <tbody>

            <tr>

              <td>Revenue</td>
              {dataArr.map((item, i) => (
                <td>{item.indicators[0].value}</td>
              ))}

            </tr>

            <tr>

              <td>Expenses</td>
              {dataArr.map((item, i) => (
                <td>{item.indicators[1].value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

    </>
  );
}

export default App;
