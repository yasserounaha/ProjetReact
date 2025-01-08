import React, { Component } from "react";
import axios from "axios";
import HitItem from "./HitItem";
import SearchHitForm from "./SearchHitForm";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
            currentPage: 1,
            pageSize: 6,
            currentkeyword: "",
            totalPages: 1,
            pages: [],
        };
    }

    componentDidMount() {
    }

    getHits(keyword) {
        let url =
            "https://pixabay.com/api/?key=47790873-==========&q=" +
            keyword +
            "&page=" +
            this.state.currentPage +
            "&per_page=" +
            this.state.pageSize;
        axios
            .get(url)
            .then((resp) => {
                let totalP =
                    resp.data.totalHits % this.state.pageSize === 0
                        ? resp.data.totalHits / this.state.pageSize
                        : Math.ceil(resp.data.totalHits / this.state.pageSize);

                this.setState({
                    hits: resp.data.hits,
                    totalPages: totalP,
                    pages: new Array(totalP).fill(0),
                    currentkeyword: keyword,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setKeyword = (event) => {
        this.setState({
            currentkeyword: event.target.value,
        });
    };

    search = (keyword) => {
        this.setState({ currentPage: 1 }, () => this.getHits(keyword));
    };

    goToPage = (page) => {
        this.setState(
            {
                currentPage: page,
            },
            () => {
                this.getHits(this.state.currentkeyword);
            }
        );
    };

    renderPagination() {
        const { currentPage, totalPages } = this.state;
        const maxVisiblePages = 3;

        // Calculate the range of pages to display
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Adjust the start page if we’re at the end of the range
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <ul className="pagination justify-content-center">
                {/* Previous Button */}
                {currentPage > 1 && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => this.goToPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    </li>
                )}

                {/* Page Numbers */}
                {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${
                            currentPage === page ? "active" : ""
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => this.goToPage(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={() => this.goToPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                )}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <SearchHitForm onSearch={this.search} />
                <div className="row">
                    {this.state.hits.map((hit) => (
                        <HitItem key={hit.id} hit={hit} details={false} />
                    ))}
                </div>
                {/* Render the Pagination */}
                {this.state.totalPages > 1 && this.renderPagination()}
            </div>
        );
    }
}

export default Gallery;
