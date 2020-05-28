import loginService from '../services/login'

const loggedInUserJSON = JSON.parse(
  window.localStorage.getItem('loggedInBloglistUser'),
)

const initialState = loggedInUserJSON ? loggedInUserJSON : null

const loginReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT': {
      return null
    }
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    console.log({ user })
    console.log('called')
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export default loginReducer
