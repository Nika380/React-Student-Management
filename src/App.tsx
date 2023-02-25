import React from 'react';
import Navigation from './components/Navigation';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import StudentManagement from './components/Student/StudentManagement';
import TeacherManagement from './components/Teacher/TeacherManagement';
import GroupManagement from './components/Group/GroupManagement';
import AddStudent from './components/Student/AddStudent';
import AddTeacher from './components/Teacher/AddTeacher';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navigation />
              <Routes>
                  <Route path='/' element={<StudentManagement />}/>
                  <Route path='/teacher-management' element={<TeacherManagement />}/>
                  <Route path='/group-management' element={<GroupManagement />}/>
                  <Route path='/add-student' element={<AddStudent />}/>
                  <Route path='/add-teacher' element={<AddTeacher />}/>
              </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
