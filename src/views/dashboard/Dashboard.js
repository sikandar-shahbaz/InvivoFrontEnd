import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [tableHeightPixels] = useState(500)
  const [tableWidthPixels] = useState(1000)
  const [data, setData] = useState([])
  const [rows, setRows] = useState(null)

  useEffect(() => {
    axios.get(`https://invivo-backend.herokuapp.com/data`).then((res) => {
      const data = res.data
      const numberOfRows = Math.max(...data.map((element) => element.Score))
      let rows = []
      for (let i = 1; i <= numberOfRows; i++) {
        rows.push(i)
      }
      setRows(rows)
      setData(data)
    })
  }, [])

  return (
    <div className="container">
      <h2>Student Report</h2>
      <div className="flex">
        {
          rows &&
          rows.length > 0 &&
          <div
            className="yAxisOutside"
            style={{ height: tableHeightPixels+ 'px' }}
          >
            <div className="yAxisInside">
              <h4>Score</h4>
            </div>
          </div>
        }
        <div>
        {
          rows &&
          rows.length > 0 &&
          rows.map((row) => (
            <tr 
              key={row}
              style={{ 
                height: tableHeightPixels/rows.length + 'px',
              }}
            >
              <td>
                <h4>{(rows.length + 1) - row}</h4>
              </td>
            </tr>
          ))
        }
        </div>
        
        <div>
          <div
            className="axisLines"
            style={{
              height: tableHeightPixels + 15 + 'px',
              maxWidth: tableWidthPixels + 'px',
            }}
          >
            <table>
            {
              data &&
              rows &&
              data.length > 0 &&
              rows.length > 0 &&
              rows.map(row=> (
                <tr 
                  key={row} 
                  style={{ 
                    height: tableHeightPixels/rows.length + 'px',
                  }}
                >
                  {
                    data.map(element => (
                      <td 
                        key={element.Student}
                        style={{ 
                          width: tableWidthPixels/data.length + 'px',
                          backgroundColor: (rows.length) - row >= element.Score ? 'transparent' : 'yellow',
                          borderLeft: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                          borderRight: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                          borderTop: (rows.length) - row >= element.Score ? 'transparent' : '1px solid black',
                        }}
                      />
                    ))
                  }
                </tr>
              ))
            }
            </table>
          </div>

          <div className="xAxisOutside">
            <tr>
            {
              data &&
              data.length > 0 &&
              data.map(element => (
                <td 
                  key={element.Student}
                  style={{ 
                    width: tableWidthPixels/data.length + 'px',
                  }}
                >
                  <h4>{element.Student}</h4>
                </td>
              ))
            }
            </tr>
            <div
              style={{
                width: tableWidthPixels + 'px',
              }}
            >
              <h4>Student</h4>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
