import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.  The most forked are:
    <br></br>
    {props.repos.map((repo) => {
      return (
        <div id='repo'>
        <a href={repo.url} target='_blank'>{repo.full_name}</a><br></br>
        Updated on: {repo.updatedAt} with {repo.forks} forks.
        </div>
    )
    })}
  </div>
)

export default RepoList;