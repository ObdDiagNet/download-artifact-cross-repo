import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run_id_lookup(repositoryOwner: string, repositoryName: string, workflowFile: string, token: string) {
  
  // Initialize the Octokit client with the provided token (PAT)
  const octokit = github.getOctokit(token);

  // Use GitHub REST API to fetch repo data
  const { data: repoData } = await octokit.rest.repos.get({
    owner: repositoryOwner, 
    repo: repositoryName
  });

  // Now you can access any property of the repository object
  const sourceBranch = repoData.default_branch;

  core.info(`Searching for latest successful run in ${repositoryOwner}/${repositoryName} on branch ${sourceBranch} for workflow ${workflowFile}`);

  // Call the GitHub REST API to get the latest successful run ID
  const response = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner: repositoryOwner,
    repo: repositoryName,
    workflow_id: workflowFile,
    branch: sourceBranch,
    status: 'success',
    per_page: 1
  });

  const latestRun = response.data.workflow_runs[0];

  // Set output or fail
  if (latestRun) {
    core.info(`Successfully found Run ID: ${latestRun.id}`);
    return latestRun.id;
  } else {
    throw new Error(
      `No successful workflow run found for ${workflowFile} on branch ${sourceBranch} in ${repositoryOwner}/${repositoryName}`
    );
  }
}
