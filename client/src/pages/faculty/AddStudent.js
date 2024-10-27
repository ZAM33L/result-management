import React from 'react'
import PageTitle from '../../components/PageTittle';
import StudentForm from '../../components/StudentForm';

function AddStudents() {
    return (
        <div>
            <PageTitle title='Add Students' />
            <StudentForm />
        </div>
    )
}

export default AddStudents