import React, { Component } from "react";
import { Link } from "react-router-dom";

class HitItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={
                    this.props.details === false
                        ? "col-md-4 mb-4" 
                        : "m-4"
                }
                key={this.props.hit.id}
            >
                <div className="card" style={{ fontSize: "0.9rem" }}> 
                    <div
                        className="card-header text-truncate"
                        style={{ padding: "0.5rem" }}
                    >
                        {this.props.details === false
                            ? this.props.hit.tags
                            : "Details"}{" "}
                        | {this.props.hit.webformatWidth} x{" "}
                        {this.props.hit.webformatHeight}
                    </div>
                    <div className="card-body" style={{ padding: "0.5rem" }}>
                        {this.props.details === false ? (
                            <img
                                className="card-img"
                                style={{ height: "150px", objectFit: "cover" }}
                                src={this.props.hit.webformatURL}
                                alt="hit"
                            />
                        ) : (
                            <img
                                className="card-img"
                                style={{ maxHeight: "300px", objectFit: "contain" }}
                                src={this.props.hit.largeImageURL}
                                alt="hit"
                            />
                        )}
                    </div>
                    {this.props.details === false ? (
                        <div className="m-2 text-center">
                            <Link
                                className="btn btn-success btn-sm"
                                to={"/hitDetails/" + this.props.hit.id}
                            >
                                Hit Details
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="row p-2">
                                <div className="col-auto">
                                    <img
                                        src={this.props.hit.userImageURL}
                                        className="img-thumbnail"
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                        }}
                                        alt="user"
                                    />
                                </div>
                                <div>
                                    <ul className="list-group list-group-horizontal small">
                                        <li className="list-group-item">
                                            Views:{" "}
                                            <strong>{this.props.hit.views} </strong>
                                        </li>
                                        <li className="list-group-item">
                                            Comments:{" "}
                                            <strong>{this.props.hit.comments} </strong>
                                        </li>
                                        <li className="list-group-item">
                                            Downloads:{" "}
                                            <strong>{this.props.hit.downloads}</strong>{" "}
                                        </li>
                                        <li className="list-group-item">
                                            Likes:{" "}
                                            <strong>{this.props.hit.likes}</strong>{" "}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <Link className="btn btn-primary btn-sm" to={"/gallery"}>
                                    Back
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default HitItem;
