import React from "react";

export default function RadialNav(props) {
    return (
        <a className="radial-nav position--absolute --bottom --left" role="button">
            <div className="rounded position--relative radial-block">
                <span className="radial-btn fa-stack fa-fw fa-3x" style={{ verticalAlign: "top" }}>
                    <i className="fa fa-stack-2x fa-circle text-dark"></i>
                    <i className="fa fa-stack-1x fa-inverse fa-adjust text-primary"></i>
                </span>

                <div className="radial-list">
                    <div className="radial-item first">
                        <div className="d-flex justify-content-center">
                            <a href="/home" className="">
                                <i className="fa fa-2x fa-home"></i>
                            </a>
                        </div>
                    </div>
                    <div className="radial-item second">
                        <div className="d-flex justify-content-center">
                            <a href="/admin" className="">
                                <i className="fa fa-2x fa-home"></i>
                            </a>
                        </div>
                    </div>
                    <div className="radial-item third">
                        <div className="d-flex justify-content-center">
                            <a href="/" className="">
                                <i className="fa fa-2x fa-home"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}