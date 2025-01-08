import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import HitItem from "./HitItem";

class HitDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hit: null,
        };
    }

    getHits(id) {
        const url = `https://pixabay.com/api/?key=47790873-2a52f32f187b8797c0565eed1&id=${id}`;
        axios
            .get(url)
            .then((resp) => {
                this.setState({
                    hit: resp.data.hits[0],
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.getHits(this.props.params.id);
    }

    render() {
        if (this.state.hit) {
            return <HitItem hit={this.state.hit} details={true} />;
        } else {
            return <div>Loading...</div>;
        }
    }
}

const withParams = (Component) => (props) => {
    const params = useParams();
    return <Component {...props} params={params} />;
};

export default withParams(HitDetails);
