import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

export const addUserToDatabase = user => api.post(`/user/createUser`, user)

export const startAlgorithm = () => api.get(`/algorithm`)

export const fetchUserData = (user_role, course_id) => api.get(`/user/fetchUserData/${user_role}/${course_id}`)

export const updateUserRole = (user_id, role) => api.post(`/user/updateUserRole/${user_id}/${role}`)
export const addUserPreference = tempStudent => api.post(`/user/userPreference`, tempStudent)

export const updatePreference = tempStudent => api.post(`/user/updatePreference`, tempStudent)

export const updateTechBackground = tempStudent => api.post(`/user/updateTechBackground`, tempStudent)

export const addCourse = course => api.post('/class/createClass', course)
export const getCourseByName = name => api.get(`/class/${name}`)
export const getAllCourses = () => api.get('/class/getAllClasses')
export const getAllTeachers = () => api.get('/user/getAllTeachers')
export const login = loginDetails => api.post('/user/login', loginDetails)
export const logout = () => api.post('/user/logout')


//project
export const createProject = projectDetails => api.post('/project/createProject', projectDetails)
export const updateProject = id => api.post(`/project/updateProject/${id}`)
export const deleteProject = id => api.delete(`/project/deleteProject/${id}`)
export const showProject = id => api.get(`/project/showProject/${id}`)
export const showMyProjects = () => api.get('/project/showMyProjects')

//project roles
export const createProjectRole = projectRole => api.post('project/createProjectRole', projectRole)
export const updateProjectRole = id => api.post(`project/updateProjectRole/${id}`)
export const showRoles = id => api.get(`project/showRoles/${id}`)
export const deleteProjectRole = id => api.delete(`project/deleteProjectRole/${id}`)

const apis = {
    addUserToDatabase,
    startAlgorithm,
    addUserPreference,
    updatePreference,
    updateTechBackground,
    addCourse,
    getCourseByName,
    getAllCourses,
    login,
    logout,
    createProject,
    updateProject,
    deleteProject,
    showProject,
    showMyProjects,
    createProjectRole,
    updateProjectRole,
    showRoles,
    fetchUserData,
    deleteProjectRole
}

export default apis
