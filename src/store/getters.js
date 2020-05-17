const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  roles: state => state.user.roles,
  name: state => state.user.name,
  profile: state => {
    return {
      name: state.user.name,
      role: state.user.roles.join(' | '),
      email: '',
    }
  },
  permission_routes: state => state.permission.routes,
}

export default getters
