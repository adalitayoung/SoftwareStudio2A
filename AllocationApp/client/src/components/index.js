//
//  This file is used to export the components and
//  make them accessible by in the front end.
//
import Links from './Links';
import Logo from './Logo';
import NavBar from './NavBar';
import Footer from './Footer';

export { default as Home } from './Home';
export { default as Signin } from './Signin';
export { default as Signup } from '../pages/Register';
export { default as Contact } from './Contact';
export { default as AddProject} from '../pages/AddProject';
export { default as TeacherClassList } from '../pages/TeacherClassList';
export { default as TeacherStudentList } from '../pages/TeacherStudentList';
export { default as TeacherProjectList } from '../pages/TeacherProjectList';

export { Links, Logo, NavBar, Footer };
