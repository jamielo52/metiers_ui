import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

class WillApply extends React.Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
  }

  showDetails(job) {
    this.props.showJobDetails(job);
  }

  render() {
    return (
    <div className="container">
      <h2>Will Apply</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Job Link</th>
            <th>Personal Rating</th>
            <th>Job Status</th>
            <th>Expanded Job Details</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {this.props.dashboardLoad.map((job) => {
            if (job.status === 'Will Apply') {
              return (
                <tr key={job.id}>
                  <td>{job.company_name}</td>
                  <Link to="/home/job-detail" href="/home/job-detail" job={job}>
                    <td onClick={this.showDetails(job)}>{job.job_title_name}</td>
                  </Link>
                  <td> <a href={'http://'+job.url !== 'http://' ? 'http://'+job.url : ""} target="_blank">Link</a></td>
                  <td>{job.rating}</td>
                  <td>{job.status}</td>
                  <td>Job expanded link</td>
                  <td>{<TimeAgo date={job.deadline} /> }</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
    );
  }
};

export default WillApply;