# Download Action Artifact with Cross-repository support
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-DownloadCrossRepo-brightgreen?logo=github)](https://github.com/marketplace/actions/download-a-build-artifact-with-cross-repository-support)

Download [Actions Artifacts](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts) from a GitHub Actions workflow run, with support for cross-repository artifact downloads. It is based on [download-artifact](https://github.com/actions/download-artifact) plugin.

## Features

- Download artifacts from the latest successful workflow run
- Support for cross-repository artifact downloads
- Multiple download modes: single artifact, by ID, pattern matching, or all artifacts
- Automatic workflow run lookup based on the default branch
- Parallel downloads for better performance
- Digest verification for artifact integrity

## Usage

### Basic Example

Download all artifacts from the latest successful workflow run:

```yaml
- name: Download artifacts
  uses: ./
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    repository: owner/repo
    workflow-file: build.yml
```

### Download a Specific Artifact

```yaml
- name: Download specific artifact
  uses: ./
  with:
    name: my-artifact
    github-token: ${{ secrets.GITHUB_TOKEN }}
    repository: owner/repo
    workflow-file: build.yml
    path: ./artifacts
```

### Download by Artifact IDs

```yaml
- name: Download artifacts by ID
  uses: ./
  with:
    artifact-ids: '123456,789012'
    github-token: ${{ secrets.GITHUB_TOKEN }}
    repository: owner/repo
    workflow-file: build.yml
```

### Download with Pattern Matching

```yaml
- name: Download matching artifacts
  uses: ./
  with:
    pattern: 'build-*'
    github-token: ${{ secrets.GITHUB_TOKEN }}
    repository: owner/repo
    workflow-file: build.yml
    merge-multiple: true
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `name` | Name of the artifact to download. If unspecified, all artifacts for the run are downloaded. | No | - |
| `artifact-ids` | IDs of the artifacts to download, comma-separated. Cannot be used with `name`. | No | - |
| `path` | Destination path. Supports basic tilde expansion. | No | `$GITHUB_WORKSPACE` |
| `pattern` | A glob pattern matching the artifacts that should be downloaded. Ignored if `name` is specified. | No | - |
| `merge-multiple` | When multiple artifacts are matched, downloads them to the same directory if `true`, or to individual named directories if `false`. | No | `false` |
| `github-token` | The GitHub token used to authenticate with the GitHub API. Required for cross-repository/workflow downloads. | Yes | - |
| `repository` | The repository owner and name joined together by "/" (e.g., `owner/repo`). | Yes | - |
| `workflow-file` | The file name of the source workflow (e.g., `build.yml`). | Yes | - |

## Outputs

| Output | Description |
|--------|-------------|
| `download-path` | Path where artifacts were downloaded |

## Notes

- The action searches for the latest successful run on the repository's default branch .

## License

[MIT](LICENSE)
