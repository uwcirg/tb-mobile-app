/* TODO: change to presentational SFC */
import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = () =>
	<div className="options-wthree">
    <div className="container">
		<ul>
			<li>
			<a href=".html" className="opt-grids">
				<div className="icon-agileits-w3layouts">
					<i className="fa fa-calendar-check" aria-hidden="true"></i>
				</div>
				<div className="opt-text-w3layouts">
					<h6>Reporting</h6>
				</div>
			</a>
			</li>
			<li>
			<a href="doctors.html" className="opt-grids">
				<div className="icon-agileits-w3layouts">
					<i className="fa fa-chart-line" aria-hidden="true"></i>
				</div>
				<div className="opt-text-w3layouts">
					<h6>My Progress</h6>
				</div>
			</a>
			</li>
    </ul>
    </div>
  </div>


export default Dashboard;