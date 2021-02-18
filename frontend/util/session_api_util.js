

export const signup = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })
)

export const signin = (user) => (
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })
)

export const signout = () => (
  $.ajax({
    method: 'DELETE',
    url: '/api/session',
  })
)


export const fetchUserInfo = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
  })
)


export const fetchUserStockInfo = (userId) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/stocks`,
  })
)