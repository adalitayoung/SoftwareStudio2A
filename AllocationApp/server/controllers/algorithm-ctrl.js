startAlgorithm = (req, res) => {
    return res.status(201).json({
        success: true,
        message: 'Algorithm started',
    })
}

module.exports = {
    startAlgorithm,
}
/* 
get all student details (preferences and tech expertise)
get number of students
get all project quotas
split students based on tech expertise
if first preference project quota is not full 
    allocate students with tech expertise "A" to first preference - add project_ID to temp-student DB 
    allocate students with tech expertise "b" to first preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to first preference - add project_ID to temp-student DB 
else if
    allocate students with tech expertise "A" to second preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to second preference - add project_ID to temp-student DB
    allocate students with tech expertise "b" to second preference - add project_ID to temp-student DB
else if
    allocate students with tech expertise "A" to third preference - add project_ID to temp-student DB
    allocate students with tech expertise "b" to third preference - add project_ID to temp-student DB
    allocate students with tech expertise "c" to third preference - add project_ID to temp-student DB
else
    randomly assign to projects with empty spaces 
    OR
    Admin can manually assign students to groups with empty spaces 
    
*/