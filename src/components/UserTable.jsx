import React, { useEffect, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'

const UserTable = ({ userData }) => {

  const [searchTerm, setSearchTerm] = useState('')

  const [searchData, setSearchData] = useState(userData)

  const [sort, setSort] = useState(false)

  const [sortData, setSortData] = useState(userData)


  return (
    <>
      <div
        className='container my-3 w-50'
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label
            className='fw-bold ms-3'
          >Search</Form.Label>
          <Form.Control type="text" placeholder="Enter First Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              const newSearchData = userData.filter((user) => {
                return (
                  user.firstName.toLowerCase().includes(e.target.value.toLowerCase())
                )
              })
              setSearchData(newSearchData)
            }}
          />
          <button
            className='btn btn-primary my-3'
            onClick={() => {
              setSearchTerm('')
              setSearchData(userData)
            }}
          >Clear</button>
        </Form.Group>
      </div>
      <Table striped bordered hover >
        <thead>
          <th>S No.</th>
          <th
            className='d-flex justify-content-between align-items-center'
          ><span>
              Name
            </span>
            <span
              className='d-flex align-items-center'
            >
              <i className="fas fa-sort-up"
                style={{
                  cursor: "pointer"
                }}
                onClick={
                  () => {
                    const newSortData = [...userData].sort((a, b) => {
                      return (
                        a.firstName.toLowerCase() > b.firstName.toLowerCase() ? 1 : -1
                      )
                    })
                    setSortData(newSortData)
                    setSort(true)
                  }
                }
              ></i>
              <i className="fas fa-sort-down"
                style={{
                  cursor: "pointer"
                }}
                onClick={
                  () => {
                    const newSortData = [...userData].sort((a, b) => {
                      return (
                        a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1
                      )
                    })
                    setSortData(newSortData)
                    setSort(true)
                  }
                }
              ></i>
              <i
                className="fas fa-times ms-2"
                style={{
                  cursor: "pointer"
                }}
                onClick={
                  () => {
                    setSortData(userData)
                    setSort(false)
                  }
                }
              ></i>
            </span>
          </th>
          <th>Phone</th>
          <th>
            Remove User
          </th>
        </thead>
        <tbody>
          {
            searchTerm !== '' && searchData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          }
          {searchTerm === '' && !sort && userData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.firstName + " " + user.lastName}</td>
              <td>{user.phone}</td>
              <td
                className='d-flex justify-content-center align-items-center'
              >
                <i className="fas fa-trash-alt"
                  style={{
                    cursor: "pointer"
                  }}  
                  onClick={
                    () => {
                      const newUserData = userData.filter((user) => {
                        return (
                          user.phone !== userData[index].phone
                        )
                      })
                      localStorage.setItem('userData', JSON.stringify(newUserData))
                      window.location.reload()
                    }
                  }
                ></i>
              </td>
            </tr>
          ))}
          {
            sort && sortData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName + " " + user.lastName}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}

export default UserTable