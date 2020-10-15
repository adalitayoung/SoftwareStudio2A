import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

export const addUserToDatabase = (user) => api.post(`/user/createUser`, user);

export const deleteUser = (email) => api.delete(`/user/deleteUser/${email}`);

export const startAlgorithm = () => api.get(`/algorithm`);
export const startRandomSort = () => api.get(`/randomSort`);

export const addStudentToClass = (id, className) =>
  api.post(`/user/addToClass/${id}/${className}`);
export const removeFromClass = (student_id, className) =>
  api.post(`/user/removeFromClass/${student_id}/${className}`);

export const fetchUserData = (user_role, course_id) =>
  api.get(`/user/fetchUserData/${user_role}/${course_id}`);

export const getAllStudentIds = (role) => api.get(`/user/getAllStudentIds/${role}`);

export const updateUserRole = (user_id, role) =>
  api.post(`/user/updateUserRole/${user_id}/${role}`);
export const addUserPreference = (tempStudent) =>
  api.post(`/user/userPreference`, tempStudent);



export const addPreferencesBackground = tempStudent => api.post(`/user/addPreferencesBackground`, tempStudent)


export const addCourse = (course) => api.post('/class/createClass', course);
export const getCourseByName = (name) => api.get(`/class/${name}`);
export const getAllCourses = () => api.get('/class/getAllClasses');
export const updateCourse = (id, name, numberOfStudents) =>
  api.post(`/class/updateClass/${id}/${name}/${numberOfStudents}`);
export const deleteCourse = (id) => api.delete(`/class/deleteClass/${id}`);
export const showMyclasses = (id) => api.get(`/class/showMyclasses/${id}`);

export const login = (loginDetails) => api.post('/user/login', loginDetails);
export const logout = () => api.post('/user/logout');

//project
export const createProject = (projectDetails) =>
  api.post('/project/createProject', projectDetails);
export const updateProject = (id, projectDetails) =>
  api.post(`/project/updateProject/${id}`, projectDetails);
export const deleteProject = (id) => api.delete(`/project/deleteProject/${id}`);
export const showProject = (id) => api.get(`/project/showProject/${id}`); //returns a specific project by its id

export const showMyProjects = (createdByID) => api.get('/project/showMyProjects', createdByID); //to show teacher's project by its id
export const showClassProjects = (id) =>
  api.get(`/project/showClassProjects/${id}`);
export const showAllProjects = () => api.get('/project/showAllProjects'); // this returns all the project in db
export const showProjectByName = (projectName) => api.get(`/project/showProjectByName`, projectName);
//project roles
export const createProjectRole = (projectRole) =>
  api.post('/project/createProjectRole', projectRole);
export const updateProjectRole = (id, projectRolesUpdate) =>
  api.post(`/project/updateProjectRole/${id}`, projectRolesUpdate);
export const showRoles = (id) => api.get(`/project/showRoles/${id}`);
export const deleteProjectRole = (id) =>
  api.delete(`/project/deleteProjectRole/${id}`);
export const getRolesForBackground = (id) => api.get(`/project/getRolesForBackground/${id}`) // This is class ID
export const addStudentToProjectManually = (payload) => api.post('/project/addStudentToProjectManually', payload)

export const outputToExcel = (id) => api.post(`/user/outputToExcel/${id}`)

const apis = {
  addUserToDatabase,
  deleteUser,
  addStudentToClass,
  updateUserRole,
  removeFromClass,
  startAlgorithm,
  startRandomSort,
  addPreferencesBackground,
  addCourse,
  getCourseByName,
  getAllCourses,
  getAllStudentIds,
  updateCourse,
  deleteCourse,
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
  deleteProjectRole,
  showClassProjects,
  showAllProjects,
  showProjectByName,
  getRolesForBackground,
  addStudentToProjectManually,
  outputToExcel
};

export default apis;
