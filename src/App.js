import React from 'react'
import './App.css'
import API from "./utils/API"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      hover: -1
    }
  }

  setHover = (number) => this.setState({hover: number})

  render() {
    const { data, hover } = this.state

    return (data ?
      <div className="Container">
        <div className="Months">
          {
            months.map((month, index) => (
            <div
            onMouseEnter = {() => this.setHover(index)}
            onMouseLeave = {() => this.setHover(-1)}>
              <span style={{color: colorMonth(data[index].length)}}>{month}</span>
            </div>
          ))}
        </div>
        <div className="Users">
          {hover === -1 ? '' : data[hover].map(user => (
            <a>{user.firstName} {user.lastName}<br /></a>
          ))}
        </div>
      </div> : 'Loading...'
    )
  }

  async componentDidMount() {
    let userData = await API.get('/', {
          params: {
          }
        })

        userData = userData.data

        this.setState({
          ...this.state, ...{
            data: sortUsers(userData)
          }
        })
  }
}

const colorMonth = bdNumber => {
  if (bdNumber >= 0 && bdNumber <= 2) {
    return 'gray'
  }

  if (bdNumber >= 3 && bdNumber <= 6) {
    return 'blue'
  }

  if (bdNumber >= 7 && bdNumber <= 10) {
    return 'green'
  }

  if (bdNumber >= 11) {
    return 'red'
  }
}

const sortUsers = (users) => {
  let sortedUsers = []
  users.map(user => (
    //sortedUsers[getMonth(user.dob)].push(user)
    typeof sortedUsers[getMonth(user.dob)] === 'undefined' ?
    sortedUsers[getMonth(user.dob)] = [user] : sortedUsers[getMonth(user.dob)].push(user)
  ))
  return sortedUsers
}

const getMonth = (dateStr) => {
  const date = new Date(dateStr)
  return date.getMonth()
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default App
