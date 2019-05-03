import axios from "axios";
import React, { Component } from "react";

class NewProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            errors: []
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
    }
    /**
     * @param {*} event
     * handleFieldChange method that gets called whenever the create a new project form input fields changes.
     *Base on these changes, we update the states (name and description) accordingly. For this to work,
     * we add an onChange event to each of the field.
     */
    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * @param {*} event
     *handleCreateNewProject method is called, which first prevents the default behavior of form submission.
      Then it makes an HTTP request to our app API endpoint passing along the form data.
      If everything went well, we simply redirect the user to the homepage.
      otherwise, we update the errors state with the response error gotten from our app API.
     */
    handleCreateNewProject(event) {
        event.preventDefault();

        const { history } = this.props;

        const project = {
            name: this.state.name,
            description: this.state.description
        };

        axios
            .post("/api/projects", project)
            .then(response => {
                // redirect to the homepage
                history.push("/");
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            });
    }

    /**
     * @param {*} field
      hasErrorFor method checks if the specified field has an error or not, and will either return true or false
      THAT HAPPENS WHEN WE ARE TRYING TO CREATE THE PROJECT IN CASE YOU ARE CONFUSED
     */
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    /**
     * @param {*} field
      renderErrorFor method renders the error message for the specified field, if the field has error.
     */
    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Create new project
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewProject}>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            Project name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("name")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("name")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">
                                            Project description
                                        </label>
                                        <textarea
                                            id="description"
                                            className={`form-control ${
                                                this.hasErrorFor("description")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="description"
                                            rows="10"
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("description")}
                                    </div>
                                    <button className="btn btn-primary">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewProject;
