import React from 'react';

const TaskAssignmentCard = ({ isAssigned }) => {
    return (
        <div>
            Task Assigned to Bot: {isAssigned ? "Yes" : "No"}
        </div>
    );
};

export default TaskAssignmentCard;
