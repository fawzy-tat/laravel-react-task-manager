import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * We define a projects state and initialize it to be an empty array. Using React’s componentDidMount lifecycle
  we make an HTTP request using Axios to our app API endpoint to fetch all the projects that are yet to be marked as completed.
  Then we update the projects state with the response data gotten from our app API.
  Finally, we display a list of the projects by iterating over the projects state.
 */

class ProjectsList extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        axios.get("/api/projects").then(response => {
            this.setState({
                projects: response.data
            });
        });
    }

    render() {
        /**
         * Object destructuring
         */
        const { projects } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">All projects</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary btn-sm mb-3"
                                    to="/create"
                                >
                                    Create new project
                                </Link>
                                <ul className="list-group list-group-flush">
                                    {projects.map(project => (
                                        <Link
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                            to={`/${project.id}`}
                                            key={project.id}
                                        >
                                            {project.name}
                                            <span className="badge badge-primary badge-pill">
                                                {project.tasks_count}
                                            </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectsList;
